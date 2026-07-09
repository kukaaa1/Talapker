from django.db import models

class NewsItem(models.Model):
    title = models.CharField(max_length=255, verbose_name="Заголовок новости")
    content = models.TextField(verbose_name="Текст новости")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата публикации")
    image = models.ImageField(upload_to='news_images/', null=True, blank=True, verbose_name="Изображение")

    def __str__(self):
        return self.title

class SiteConfiguration(models.Model):
    title = models.CharField("Название конфигурации", max_length=100, default="Главная страница")
    
    university_logo_file = models.ImageField("Логотип: Загрузить файл", upload_to='logos/', null=True, blank=True)
    university_logo_url = models.URLField("Логотип: Ссылка", null=True, blank=True)

    video_file = models.FileField("Видео: Загрузить файл (MP4)", upload_to='videos/', null=True, blank=True)
    video_url = models.URLField("Видео: Или вставить ссылку", null=True, blank=True)

    # НОВЫЕ ПОЛЯ ДЛЯ СЛАЙДЕРА ФОТОГРАФИЙ
    photo_1 = models.ImageField("Фото кампуса 1", upload_to='campus/', null=True, blank=True)
    photo_2 = models.ImageField("Фото кампуса 2", upload_to='campus/', null=True, blank=True)
    photo_3 = models.ImageField("Фото кампуса 3", upload_to='campus/', null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Настройка сайта"
        verbose_name_plural = "Настройки сайта"

    def __str__(self):
        return self.title

class Sponsor(models.Model):
    name = models.CharField("Название компании", max_length=100)
    logo_file = models.ImageField("Логотип: Загрузить файл", upload_to='sponsors/', null=True, blank=True)
    logo_url = models.URLField("Логотип: Или вставить ссылку", null=True, blank=True)
    link = models.URLField("Ссылка на сайт партнера", null=True, blank=True, default="#")

    class Meta:
        verbose_name = "Партнер"
        verbose_name_plural = "Партнеры"

    def __str__(self):
        return self.name