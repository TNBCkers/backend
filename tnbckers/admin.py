from django.contrib import admin

from .models import User, Gig, Rating
# Register your models here.

admin.site.register(User)
admin.site.register(Gig)
admin.site.register(Rating)