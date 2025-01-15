from django.urls import path
from .views import OrderView

urlpatterns = [
    path('add/', OrderView.as_view(), name='Order'),

]