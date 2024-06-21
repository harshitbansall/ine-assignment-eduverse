import json
import random

import requests
from django.template import loader
from django.views.generic import TemplateView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

import eduverse.settings as settings

from .models import Course
from .serializers import CourseSerializer

# class Home(TemplateView):
#     def get(self, request):
#         return render(request, 'home.html')


class GetCourses(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        language_query = request.GET.get('language')
        search_query = request.GET.get('q')

        if search_query !="" and search_query is not None:
            courses_list = Course.objects.filter(name__contains = search_query)
        elif language_query !="" and language_query is not None:
            courses_list = Course.objects.filter(language__contains = language_query)
        else:
            courses_list = Course.objects.all().select_related()

        return Response(data={
            'success': 'true',
            'results': {
                'total_courses': len(courses_list),
                'courses': CourseSerializer(courses_list, many=True).data,
            }
        })
