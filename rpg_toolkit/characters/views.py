from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def home_page(request):
    context = {'abilities': ["STR", "DEX", "CON", "INT", "WIS", "CHA"]}
    return render(request, 'home.html', context=context)

def test_js(request):
    return render(request, 'tests.html')
