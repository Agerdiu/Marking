from django import forms
from .models import User

class UserLoginForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email', 'password']

class UserRegisterForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'telephone', 'email', 'password','position']
