import sqlite3
import os

DATABASE = os.path.join('instance', 'events.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def insert_organisation(organisationname, description, admin, email, image_url):
    conn = get_db_connection()
    conn.execute('INSERT INTO organisations (organisationname, description, admin, email, image_url) VALUES (?, ?, ?, ?, ?)', 
                 (organisationname, description, admin, email, image_url))
    conn.commit()
    conn.close()

def insert_event(eventname, description, location, date, organisationname, image_url, hostid):
    conn = get_db_connection()
    conn.execute('INSERT INTO events (eventname, description, location, date, organisationname, image_url, hostid) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                 (eventname, description, location, date, organisationname, image_url, hostid))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    # Insert sample organisations
    insert_organisation('RUCbar - café & bar', 'Vi har vores egen webside hvor festudvalger og andre på RUC kan bestille bl.a. øl, drikkevarer og fadølsanlæg til deres egen fester/arrangementer', 'formand@rucbar.dk', 'formand@rucbar.dk', 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/310609728_503836681752088_4216734289577066089_n.png?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=z_6Z6oV9ymEQ7kNvgHOYU3v&_nc_ht=scontent-ams2-1.xx&oh=00_AYCLLauqi8HiiEIu0ASfpGjVSvUPWtMK5SqH_hkdsX1TSw&oe=666428BC')
    insert_organisation('StudyLab HumTek', 'Uddannelse', 'humtek-tutor@ruc.dk', 'humtek-tutor@ruc.dk', 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/294314589_442900681181210_878097960733862270_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=cJFGkOnZ2CAQ7kNvgEvvgSM&_nc_ht=scontent-ams2-1.xx&oh=00_AYCh_TAdSpn7uk-kIxdykS29NAGURzbS5LBXim8qbAdXHA&oe=66641B5A')
    insert_organisation('FabLab RUC', 'Videnskab, teknologi og ingeniørarbejde', 'fablab@ruc.dk', 'fablab@ruc.dk', 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/292503118_469857495141256_653078754997651956_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Zrhr7nmR4mwQ7kNvgG0EhG4&_nc_ht=scontent-ams2-1.xx&oh=00_AYDSGPGdG03LceJb6pVEl-1vGopc32i3ZztajrG8ELAMWg&oe=66644883')
