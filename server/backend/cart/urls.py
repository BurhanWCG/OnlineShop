# cart/urls.py
from django.urls import path
from .views import AddToCartView, RemoveCartItemView, GetCartItemsView

urlpatterns = [
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('get/', GetCartItemsView.as_view(), name='get-cart-items'),
    path('remove/', RemoveCartItemView.as_view(), name='remove-cart-item'),
]
