from selenium import webdriver

class TestClass:
    def setup_method(self):
        self.browser = webdriver.Firefox()
        self.browser.get('http://localhost:8000')

    def teardown_method(self):
        self.browser.close()

    def test_django_title(self):
        assert 'Django' in self.browser.title
