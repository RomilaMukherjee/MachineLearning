from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employee
from .serializers import employeeSerializer
import json


class employeeList(APIView):

    def get(self, request):
        employees1 = employee.objects.all()
        serailizer = employeeSerializer(employees1, many=True)
        return HttpResponse(json.dumps(serailizer.data), content_type="application/json")

    def post(self):
        pass

    def displayMonthlyChart(request):
        json_string = '''[{"day": "2017-04-18", "productPerceivedQuality": "2.8"},{"day": "2017-04-19", "productPerceivedQuality": "2.9"},{"day": "2017-04-20", "productPerceivedQuality": "2.7"},{"day": "2017-04-21", "productPerceivedQuality": "4.3"},{"day": "2017-04-22", "productPerceivedQuality": "4.6"},{"day": "2017-04-23", "productPerceivedQuality": "5"},{"day": "2017-04-24", "productPerceivedQuality": "5.2"},{"day": "2017-04-25", "productPerceivedQuality": "5.1"},{"day": "2017-04-26", "productPerceivedQuality": "4.8"},{"day": "2017-04-27", "productPerceivedQuality": "4.9"},{"day": "2017-04-28", "productPerceivedQuality": "5.1"},{"day": "2017-04-29", "productPerceivedQuality": "5.3"},{"day": "2017-04-30", "productPerceivedQuality": "5.6"},{"day": "2017-05-01", "productPerceivedQuality": "6.2"}]'''
        return HttpResponse(json.dumps(json_string), content_type='application/json')
