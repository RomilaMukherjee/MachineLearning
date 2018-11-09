from django.conf.urls import url
from django.contrib import admin
from .views import employeeList
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^employee/', employeeList.as_view()),
    url(r'^region/', employeeList.as_view()),
    url('data', employeeList.get),
    url('monthlychart/', employeeList.displayMonthlyChart),
    url('login/', employeeList.auth),
]
