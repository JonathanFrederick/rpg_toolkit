from django.db import models

# Create your models here.
class Race(models.Model):
    race = models.TextField(default='')
