from django.urls import path

from .views import *

app_name = 'products'

urlpatterns = [
    path('product/create/', create_product, name='create-product'),
    path('product/update/<int:pk>', update_product, name='update-product'),
    path('product/delete/<int:pk>', delete_product, name='delete-product'),
    path('product/list/', list_product, name='list-product'),
    path('product/detail/<int:pk>', detail_product, name='detail-product'),
    path('product/filter/', filter_product, name='filter-product'),
    path('product/search/',search_product, name='search-product'),
    path('category/list/', list_category, name='list-category'),
    path('subcategory/list/', list_sub_category, name='list-sub-category'),
]
