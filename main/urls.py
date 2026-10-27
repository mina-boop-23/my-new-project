from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("soon", views.soon, name="soon"),
    path("reserve", views.reserve, name="reserve")
]