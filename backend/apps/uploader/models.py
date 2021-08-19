from django.db import models

from ..products.models import Product

# Create your models here.

class SubImage(models.Model):
        
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
    )
    ordinal_number = models.IntegerField(default=0,)
    image = models.ImageField(upload_to='images/',max_length=2048,)

