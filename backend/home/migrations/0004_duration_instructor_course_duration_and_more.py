# Generated by Django 4.0.1 on 2024-06-21 01:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_level_course_level'),
    ]

    operations = [
        migrations.CreateModel(
            name='Duration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'durations',
            },
        ),
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'instructors',
            },
        ),
        migrations.AddField(
            model_name='course',
            name='duration',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.duration'),
        ),
        migrations.AddField(
            model_name='course',
            name='instructors',
            field=models.ManyToManyField(to='home.Instructor'),
        ),
    ]
