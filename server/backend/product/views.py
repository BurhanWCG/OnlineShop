from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.permissions import AllowAny

class ProductListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

