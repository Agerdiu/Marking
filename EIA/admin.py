from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email','last_login','date_joined']

admin.site.register(User,UserAdmin)

# Register your models here.
