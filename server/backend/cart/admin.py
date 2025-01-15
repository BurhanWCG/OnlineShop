from django.contrib import admin
from .models import Cart, CartItem
from product.models import Product  # Import Product model to display product details in admin

# Customizing the CartItem admin interface
class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1  # Number of empty forms to display by default
    fields = ['product']  # Show only the product field for cart items

# Customizing the Cart admin interface
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at') 
    search_fields = ('user__username',)  # Make it searchable by user's username
    inlines = [CartItemInline]  # Add CartItem inline editing in Cart admin

# Registering the Cart model with the admin
admin.site.register(Cart, CartAdmin)

# Registering the CartItem model
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product')  # Show which cart and product the cart item belongs to
    search_fields = ('cart__user__username', 'product__name')  # Search by user and product name

admin.site.register(CartItem, CartItemAdmin)
