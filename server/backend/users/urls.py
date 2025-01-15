from django.urls import path
from .views import GoogleLoginAPIView,SignupView,LoginView,ForgotPasswordView,ResetPasswordView

urlpatterns = [
    path('auth/google/', GoogleLoginAPIView.as_view(), name='google-login'),
    path('auth/signup/', SignupView.as_view(), name='singnup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/forgotpassword/', ForgotPasswordView.as_view(), name='forgotpassword'),
    path('auth/resetpassword/', ResetPasswordView.as_view(), name='resetpassword'),
]
