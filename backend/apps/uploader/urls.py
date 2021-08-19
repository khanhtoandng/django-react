from django.urls import path, include

from .views import *

app_name = 'uploader'

urlpatterns = [
    path('subimage/list/<str:pk>', sub_image_list, name='sub-image-list'),
    path('subimage/create/',sub_image_create, name='sub-image-create'),
    path('subimage/update/<str:pk>', sub_image_update, name='sub-image-update'),
    path('subimage/delete/<str:pk>', sub_image_delete, name='sub-image-delete'),
]