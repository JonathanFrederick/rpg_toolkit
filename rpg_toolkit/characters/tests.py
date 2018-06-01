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

class HomePageTest(TestCase):
    def test_root_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func, home_page)

    def test_home_page_returns_correct_html(self):
        request = HttpRequest()
        response = home_page(request)
        expected_html = render_to_string('home.html')
        self.assertEqual(response.content.decode(), expected_html)


class TestPageTest(TestCase):
    def test_tests_resolves_to_test_page_view(self):
        found = resolve('/tests')
        self.assertEqual(found.func, test_js)

    def test_test_page_returns_correct_html(self):
        request = HttpRequest()
        response = test_js(request)
        expected_html = render_to_string('tests.html')
        self.assertEqual(response.content.decode(), expected_html)
