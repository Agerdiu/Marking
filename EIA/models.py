from django.db import models
from random import randint
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    telephone = models.CharField(max_length=15, null=True)
    position = models.CharField(max_length=255, null=True)

class Peopledata(models.Model):
    id = models.IntegerField(primary_key=True)
    dataname = models.CharField(max_length=255)
    datajson = models.TextField()
    token = models.IntegerField()
class Handsdata(models.Model):
    id = models.IntegerField(primary_key=True)
    dataname = models.CharField(max_length=255)
    token = models.IntegerField()
