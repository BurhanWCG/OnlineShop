from django.db import models
from django.conf import settings
from product.models import Product
from cart.models import Cart,CartItem  # Assuming you have a Product model



class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=20, choices=[('PENDING', 'Pending'), ('SUCCESS', 'Success'), ('FAILED', 'Failed')])
    account_number = models.CharField(max_length=20, blank=True, null=True)  # Store account number
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} for {self.user.email}"
