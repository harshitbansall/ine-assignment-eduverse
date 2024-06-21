from django.urls import path

from .views import GetCourses

urlpatterns = [
    # path('', Home.as_view(), name='Home'),
    # path('home', Home.as_view(), name='Home'),
    path('courses', GetCourses.as_view(), name='GetCourses'),

]
