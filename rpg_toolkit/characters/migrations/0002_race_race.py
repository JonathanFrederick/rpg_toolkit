# Generated by Django 2.0.5 on 2018-06-03 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='race',
            name='race',
            field=models.TextField(default=''),
        ),
    ]