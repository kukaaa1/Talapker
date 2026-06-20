from django.db import models

class NewsItem(models.Model):
    title = models.CharField(max_length=255, verbose_name="Заголовок новости")
    content = models.TextField(verbose_name="Текст новости")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата публикации")
    image = models.ImageField(upload_to='news_images/', null=True, blank=True, verbose_name="Изображение")

    def __str__(self):
        return self.title