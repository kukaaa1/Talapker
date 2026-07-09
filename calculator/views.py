from django.shortcuts import render, get_object_or_404
from news.models import SiteConfiguration, Sponsor, NewsItem

# Функция для главной страницы
def home(request):
    config = SiteConfiguration.objects.order_by('-updated_at').first()
    sponsors = Sponsor.objects.all()
    news_list = NewsItem.objects.order_by('-created_at')[:3]
    
    return render(request, 'index.html', {
        'config': config,
        'sponsors': sponsors,
        'news_list': news_list
    })

# НОВАЯ Функция для открытия полной новости
def news_detail(request, news_id):
    news_item = get_object_or_404(NewsItem, id=news_id)
    return render(request, 'news_detail.html', {'news': news_item})