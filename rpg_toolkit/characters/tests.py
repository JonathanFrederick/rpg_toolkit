from django.test import TestCase

class SmokeTest(TestCase):
    def test_math(self):
        self.assertEqual(1+1, 2)
    def test_truthiness(self):
        self.assertTrue(True)


from django.urls import resolve
from characters.views import home_page

class HomePageTest(TestCase):
    def test_root_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func, home_page)
