from rest_framework import serializers

from .models import *


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    course_id = serializers.IntegerField(source='id')
    course_name = serializers.CharField(source='name')
    course_display_name = serializers.CharField(source='display_name')
    course_image_url = serializers.CharField(source='image_url')

    course_description = serializers.CharField(source='description')
    course_skills = serializers.SerializerMethodField("get_course_skills")
    course_languages = serializers.SerializerMethodField(
        "get_course_languages")
    course_level = serializers.CharField(source="level")
    course_duration = serializers.CharField(source="duration")

    course_organizations = serializers.SerializerMethodField(
        "get_course_organizations")
    course_instructors = serializers.SerializerMethodField(
        "get_course_instructors")

    class Meta:
        model = Course
        fields = ('course_id', 'course_name',
                  'course_display_name', 'course_image_url', 'course_description', 'course_skills', 'course_languages', 'course_level', 'course_duration', 'course_organizations', 'course_instructors')

    def get_course_skills(self, obj):
        return ", ".join([str(x) for x in obj.skills.all()])

    def get_course_languages(self, obj):
        return ", ".join([str(x) for x in obj.languages.all()])
    
    def get_course_organizations(self, obj):
        return ", ".join(list(set([str(x.organization) for x in obj.instructors.all()])))

    def get_course_instructors(self, obj):
        return ", ".join([str(x) for x in obj.instructors.all()])

    # def get_course_progress(self, obj):
    #     return CourseProgressSerializer(obj.return_is_completed(self.context.get("user_id")), many=True).data
