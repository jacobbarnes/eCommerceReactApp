# Generated by Django 3.0.3 on 2020-03-19 03:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_sale'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sale',
            old_name='addres1',
            new_name='address1',
        ),
        migrations.RenameField(
            model_name='sale',
            old_name='addres2',
            new_name='address2',
        ),
    ]
