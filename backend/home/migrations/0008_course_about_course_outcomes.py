# Generated by Django 4.0.1 on 2024-06-22 00:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_subject_course_subject'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='about',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='outcomes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
