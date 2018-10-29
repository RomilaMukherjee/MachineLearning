from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
    url(r'^webapp/', include('webapp.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
