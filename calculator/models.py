from django.db import models

class Specialty(models.Model):
    code = models.CharField(max_length=20, unique=True, verbose_name="Шифр специальности")
    name = models.CharField(max_length=255, verbose_name="Название специальности")
    min_score = models.IntegerField(verbose_name="Минимальный проходной балл")
    allocated_grants = models.IntegerField(default=0, verbose_name="Количество выделенных грантов")

    def __str__(self):
        return f"{self.code} - {self.name}"