# Generated by Django 3.1.6 on 2021-07-08 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20210707_0405'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='sub_image',
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(max_length=2048, upload_to='images'),
        ),
    ]
