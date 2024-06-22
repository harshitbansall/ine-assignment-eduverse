# Generated by Django 4.0.1 on 2024-06-22 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_lesson'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='lesson_number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
