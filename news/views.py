from django.shortcuts import render
from news.models import SiteConfiguration, Sponsor, NewsItem

def home(request):
    # Достаем настройки, спонсоров и 3 последние новости
    config = SiteConfiguration.objects.order_by('-updated_at').first()
    sponsors = Sponsor.objects.all()
    news_list = NewsItem.objects.order_by('-created_at')[:3]
    
    return render(request, 'index.html', {
        'config': config,
        'sponsors': sponsors,
        'news_list': news_list
    })