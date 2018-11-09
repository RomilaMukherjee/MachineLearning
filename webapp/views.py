from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employee
from .models import region
from webapp.models import employee,region
from django.utils import timezone
from .serializers import employeeSerializer
from .serializers import regionSerializer
import json


class employeeList(APIView):

    def getEmp(request):
        employees1 = employee.objects.all()
        serailizer = employeeSerializer(employees1, many=True)
        json_emp = {"employees" : serailizer.data}
        return HttpResponse(json.dumps(json_emp), content_type="application/json")

    def postEmp(self):
        pass

    def displayMonthlyChart(request):
        json_string = {"result": [{"id": "2018-11-09", "value": "6235.8515625"},{"id": "2018-11-10", "value": "8235.8515625"},
           {"id": "2018-11-11", "value": "8150.03271484375"},{"id": "2018-11-12", "value": "8235.8515625"},
           {"id": "2018-11-13", "value": "8235.8515625"}]}
        return HttpResponse(json.dumps(json_string), content_type='application/json')

    def getReg(request):
        region1 = region.objects.all()
        serailizer = regionSerializer(region1, many=True)
        json_reg = {"regions" : serailizer.data}
        return HttpResponse(json.dumps(json_reg), content_type="application/json")
    def postReg(self):
        pass

    def create(self, validated_data):
        region = region(name=validated_data.get('name', None))
        region.save()
        return true

    def auth(request):   
        if True:
            json_result = {"authenticated" :True}
        else:
            json_result = {"authenticated" :False}
        return HttpResponse(json.dumps(json_result), content_type='application/json')   

