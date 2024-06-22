from django.db import models

from authentication.models import User

################################################################################################

class Subject(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'subjects'

    def __str__(self):
        return '{}'.format(self.name)

class Skill(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'skills'

    def __str__(self):
        return '{}'.format(self.name)
    

class Language(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'languages'

    def __str__(self):
        return '{}'.format(self.name)
    
class Level(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'levels'

    def __str__(self):
        return '{}'.format(self.name)

class Duration(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'durations'

    def __str__(self):
        return '{}'.format(self.name)

################################################################################################

class Organization(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'organizations'

    def __str__(self):
        return '{}'.format(self.name)


class Instructor(models.Model):
    name = models.CharField(max_length=100)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'instructors'

    def __str__(self):
        return '{}'.format(self.name)

################################################################################################

class Course(models.Model):
    name = models.CharField(max_length=100)
    display_name = models.CharField(max_length=100)
    image_url = models.TextField(blank=True, null=True)

    description = models.TextField(blank=True, null=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, blank=True, null=True)
    skills = models.ManyToManyField(Skill)
    languages = models.ManyToManyField(Language)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, blank=True, null=True)
    duration = models.ForeignKey(Duration, on_delete=models.CASCADE, blank=True, null=True)
    instructors = models.ManyToManyField(Instructor)

    about = models.TextField(blank=True, null=True)
    outcomes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'courses'

    def __str__(self):
        return 'Course {}: {}'.format(self.id, self.display_name)

    def return_is_completed(self, user_id):
        return (self.courseprogress_set.filter(user__id=user_id))

    def get_price(self):
        return (self.courseprice_set.all().last().price)
    
    def get_lessons(self):
        return (self.lesson_set.all().order_by('lesson_number'))
    
class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    lesson_number = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'lessons'

    def __str__(self):
        return 'Course {} Lesson {}: {}'.format(self.course.id, self.lesson_number, self.name)

    # def get_topics(self):
    #     return (self.topic_set.all().order_by('topic_number'))
    

################################################################################################

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'enrollments'

    def __str__(self):
        return '{} : {}'.format(self.user.full_name, self.course.name)