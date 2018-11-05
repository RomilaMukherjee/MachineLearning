from django.db import models

# Create your models here.


class employee(models.Model):
    loginName = models.CharField(max_length=10)
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    password = models.CharField(max_length=10)
    emp_id = models.IntegerField()

    def _str_(self):
        return self.firstName

class region(models.Model):
    latitue = models.CharField(max_length=20)
    longitutude = models.CharField(max_length=20)  
    name = models.CharField(max_length=20)

    def _str_(self):
        return self.name       
