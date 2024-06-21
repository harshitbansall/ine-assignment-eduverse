from django.urls import path

from .views import Config, ObtainAuthToken, UserCreate

# from .views import GetGameTorrents

urlpatterns = [
    path('token/obtain', ObtainAuthToken.as_view(), name='token_create'),
    path('signup', UserCreate.as_view(), name='userCreate'),
    path('config', Config.as_view(), name='Config'),
    # path('', Home.as_view(), name='Home'),
    # path('home', Home.as_view(), name='Home'),
    # path('getGameTorrents', GetGameTorrents.as_view(), name='GetGameTorrents'),

]
