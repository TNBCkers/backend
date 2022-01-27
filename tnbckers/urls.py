from django.urls import path
from . import views

urlpatterns = [
    path("gigs", views.Gigs.as_view()),
    path("gigs/<int:id>", views.GigsDetail.as_view())
]
