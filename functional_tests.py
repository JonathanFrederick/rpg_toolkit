from selenium import webdriver

class TestAbilityScoreFunctionality:
    def setup_method(self):
        self.browser = webdriver.Firefox()
        self.browser.get('http://localhost:8000')

    def teardown_method(self):
        self.browser.close()

    def test_character_ability_score_view(self):
        # check title and header for accurate text
        assert 'Character Creation' in self.browser.title
        header_text = self.browser.find_element_by_tag_name('h1').text
        assert 'Character Creation' in header_text

        # check for 6 input boxes with 10 for the initial value
        input_ability_boxes = self.browser.find_elements_by_class_name('ability-box')
        top_box = input_ability_boxes[0]
        assert len(input_ability_boxes) is 6, 'Not enough ability score inputs'
        assert top_box.tag_name == 'input'
        assert top_box.get_attribute('value') == '10'

        # check that total points spent is accurately calculated
        total_points = self.browser.find_element_by_class_name('total-points')
        assert total_points.get_attribute('innerHTML') == '0'

        # check for input boxes for racial bonus with 0 for the initial value

        # check that racial bonuses are accurately applied to ability totals

        # check for accurate modifier calculations

        # check for arrows that increase and decrease values
