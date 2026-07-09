from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from calculator.views import home, news_detail # ДОБАВИЛИ news_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('news/<int:news_id>/', news_detail, name='news_detail'), # НОВЫЙ ПУТЬ ДЛЯ НОВОСТЕЙ
    path('chatbot/', include('chatbot.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)