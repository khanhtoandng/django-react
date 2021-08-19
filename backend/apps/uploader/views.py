from django.shortcuts import render

from rest_framework.generics import ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import *
from .models import *
from ..products import *

class SubImageList(ListAPIView):
    """Get list of sub-Image"""

    serializer_class =  SubImageSerializer

    def get_queryset(self):
        queryset = SubImage.objects.filter(product_id=self.kwargs['pk'])

        return queryset


class SubImageCreate(APIView):
    """Create Sub-Image"""

    serializer_class = SubImageSerializer

    def post(self, request, format=None):
        serializer = SubImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class SubImageUpdate(UpdateAPIView):
    """Update sub-image"""

    serializer_class = SubImageSerializer
    queryset = SubImage.objects.all()

    def update(self, request, pk, format=None):
        queryset = SubImage.objects.get(pk=pk)
        serializer = SubImageSerializer(queryset, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
class SubImageDelete(DestroyAPIView):
    """Delete sub-image"""

    queryset = SubImage.objects.all()
    serializer_class = SubImageSerializer


sub_image_list = SubImageList.as_view()
sub_image_create = SubImageCreate.as_view()
sub_image_update = SubImageUpdate.as_view()
sub_image_delete = SubImageDelete.as_view()