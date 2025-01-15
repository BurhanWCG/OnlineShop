# cart/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from product.models import Product
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .serializers import CartSerializer, CartItemSerializer


# Add product to cart (no quantity, just product_id)
class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = request.data.get("product_id")

        # Check if product exists
        product = get_object_or_404(Product, id=product_id)

        # Get the user's cart (create one if it doesn't exist)
        cart, created = Cart.objects.get_or_create(user=request.user)

        # Check if the product is already in the cart (no quantity to update, just add or skip)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:  # If the product is already in the cart
            return Response({"message": f"{product.name} is already in the cart."}, status=status.HTTP_200_OK)

        return Response({"message": f"Item added to cart: {product.name}"}, status=status.HTTP_200_OK)



class GetCartItemsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,  *args, **kwargs):
      
        cart = get_object_or_404(Cart, user=request.user)

        cart_items = cart.items.select_related('product')

        serializer = CartItemSerializer(cart_items, many=True)

        return Response({"cart_items": serializer.data}, status=status.HTTP_200_OK)


# Remove item from cart (by product_id)
class RemoveCartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        product_id = request.data.get("product_id")

        cart = get_object_or_404(Cart, user=request.user)

        cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)

        cart_item.delete()

        return Response({"message": "Cart item removed"}, status=status.HTTP_200_OK)
