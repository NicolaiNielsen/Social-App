import os
import sqlite3
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import json
import time

# Facebook URLs to scrape events from
FACEBOOK_URLS = [
    ('https://www.facebook.com/fablabruc/events', '3'),
    ('https://www.facebook.com/StudyLabHumTek/events', '2'),
    ('https://www.facebook.com/RUCbarOfficial/events', '1'),
]


# Path to the SQLite database
DATABASE = os.path.join('instance', 'events.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def scrape_facebook_events():
    # Path to your cookies JSON file
    cookie_file_path = 'C:/Users/Nicol/ReactNative/App/Backend/cookies.json'

    # Initialize the WebDriver (ensure chromedriver is in PATH or provide the executable_path)
    options = Options()
    options.add_argument('--start-maximized')  # Optional: open browser in maximized mode
    driver = webdriver.Chrome(options=options)

    # Open Facebook and load cookies
    driver.get('https://www.facebook.com')

    # Load cookies from the JSON file
    with open(cookie_file_path, 'r') as cookie_file:
        cookies = json.load(cookie_file)
        for cookie in cookies:
            if "sameSite" in cookie:
                if cookie["sameSite"] not in ["Strict", "Lax", "None"]:
                    cookie["sameSite"] = "Lax"  # Set a default value or remove the attribute
            try:
                driver.add_cookie(cookie)
            except Exception as e:
                print(f"Error adding cookie: {e}")

    # Refresh the page to apply cookies
    driver.refresh()

    events_data = []

    for url, hostid in FACEBOOK_URLS:
    # You can now use both `url` and `hostname` in the loop
        driver.get(url)
        time.sleep(5)  # Wait for the page to load

        # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        events = soup.find_all('div', class_='x6s0dn4 x1lq5wgf xgqcy7u x30kzoy x9jhf4c x1olyfxc x9f619 x78zum5 x1e56ztr xyamay9 x1pi30zi x1l90r2v x1swvt13 x1gefphp')

        for event in events:
            try:
                # Extract event details
                event_name_tag = event.find('span', class_='')
                event_name = event_name_tag.text.strip() if event_name_tag else 'No event name found'

                # Extract image URL
                img_tag = event.find('img')
                img_url = img_tag['src'] if img_tag else 'No image found'

                # Extract time
                event_time_tag = event.find('span', class_='x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84')
                event_time = event_time_tag.text.strip() if event_time_tag else 'No time found'

                # Extract host
                host_tag = event.find('a', class_="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1sur9pj xkrqix3 xi81zsa x1s688f")
                event_host = host_tag.text.strip() if host_tag else 'No host found'

                # Extract location
                event_location_div = event.find('div', class_='x1gslohp')
                event_location_text = event_location_div.text.strip() if event_location_div else 'No location found'
                if "Begivenhed fra" in event_location_text:
                    event_location_text = event_location_text.split("Begivenhed fra")[0].strip()
                    event_location_text = event_location_text.split('.')[0].strip()

                events_data.append({
                    'eventname': event_name,
                    'date': event_time,
                    'description': '',
                    'location': event_location_text,
                    'image_url': img_url,
                    'organisationname': event_host,
                    'hostid': hostid
                })
            except Exception as e:
                print(f"Error parsing event: {e}")
                continue

    driver.quit()
    return events_data

def save_events_to_db(events_data):
    conn = get_db_connection()
    for event in events_data:
        # Check if the event already exists
        existing_event = conn.execute('SELECT * FROM events WHERE eventname = ? AND date = ?',
                                      (event['eventname'], event['date'])).fetchone()
        if existing_event is None:
            conn.execute('INSERT INTO events (eventname, description, location, date, organisationname, image_url, hostid) VALUES (?, ?, ?, ?, ?, ?, ?)',
                         (event['eventname'], event['description'], event['location'], event['date'], event['organisationname'], event['image_url'], event['hostid']))
            print(f"Added new event: {event['eventname']} on {event['date']}")
        else:
            print(f"Event already exists: {event['eventname']} on {event['date']}")
    conn.commit()
    conn.close()

if __name__ == '__main__':
    events_data = scrape_facebook_events()
    print(events_data)
    save_events_to_db(events_data)