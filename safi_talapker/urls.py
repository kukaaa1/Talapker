from django.contrib import admin
from django.urls import path
from calculator.views import home  # Импортируем нашу логику из 1 шага

urlpatterns = [
    path('admin/', admin.site.urls), # Путь к панели управления (уже был)
    path('', home, name='home'),     # Наша главная страница (пустые кавычки означают корень сайта)
]