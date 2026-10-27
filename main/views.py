import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from.models import *
# Create your views here.

def index(request):
    if request.method == 'GET':
        return render(request, "index.html", {
                          'reservation_open' : Reservation.objects.count() < 80
                      })

def soon(request):
    if request.method == 'GET':
        return render(request, "soon.html")
@csrf_exempt
def reserve(request):
    if request.method == 'POST':
        if Reservation.objects.count() < 80:
            try:
                data = json.loads(request.body)
                a = Reservation(
                    full_name = data['full_name'],
                    phone_number = data['phone_number'],
                    field = data['field'],
                    degree = data['degree']
                )
                a.save()
                return JsonResponse({"message": "ثبت نام با موفقیت انجام شد."}, status=201)
            except:
                return JsonResponse({"message": "ثبت نام ناموفق بود."}, status=400)
        return JsonResponse({"message": "ظرفیت تکمیل شده و ثبت نام جدید امکان پذیر نیست."}, status=400)
    return JsonResponse({"message": "POST request required."}, status=400)