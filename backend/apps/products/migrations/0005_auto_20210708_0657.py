# Generated by Django 3.1.6 on 2021-07-08 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_product_sub_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='sub_image',
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(max_length=2048, upload_to='images/'),
        ),
    ]
