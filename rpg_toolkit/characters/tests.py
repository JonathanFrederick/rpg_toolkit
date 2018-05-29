from django.test import TestCase

class SmokeTest(TestCase):
    def test_for_smoke(self):
        self.assertEqual(2, 3)
