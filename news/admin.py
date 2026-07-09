from django.contrib import admin
from .models import NewsItem, SiteConfiguration, Sponsor

# Регистрируем наши модели в панели администратора
admin.site.register(NewsItem)
admin.site.register(SiteConfiguration)
admin.site.register(Sponsor)