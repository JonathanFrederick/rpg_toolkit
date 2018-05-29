from selenium import webdriver

class TestClass:
    def setup_method(self):
        self.browser = webdriver.Firefox()
        self.browser.get('http://localhost:8000')

    def teardown_method(self):
        self.browser.close()

    def test_character_creation_title(self):
        assert 'Character Creation' in self.browser.title
