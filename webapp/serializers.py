from rest_framework import serializers
from .models import employee
from .models import region


class employeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = employee
        fields = '__all__'
        model = region
        fields = '__all__'
