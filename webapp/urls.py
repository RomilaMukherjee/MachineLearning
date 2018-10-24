from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^webapp/', views.selectChart, name="selectChart")
]
