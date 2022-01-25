from rest_framework import generics
from .models import User, Gig, Rating
from .serializers import UserSerializer, GigSerializer, RatingSerializer

class Users(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Gigs(generics.ListCreateAPIView):

    queryset = Gig.objects.all()
    serializer_class = GigSerializer

class GigsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gig.objects.all()
    serializer_class = GigSerializer

class Rating(generics.ListCreateAPIView):

    queryset = Rating.objects.all()
    serializer_class = RatingSerializer



    

