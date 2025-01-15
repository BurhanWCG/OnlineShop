from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'cart', 'total_amount', 'payment_status', 'account_number', 'created_at']
        read_only_fields = ['user', 'cart', 'payment_status', 'created_at']
