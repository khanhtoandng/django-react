from django.shortcuts import render
from rest_framework.generics import UpdateAPIView, DestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as Filters
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from .models import *

class ProductListPagination(PageNumberPagination):
    page_size = 3  
    page_size_query_param = 'page_size'
    max_page_size = 6

class ProductList(ListAPIView):
    """Product pagination"""

    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductDetailSerializer
    pagination_class = ProductListPagination

class ProductDetail(RetrieveAPIView):
    """Get product detail"""
    
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

class ProductCreate(APIView):
    """Create a new product"""

    serializer_class = ProductSerializer

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     


class ProductDelete(DestroyAPIView):
    """Delete product"""

    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class ProductUpdate(UpdateAPIView):
    """Update product"""

    serializer_class = ProductUpdateSerializer
    queryset = Product.objects.all()

    def update(self, request, pk, format=None):
        queryset = Product.objects.get(id=pk)
        serializer = ProductUpdateSerializer(queryset, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryList(ListAPIView):
    """Get list of category"""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubCategoryList(ListAPIView):
    """Get list of sub-Category"""

    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class ProductFilter(Filters.FilterSet):
    class Meta:
        model = Product;
        fields = ['sub_category__category', 'sub_category']

class ProductListFilter(ListAPIView):
    """Filter product by Product type"""
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    pagination_class = ProductListPagination
    filterset_class = ProductFilter
    ordering_fields = ("id", "sub_category__category", 'sub_category')
    order_by = ['-id']

class ProductListSearch(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    pagination_class = ProductListPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'code',]
    filter_fields = ['sub_category__category', 'sub_category']
    ordering_fields = ("id", "name","code",)
    order_by = ['-id']
    

list_product = ProductList.as_view()
detail_product = ProductDetail.as_view()
create_product = ProductCreate.as_view()
update_product = ProductUpdate.as_view()
delete_product = ProductDelete.as_view()
search_product = ProductListSearch.as_view()
filter_product = ProductListFilter.as_view()
list_category = CategoryList.as_view()
list_sub_category = SubCategoryList.as_view()

