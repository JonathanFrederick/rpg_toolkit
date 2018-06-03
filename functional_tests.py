from selenium import webdriver
from selenium.webdriver.support.ui import Select
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
        send_ability('10')
        total_points = self.browser.find_element_by_class_name('total-points')
        assert total_points.get_attribute('innerHTML') == '0'
        send_ability('12')
        assert total_points.get_attribute('innerHTML') == '2'
        send_ability('7')
        assert total_points.get_attribute('innerHTML') == '-4'
        send_ability('no')
        assert total_points.get_attribute('innerHTML') == '⚠'

        # check for elements for racial bonus with 0 for the initial value
        racial_mods = self.browser.find_elements_by_class_name('racial-mod')
        assert len(racial_mods) == 6, 'Not enough racial mod elements'

        # check that a selected race accurately assigns race modifiers
        def fetch_race_mod(ability):
            return self.browser.find_element_by_id(ability) \
            .find_element_by_class_name('racial-mod').get_attribute('innerHTML')
        select_race = Select(self.browser.find_element_by_id('races'))
        select_race.select_by_visible_text('Halfling')
        assert fetch_race_mod('STR') == '-2'
        assert fetch_race_mod('DEX') == '+2'
        assert fetch_race_mod('CON') == '0'

        select_race.select_by_visible_text('Elf')
        assert fetch_race_mod('STR') == '0'
        assert fetch_race_mod('CON') == '-2'
        assert fetch_race_mod('INT') == '+2'

        select_race.select_by_visible_text('Human')
        racial_mods[0].find_element_by_tag_name('input').click()
        assert racial_mods[0].find_element_by_tag_name('input').is_selected(), \
            'clicked radio button is not selected'
        assert '+2' in fetch_race_mod('STR'), 'selected doesn\'t show bonus'

        for mod in ('STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'):
            human_mod = fetch_race_mod(mod)
            assert '<input' in human_mod, mod+' lacks an input option'
            assert 'radio' in human_mod, mod+' lacks a radio button'
            assert 'name=pick-bonus', mod+' lacks a name for the radio button'




        # check that racial bonuses are accurately applied to ability totals

        # check for accurate modifier calculations

        # check for arrows that increase and decrease values
