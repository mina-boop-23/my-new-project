from django.db import models

class Reservation(models.Model):

    full_name = models.CharField()
    phone_number = models.CharField()
    field = models.CharField()
    degree = models.CharField()