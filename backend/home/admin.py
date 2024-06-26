from django.contrib import admin

from .models import *


class Course_Admin(admin.ModelAdmin):
    list_display = ('display_name','id','created_at',)
    readonly_fields = ('id',)

class Lesson_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Subject_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Skill_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Language_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Level_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Duration_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Organization_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Instructor_Admin(admin.ModelAdmin):
    list_display = ('name','id','created_at',)
    readonly_fields = ('id',)

class Enrollment_Admin(admin.ModelAdmin):
    list_display = ('user','course','created_at',)
    readonly_fields = ('id',)

class LessonProgress_Admin(admin.ModelAdmin):
    list_display = ('user','lesson','created_at',)
    readonly_fields = ('id',)

admin.site.register(Course, Course_Admin) 
admin.site.register(Lesson, Lesson_Admin) 
admin.site.register(Subject, Subject_Admin) 
admin.site.register(Skill, Skill_Admin) 
admin.site.register(Language, Language_Admin) 
admin.site.register(Level, Level_Admin) 
admin.site.register(Duration, Duration_Admin) 
admin.site.register(Organization, Organization_Admin) 
admin.site.register(Instructor, Instructor_Admin) 
admin.site.register(Enrollment, Enrollment_Admin) 
admin.site.register(LessonProgress, LessonProgress_Admin) 