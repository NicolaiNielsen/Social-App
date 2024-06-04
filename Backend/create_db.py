import sqlite3
import os

def create_database():
    # Ensure the instance directory exists
    os.makedirs('instance', exist_ok=True)

    db_path = os.path.join('instance', 'events.db')

    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    # Create organisations table
    c.execute('''
        CREATE TABLE IF NOT EXISTS organisations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            organisationname TEXT UNIQUE,
            description TEXT,
            admin TEXT,
            email TEXT,
            image_url TEXT
        )
    ''')
    # Create events table with a foreign key referencing organisations
    c.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            eventname TEXT NOT NULL,
            description TEXT NOT NULL,
            location TEXT NOT NULL,
            date TEXT NOT NULL,
            organisationname TEXT NOT NULL,
            image_url TEXT,
            hostid INTEGER,
            FOREIGN KEY (hostid) REFERENCES organisations (id),
            UNIQUE(eventname, date)  -- Ensure uniqueness of eventname and date combination
        )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_database()
