from django.urls import path

from .views import CourseDetails, Courses, Enrollments

urlpatterns = [
    # path('', Home.as_view(), name='Home'),
    # path('home', Home.as_view(), name='Home'),
    path('courses', Courses.as_view(), name='Courses'),
    path('courses/<int:course_id>/content', CourseDetails.as_view(), name='CourseDetails'),
    path('enrollments', Enrollments.as_view(), name='Enrollments'),

]
