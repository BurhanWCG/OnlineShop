from django.db import models
import uuid  # To generate UUIDs

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # UUID as primary key
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    images = models.JSONField() 
    sizes = models.JSONField(blank=True, null=True)  # List of available sizes (e.g., ["S", "M", "L", "XL"])
    colors = models.JSONField(blank=True, null=True) # List of available colors (e.g., ["Black", "Brown"])
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(blank=True, default=0)  # Quantity field
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set when product is created

    def __str__(self):
        return self.name


