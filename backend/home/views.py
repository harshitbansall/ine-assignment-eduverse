import json
import random

import requests
from django.template import loader
from django.views.generic import TemplateView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

import eduverse.settings as settings

from .models import Course, Enrollment
from .serializers import CourseContentSerializer, CourseListSerializer


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
        course_query = Course.objects.filter(id = course_id).last()

        return Response(data={
            'success': 'true',
            'results': CourseContentSerializer(course_query).data, 
        })
    

class Enrollments(APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = ()

    def get(self, request):

        user_enrollments = Enrollment.objects.filter(user = request.user)
        user_courses = [x.course for x in user_enrollments]

        return Response(data={
            'success': 'true',
            'results': CourseListSerializer(user_courses, many=True).data, 
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