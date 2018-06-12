from selenium import webdriver
from selenium.webdriver.common.keys import Keys
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
        def send_ability(val, element=top_box):
            element.clear()
            element.send_keys(val)
            return element.get_attribute('value')

        def warn_asserts(val, ch, ra):  # string, bool, bool
            send_ability(val)
            assert char_warn.is_displayed() == ch
            assert range_warn.is_displayed() == ra

        warn_asserts('12', False, False)
        warn_asserts('8a', True, False)
        warn_asserts('6', False, True)
        warn_asserts('19', False, True)
        warn_asserts('yz', True, True)

        # check that total points spent is accurately calculated
        total_points = self.browser.find_element_by_class_name('total-points')
        def total_assert(sent, result):
            send_ability(sent)
            res = total_points.get_attribute('innerHTML')
            assert res == result, sent+" shows total of "+res

        total_assert('10', '0')
        total_assert('12', '2')
        total_assert('7', '-4')
        total_assert('no', '⚠')

        send_ability('10')
        # check for elements for racial bonus with 0 for the initial value
        racial_mods = self.browser.find_elements_by_class_name('racial-mod')
        assert len(racial_mods) == 6, 'Not enough racial mod elements'

        # check that a selected race accurately assigns race modifiers
        def fetch_race_mod(ability):
            return self.browser.find_element_by_id(ability) \
            .find_element_by_class_name('racial-mod').get_attribute('innerHTML')
        def click_option(race):
            select_race = Select(self.browser.find_element_by_id('races'))
            select_race.select_by_visible_text(race)
            self.browser.find_element_by_id('races').send_keys(Keys.ENTER)
        click_option('Halfling')

        assert fetch_race_mod('Strength') == '-2'
        assert fetch_race_mod('Dexterity') == '+2'
        assert fetch_race_mod('Constitution') == '0'

        click_option('Elf')
        assert fetch_race_mod('Strength') == '0'
        assert fetch_race_mod('Constitution') == '-2'
        assert fetch_race_mod('Intelligence') == '+2'

        # select_race.select_by_visible_text('Human')
        click_option('Human')
        radio = racial_mods[0].find_element_by_xpath('../td[@class="radio-cell"]/input')
        radio.click()
        assert radio.is_selected(), \
            'clicked radio button is not selected'
        assert '+2' in fetch_race_mod('Strength'), 'selected doesn\'t show bonus'
        for cell in self.browser.find_elements_by_class_name('radio-cell'):
            assert '<input' in cell.get_attribute('innerHTML'), ' lacks an input option'
            assert 'radio' in cell.get_attribute('innerHTML'), ' lacks a radio button'
            assert 'name=bonus-choice', ' lacks a name for the radio button'

        def fetch_calculated_score(ability):
            return self.browser.find_element_by_id(ability) \
            .find_element_by_class_name('calculated').get_attribute('innerHTML')

        # check that racial bonuses are accurately applied to ability totals
        click_option('Halfling')
        for el in self.browser.find_elements_by_class_name('ability-box'):
            send_ability('10', el)
        assert fetch_calculated_score('Strength') == '8'
        assert fetch_calculated_score('Dexterity') == '12'
        assert fetch_calculated_score('Constitution') == '10'

        # check for accurate modifier calculations
        def fetch_ability_mod(ability):
            return self.browser.find_element_by_id(ability) \
            .find_element_by_class_name('ability-mod').get_attribute('innerHTML')
        assert fetch_ability_mod('Strength') == '-1'
        assert fetch_ability_mod('Dexterity') == '+1'
        assert fetch_ability_mod('Constitution') == '+0'
        # check for arrows that increase and decrease values
