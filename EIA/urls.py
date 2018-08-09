from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^peoplemark/$', views.people, name='people'),
    url(r'^handmark/$', views.hand, name='hand'),
    url(r'^updatepeople/$', views.updatepeople, name='updatepeople'),
    url(r'^updatehand/$', views.updatehand, name='updatehand'),
]