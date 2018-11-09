from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employee
from .models import region
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
        json_string = {"result": [{"id": "2018-11-09", "value": "6235.8515625"},{"id": "2018-11-10", "value": "8235.8515625"},
           {"id": "2018-11-11", "value": "8150.03271484375"},{"id": "2018-11-12", "value": "8235.8515625"},
           {"id": "2018-11-13", "value": "8235.8515625"}]}
        return HttpResponse(json.dumps(json_string), content_type='application/json')

    def get(self, request):
        region1 = region.objects.all()
        serailizer = employeeSerializer(region1, many=True)
        return HttpResponse(json.dumps(serailizer.data), content_type="application/json")
    def post(self):
        pass

    def auth(request):   
        if True:
            json_result = {"authenticated" :True}
        else:
            json_result = {"authenticated" :False}
        return HttpResponse(json.dumps(json_result), content_type='application/json')    
