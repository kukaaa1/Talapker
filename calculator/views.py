from django.shortcuts import render

def home(request):
    # Эта функция просто берет твой index.html из папки templates и показывает его
    return render(request, 'index.html')