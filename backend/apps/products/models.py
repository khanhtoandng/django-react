from django.db import models
from .utils import create_new_code_number

class Category(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=256)
    category = models.ForeignKey(
        'Category',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=256)
    price = models.FloatField()
    description = models.TextField(blank=True, null=True)
    code = models.CharField(
        max_length=4,
        editable=False,
        unique=True,
        default=create_new_code_number
    )
    image = models.ImageField(upload_to='images/', max_length=2048)
    sub_category = models.ForeignKey(
        'SubCategory',
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
