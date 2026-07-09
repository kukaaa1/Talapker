from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from calculator.views import home, news_detail 

# --- АДМИН ҚҰРУҒА АРНАЛҒАН КІТАПХАНАЛАР ---
from django.contrib.auth.models import User
from django.http import HttpResponse

# --- АДМИН ҚҰРАТЫН ФУНКЦИЯ ---
def create_admin(request):
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin12345')
        return HttpResponse('Админ сәтті құрылды! Логин: admin, Пароль: admin12345')
    return HttpResponse('Админ базада бар, қайта құрудың қажеті жоқ!')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('news/<int:news_id>/', news_detail, name='news_detail'), 
    path('chatbot/', include('chatbot.urls')),
    
    # --- АДМИН ҚҰРАТЫН СІЛТЕМЕ ---
    path('create-admin/', create_admin), 
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)