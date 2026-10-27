from django.db import models

# Create your models here.

class Reservation(models.Model):

    first_name = models.CharField()
    last_name = models.CharField()
    phone_number = models.CharField()
    major = models.CharField()
    degree = models.CharField()