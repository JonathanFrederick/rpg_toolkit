from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from characters.models import Race

def home_page(request):
    context = {'abilities': ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
               'races': Race.objects.all()}
    return render(request, 'home.html', context=context)

def test_js(request):
    context = {'abilities': ['ability1', 'ability2', 'ability3'],
                'races': [
                    {'race': 'Kobold',
                     'ability_bonus': '+2 Dexterity, –4 Strength, –2 Constitution'},
                    {'race': 'Human',
                     'ability_bonus': '+2 to One Ability Score'}
                    ]}
    return render(request, 'tests.html', context=context)
