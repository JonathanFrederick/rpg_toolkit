from django.test import TestCase

class SmokeTest(TestCase):
    def test_math(self):
        self.assertEqual(1+1, 2)
    def test_truthiness(self):
        self.assertTrue(True)


from django.urls import resolve
from django.http import HttpRequest
from characters.views import home_page, test_js
from django.template.loader import render_to_string
from characters.models import Race

class HomePageTest(TestCase):
    def test_root_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func, home_page)

    def test_home_page_returns_correct_html(self):
        request = HttpRequest()
        response = home_page(request)
        context = {'abilities': ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
                    'races': Race.objects.all()}
        expected_html = render_to_string('home.html', context=context)
        self.assertEqual(response.content.decode(), expected_html)


class TestPageTest(TestCase):
    def test_tests_resolves_to_test_page_view(self):
        found = resolve('/tests')
        self.assertEqual(found.func, test_js)

    def test_test_page_returns_correct_html(self):
        request = HttpRequest()
        response = test_js(request)
        context = {'abilities': ['ability', 'bbility', 'cbility'],
            'races': [
                {'race': 'some_race',
                 'ability_bonus': '+2 ability, –2 bbility'},
                {'race': 'picky_race',
                 'ability_bonus': '+2 to One Ability Score'}
                ]}
        expected_html = render_to_string('tests.html', context)
        self.assertEqual(response.content.decode(), expected_html)

from characters.models import Race

class RaceModelTest(TestCase):
    def test_saving_and_retrieving_races(self):
        race1, race2 = Race(), Race()
        race1.race, race2.race = "Dwarf", "Elf"
        race1.save()
        race2.save()
        saved_races = Race.objects.all()
        self.assertEqual(saved_races[0].race, "Dwarf")
        self.assertEqual(saved_races[1].race, "Elf")

    def test_assigning_ability_bonuses(self):
        gnome = Race()
        gnome.race = 'gnome'
        gnome.ability_bonus = '+2 Constitution, +2 Charisma, –2 Strength'
        gnome.save()
        self.assertEqual(Race.objects.all()[0].ability_bonus,
            '+2 Constitution, +2 Charisma, –2 Strength')
