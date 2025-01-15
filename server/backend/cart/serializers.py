
from rest_framework import serializers
from .models import Cart, CartItem
from product.models import Product

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)
    product_image = serializers.JSONField(source='product.images.image')
    product_quantity = serializers.IntegerField(source = 'product.quantity')

    class Meta:
        model = CartItem
        fields = ['id', 'product_id', 'product_name', 'product_price', 'product_image', 'product_quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']
