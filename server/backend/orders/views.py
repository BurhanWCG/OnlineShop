from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, Cart, CartItem
from .serializers import OrderSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        total_amount = request.data.get('totalAmount')  
        account_number = request.data.get('accountNumber')  

        
        if not total_amount:
            return Response({"error": "Total amount is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            
            cart = Cart.objects.get(user=user)  
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items:
            return Response({"error": "No items in cart."}, status=status.HTTP_400_BAD_REQUEST)

        
        if not total_amount:
            total_amount = sum(item.product.price * item.product_quantity for item in cart_items)

        # Create the order
        order = Order.objects.create(
            user=user,
            cart=cart,
            total_amount=total_amount,
            payment_status='SUCCESS',  
            account_number=account_number,  
        )

        
        cart_items.delete()

        
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
