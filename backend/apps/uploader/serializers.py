from rest_framework import serializers
from .models import *

class SubImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubImage
        fields = ['id','image','product','ordinal_number']
        ordering = ['id']
