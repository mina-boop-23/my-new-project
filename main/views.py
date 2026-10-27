from django.shortcuts import render, redirect
from django.http import JsonResponse

from.models import *
# Create your views here.

def index(request):
    if request.method == 'GET':
        return render(request, "index.html", {
                          'reservation_open' : Reservation.objects.count() < 80
                      })

def reserve(request):
    if request.method == 'POST':
        if Reservation.objects.count() < 80:
            try:
                a = Reservation(
                    first_name = request.POST['first_name'],
                    last_name = request.POST['last_name'],
                    phone_number = request.POST['phone_number'],
                    major = request.POST['major'],
                    degree = request.POST['degree']
                )
                a.save()
                return JsonResponse({"message": "ثبت نام با موفقیت انجام شد."}, status=201)
            except:
                return JsonResponse({"message": "ثبت نام ناموفق بود."}, status=400)
        return JsonResponse({"message": "ظرفیت تکمیل شده و ثبت نام جدید امکان پذیر نیست."}, status=400)
    return JsonResponse({"message": "POST request required."}, status=400)