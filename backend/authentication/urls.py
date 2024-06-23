from django.urls import path

from .views import Config, ObtainAuthToken, UserCreate

urlpatterns = [
    path('auth/login', ObtainAuthToken.as_view(), name='login'),
    path('auth/register', UserCreate.as_view(), name='userCreate'),
    path('config', Config.as_view(), name='Config'),

]
