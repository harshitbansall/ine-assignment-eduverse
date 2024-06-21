from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('home.urls')),
    path('api/', include('authentication.urls')),
]

admin.site.site_header = "Eduverse"
admin.site.site_title = "Eduverse"
admin.site.index_title = "Eduverse"