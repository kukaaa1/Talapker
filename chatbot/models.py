from django.db import models

class KnowledgeDocument(models.Model):
    category = models.CharField(max_length=100, verbose_name="Категория (например: Общежитие, Гранты)")
    content = models.TextField(verbose_name="Текст документа для ИИ")

    def __str__(self):
        return self.category