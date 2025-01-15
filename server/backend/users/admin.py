# admin.py in your app

from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin

# Optionally, you can create a custom UserAdmin to customize the admin panel
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = [ 'email', 'is_staff']
    ordering = ['email'] 
    search_fields = ['email']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),  # Only email and password fields
    )
    
    exclude = ('username', 'first_name', 'last_name') 
   
admin.site.register(CustomUser, CustomUserAdmin)
