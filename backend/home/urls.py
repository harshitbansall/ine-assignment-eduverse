from django.urls import path

from .views import (CourseDetails, Courses, Enrollments, LessonComplete,
                    LessonPage)

urlpatterns = [
    path('courses', Courses.as_view(), name='Courses'),
    path('courses/<int:course_id>/content', CourseDetails.as_view(), name='CourseDetails'),
    path('enrollments', Enrollments.as_view(), name='Enrollments'),
    path('courses/<int:course_id>/lessons', LessonPage.as_view(), name='LessonPage'),
    path('courses/<int:course_id>/lessons/<int:lesson_id>', LessonComplete.as_view(), name='LessonComplete'),

]
