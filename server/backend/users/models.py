from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from .manager import CustomUserManager
from django.utils.timezone import now, timedelta
import uuid
class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField( primary_key=True, default=uuid.uuid4, editable=False )
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    otp = models.CharField(max_length=4, blank=True, null=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
class UserOTP(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="otp_entries")
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        # Automatically set expiry to 5 minutes from creation
        if not self.expires_at:
            self.expires_at = now() + timedelta(minutes=5)
        super().save(*args, **kwargs)

    def is_expired(self):
        return now() > self.expires_at

    def __str__(self):
        return f"OTP for {self.user.email} - {self.otp}"