from rest_framework import serializers

from .models import *


class CourseListSerializer(serializers.HyperlinkedModelSerializer):
    course_id = serializers.IntegerField(source='id')
    course_name = serializers.CharField(source='name')
    course_display_name = serializers.CharField(source='display_name')
    course_image_url = serializers.CharField(source='image_url')

    course_description = serializers.CharField(source='description')
    course_skills = serializers.SerializerMethodField("get_course_skills")
    course_languages = serializers.SerializerMethodField("get_course_languages")
    course_level = serializers.CharField(source="level")
    course_duration = serializers.CharField(source="duration")

    course_organizations = serializers.SerializerMethodField("get_course_organizations")
    course_instructors = serializers.SerializerMethodField("get_course_instructors")

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
    
    

class EnrolledCourseListSerializer(serializers.HyperlinkedModelSerializer):
    course_id = serializers.IntegerField(source='id')
    course_name = serializers.CharField(source='name')
    course_display_name = serializers.CharField(source='display_name')
    course_image_url = serializers.CharField(source='image_url')

    course_skills = serializers.SerializerMethodField("get_course_skills")

    course_total_lessons = serializers.SerializerMethodField("get_total_lessons")
    course_completed_lessons = serializers.SerializerMethodField("get_completed_lessons")

    class Meta:
        model = Course
        fields = ('course_id', 'course_name',
                  'course_display_name', 'course_image_url', 'course_skills', 'course_total_lessons', 'course_completed_lessons')

    def get_course_skills(self, obj):
        return ", ".join([str(x) for x in obj.skills.all()])
    
    def get_total_lessons(self, obj):
        return len(obj.lesson_set.all())
    
    def get_completed_lessons(self, obj):
        lesson_progess_qs = LessonProgress.objects.filter(lesson__course=obj, user__id = self.context.get("user_id"))
        return len(lesson_progess_qs)


class LessonSnippetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Lesson
        fields = ('id','name','lesson_number')

class CourseContentSerializer(serializers.HyperlinkedModelSerializer):
    course_id = serializers.IntegerField(source='id')
    course_name = serializers.CharField(source='name')
    course_display_name = serializers.CharField(source='display_name')
    course_image_url = serializers.CharField(source='image_url')

    course_subject = serializers.CharField(source='subject')
    course_description = serializers.CharField(source='description')
    course_skills = serializers.SerializerMethodField("get_course_skills")
    course_languages = serializers.SerializerMethodField("get_course_languages")
    course_level = serializers.CharField(source="level")
    course_duration = serializers.CharField(source="duration")

    course_about = serializers.CharField(source="about")
    course_outcomes = serializers.CharField(source="outcomes")
    
    course_organizations = serializers.SerializerMethodField("get_course_organizations")
    course_instructors = serializers.SerializerMethodField("get_course_instructors")

    course_lessons = serializers.SerializerMethodField("get_course_lessons")
    is_enrolled = serializers.SerializerMethodField("get_is_enrolled")

    class Meta:
        model = Course
        fields = ('course_id', 'course_name','course_display_name', 'course_image_url','course_subject', 'course_description', 'course_skills', 'course_languages', 'course_level', 'course_duration', 'course_about', 'course_outcomes', 'course_organizations', 'course_instructors', 'course_lessons', 'is_enrolled')

    def get_course_skills(self, obj):
        return ", ".join([str(x) for x in obj.skills.all()])

    def get_course_languages(self, obj):
        return ", ".join([str(x) for x in obj.languages.all()])
    
    def get_course_organizations(self, obj):
        return ", ".join(list(set([str(x.organization) for x in obj.instructors.all()])))

    def get_course_instructors(self, obj):
        return ", ".join([str(x) for x in obj.instructors.all()])
    
    def get_course_lessons(self, obj):
        return LessonSnippetSerializer(obj.get_lessons(), many=True).data

    def get_is_enrolled(self, obj):
        enrollment = Enrollment.objects.filter(user__id = self.context.get("user_id"), course = obj)
        if enrollment.exists():
            return True
        else:
            return False


class LessonSerializer(serializers.HyperlinkedModelSerializer):
    lesson_id = serializers.IntegerField(source='id')
    lesson_name = serializers.CharField(source='name')
    lesson_description = serializers.CharField(source='description')
    lesson_is_completed = serializers.SerializerMethodField("get_is_completed")

    class Meta:
        model = Lesson
        fields = ('lesson_id','lesson_name','lesson_number','lesson_description', 'lesson_is_completed')

    def get_is_completed(self, obj):
        lesson_progess = LessonProgress.objects.filter(user__id = self.context.get("user_id"), lesson = obj)
        if lesson_progess.exists():
            return True
        else:
            return False