from selenium import webdriver
from time import sleep

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
        ability_list_items = self.browser.find_elements_by_class_name('ability')
        top_item = ability_list_items[0]
        top_box = top_item.find_element_by_class_name('ability-box')
        char_warn = top_item.find_element_by_class_name('char-warn')
        range_warn = top_item.find_element_by_class_name('range-warn')
        assert len(ability_list_items) is 6, 'Not enough ability score inputs'
        assert top_box.tag_name == 'input'
        assert top_box.get_attribute('value') == '10'

        # check for warnings for different inputs
        def send_ability(val):
            top_box.clear()
            top_box.send_keys(val)
            return top_box.get_attribute('value')
        send_ability('12')
        assert not char_warn.is_displayed()
        assert not range_warn.is_displayed()
        send_ability('8a')
        assert char_warn.is_displayed()
        assert not range_warn.is_displayed()
        send_ability('6')
        assert not char_warn.is_displayed()
        assert range_warn.is_displayed()
        send_ability('19')
        assert not char_warn.is_displayed()
        assert range_warn.is_displayed()
        send_ability('yz')
        assert char_warn.is_displayed()
        assert range_warn.is_displayed()




        # check that total points spent is accurately calculated
        total_points = self.browser.find_element_by_class_name('total-points')
        assert total_points.get_attribute('innerHTML') == '0'

        # check for input boxes for racial bonus with 0 for the initial value

        # check that racial bonuses are accurately applied to ability totals

        # check for accurate modifier calculations

        # check for arrows that increase and decrease values
