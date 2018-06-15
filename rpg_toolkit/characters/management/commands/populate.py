import os
import re
import requests
from bs4 import BeautifulSoup as BS
from bs4.element import Tag, NavigableString
from django.core.management.base import BaseCommand

from characters.models import Race

class Command(BaseCommand):
    def handle(self, *args, **options):
        get_races()

r_not_main = re.compile("#|threads|License")

def only_main(href):
    return href and not r_not_main.search(href)

race_list_urls = [
    'http://paizo.com/pathfinderRPG/prd/advancedRaceGuide/coreRaces.html',
    'http://paizo.com/pathfinderRPG/prd/advancedRaceGuide/featuredRaces.html',
    'http://paizo.com/pathfinderRPG/prd/advancedRaceGuide/uncommonRaces.html'
    ]

def get_races():
    for list_url in race_list_urls:
        page = BS(requests.get(list_url).text, 'html.parser')
        for r in page.find('div',class_='body').find_all('a',href=only_main):
            new_race = Race()
            new_race.prd_url = 'http://paizo.com'+r.get('href')

            race_page = BS(requests.get(new_race.prd_url).text,
                'html.parser')
            traits = race_page.find('div',class_='body').contents
            for trait in list(traits):
                if type(trait) == Tag:
                    if trait.name == 'h1':
                        current_section = trait.get('id')
                        if 'racial-traits' in trait['id'] and not \
                            'alternate' in trait['id']:
                            new_race.race = re.sub(r' Racial Traits', r'', trait.text)

                        # if trait.id:
                        #     print(trait.id)
                        #     if 'racial-traits' in trait.id and not 'alternate' in trait.id:
                        #         new_race.race = re.sub(r'-racial-traits', r'', trait.id)
                        #         print(new_race.race)
                    if trait.b and '+' in trait.b.text:
                        new_race.ability_bonus = re.sub(r'–', r'-', trait.b.text)
            new_race.save()
