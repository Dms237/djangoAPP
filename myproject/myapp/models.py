from django.db import models

class Record(models.Model):
    text = models.CharField(max_length=255)
    
    def __str__(self):
        return self.text

# Create your models here.
