from django.contrib import admin
from .models import Category, Product

# Customizing the Product model admin
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'created_at')  # Fields to display in the list view
    search_fields = ('name', 'category__name')  # Allow search by name and category name
    ordering = ('-created_at',)  # Order by creation date in descending order
    readonly_fields = ('id',)  # Make the UUID field read-only

# Customizing the Category model admin
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')  # Fields to display in the list view
    search_fields = ('name',)  # Allow search by category name
    ordering = ('name',)  # Order alphabetically by category name
    readonly_fields = ('id',)  # Correctly define as a tuple with one item

# Registering models with their custom admin classes
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)

