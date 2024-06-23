import jwt
import requests
from django.template import loader
from django.views.generic import TemplateView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import eduverse.settings as settings

from .models import Course, Enrollment, Lesson, LessonProgress
from .serializers import (CourseContentSerializer, CourseListSerializer,
                          EnrolledCourseListSerializer, LessonSerializer)


class Courses(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        courses_list = Course.objects.all()

        if "q" in request.GET or "language" in request.GET or "subject" in request.GET:
            language_query = request.GET.get('language')
            search_query = request.GET.get('q')
            subject_query = request.GET.get('subject')

            if search_query not in ['null', '', None]:
                courses_list = courses_list.filter(name__contains = search_query)
            if language_query not in ['null', '', None]:
                courses_list = courses_list.filter(languages__name = language_query)
            if subject_query not in ['null', '', None]:
                courses_list = courses_list.filter(subject__name = subject_query)

        return Response(data={
            'success': 'true',
            'results': {
                'total_courses': len(courses_list),
                'courses': CourseListSerializer(courses_list, many=True).data,
            }
        })


class CourseDetails(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request, course_id):
        if request.headers.get('Authorization'):
            try:
                context = {'user_id': jwt.decode(request.headers['Authorization'].replace(
                    'JWT ', ''), key=settings.SECRET_KEY, algorithms=['HS256']).get('user_id')}
            except:
                return Response(data={"success": "false", "message": "Invalid Auth Token."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            context = {}
        course_query = Course.objects.filter(id = course_id).last()

        return Response(data={
            'success': 'true',
            'results': CourseContentSerializer(course_query, context=context).data, 
        })
    

class Enrollments(APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = ()

    def get(self, request):
        user_enrollments = Enrollment.objects.filter(user = request.user)
        user_courses = [x.course for x in user_enrollments]
        user_courses.reverse()

        return Response(data={
            'success': 'true',
            'results': {
                'total_courses': len(user_courses),
                'courses': EnrolledCourseListSerializer(user_courses, many=True, context = {"user_id":request.user.id}).data,
            }, 
        })
    
    def post(self, request):

        requested_course_qs = Course.objects.filter(
            id=int(request.data.get('course_id')))
        if requested_course_qs.exists():
            requested_course = requested_course_qs.last()

        check_enrollment = Enrollment.objects.filter(user = request.user, course = requested_course)
        if check_enrollment.exists():
            enrollment = check_enrollment.last()
        else:
            enrollment = Enrollment.objects.create(user = request.user, course = requested_course)

        return Response(data={
            'success': 'true',
            'results': enrollment.id, 
        })


class LessonPage(APIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    def get(self, request, course_id):
        course = Course.objects.filter(id = course_id).last()

        lessons = course.get_lessons()

        return Response(data={
            'success': 'true',
            'results': {
                "course_id":course.id,
                "course_display_name":course.display_name,
                "course_lessons":LessonSerializer(lessons, many=True, context = {'user_id': request.user.id}).data,
            }, 
        })
    
class LessonComplete(APIView):
    def post(self, request, course_id, lesson_id):

        requested_lesson = Lesson.objects.filter(id=lesson_id).last()

        check_lesson_progress = LessonProgress.objects.filter(user = request.user, lesson = requested_lesson)
        if check_lesson_progress.exists():
            lesson_progress = check_lesson_progress.last()
        else:
            lesson_progress = LessonProgress.objects.create(user = request.user, lesson = requested_lesson)

        return Response(data={
            'success': 'true',
            'results': lesson_progress.id, 
        })


