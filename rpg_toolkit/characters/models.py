from django.db import models

# Create your models here.
class Race(models.Model):
    race = models.TextField(default='')
    ability_bonus = models.TextField(default='')
    prd_url = models.URLField(default='')
