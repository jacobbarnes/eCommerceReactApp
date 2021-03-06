# Generated by Django 3.0.3 on 2020-03-19 02:03

import api.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('addres1', models.TextField()),
                ('addres2', models.TextField(blank=True, null=True)),
                ('city', models.TextField()),
                ('state', models.TextField()),
                ('zipcode', models.TextField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('items', api.fields.JSONField(default=dict)),
                ('payment_intent', api.fields.JSONField(default=dict)),
            ],
        ),
    ]
