from statistics import mode
from unicodedata import category
from django.db import models

# Create your models here.
class User(models.Model):
    sub = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255) # Google avatar link
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'User Object: {self.name}'

    
class Gig(models.Model):
    sub = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.BigIntegerField()
    thumbnail = models.ImageField('gig_thumbnails')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'Gig Object: {self.title}'
    
class Rating(models.Model):
    gig = models.ForeignKey(Gig, on_delete=models.CASCADE, unique=True)
    sub = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'Rating Object for {self.gig}'
