from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser,UserOTP
from .serializers import UserSerializer,SignupSerializer,LoginSerializer
from .utils import send_welcome_email
from datetime import timedelta,datetime
from django.utils.timezone import now
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
import random
import json

class GoogleLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def get_tokens_for_user(self, user):
        """Generate access and refresh tokens for the given user."""
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    def post(self, request):
        
        try:
            # Extract token from the request body
            token = request.data.get('token')

            if not token:
                return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

            # Verify the token using Google's API
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                return Response({'error': 'Invalid issuer'}, status=status.HTTP_401_UNAUTHORIZED)

            # Extract user information from the token
            email = idinfo.get('email')
            

            # Check if user exists or create a new user
            user, created = CustomUser.objects.get_or_create(
                email=email, 
            )

            # Generate JWT tokens
            tokens = self.get_tokens_for_user(user)

            # Determine if the user was newly created
            message = "New user created successfully" if created else "User logged in successfully"

            # Serialize user data
            serializer = UserSerializer(user)

            return Response({
                'success': True,
                'message': message,
                'user': serializer.data,
                'accessToken': tokens['access'],
                'refreshToken': tokens['refresh']
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class SignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Send a welcome email after successful signup
            email_sent = send_welcome_email(user.email)
            
            if email_sent:
                return Response({'message': 'Account created successfully! Check your email.'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Account created, but email failed to send.'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = serializer.get_tokens(user)

            return Response({
                'message': 'Login successful!',
                'accessToken': tokens['access'],
                'refresh_token': tokens['refresh']
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]
    def generate_otp(self):
        return random.randint(100000, 999999)

    def post(self, request):
        email = request.data.get('email')

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)

            # Generate OTP and save it in the `UserOTP` model
            otp = self.generate_otp()
            UserOTP.objects.create(user=user, otp=otp)

            # Send OTP via email
            send_mail(
                'Password Reset OTP',
                f'Your OTP for resetting your password is {otp}. It is valid for 5 minutes.',
                'burhanmessio@gmail.com',  # Sender email
                [email],  # Recipient email
                fail_silently=False,
            )

            return Response({"message": "Verification code sent"}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({"error": "Email not found"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        otp_input = request.data.get('code')
        new_password = request.data.get('newPassword')

        # Validate inputs
        if not otp_input or not new_password:
            return Response({"error": "All fields (OTP, newPassword) are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the OTP entry based on the provided code
            otp_entry = UserOTP.objects.filter(otp=otp_input).order_by('-created_at').first()

            if not otp_entry:
                return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

            # Check if OTP is expired
            if otp_entry.is_expired():
                return Response({"error": "OTP expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)

            # Get the user from the OTP entry
            user = otp_entry.user

            # Reset password
            user.password = make_password(new_password)  # Hash the new password
            user.save()

            # Delete the used OTP entry
            otp_entry.delete()

            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

