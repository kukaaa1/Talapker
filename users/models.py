from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    attempts_left = models.IntegerField(default=3, verbose_name="Оставшиеся попытки")

    def __str__(self):
        return f"Профиль: {self.user.username} (Попыток: {self.attempts_left})"