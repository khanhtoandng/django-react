# Generated by Django 3.1.6 on 2021-07-16 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploader', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='subimage',
            options={'verbose_name': 'ImageUploader', 'verbose_name_plural': 'ImageUploader'},
        ),
        migrations.AddField(
            model_name='subimage',
            name='ordinal_number',
            field=models.IntegerField(default=0),
        ),
    ]
