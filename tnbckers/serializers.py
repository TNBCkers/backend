from dataclasses import fields
from rest_framework import serializers
from .models import User, Gig, Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = User
        fields = [
            "sub",
            "name",
            "avatar",
            "created_at"
        ]

class GigSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Gig
        fields = [
            "pk",
            "sub",
            "title",
            "description",
            "category",
            "price",
            "created_at",
            "thumbnail"
        ]

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Rating
        fields = [
            "sub",
            "gig",
            "value",
            "created_at"
        ]
