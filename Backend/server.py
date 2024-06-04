from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)
app.config['DATABASE'] = os.path.join(os.path.dirname(__file__), 'instance', 'events.db')

def get_db_connection():
    conn = sqlite3.connect(app.config['DATABASE'])
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/organisations', methods=['GET'])
def get_organisations():
    conn = get_db_connection()
    organisations = conn.execute('SELECT * FROM organisations').fetchall()
    conn.close()
    return jsonify([dict(org) for org in organisations])

@app.route('/organisations/<int:id>/events', methods=['GET'])
def get_events_for_organisation(id):
    conn = get_db_connection()
    events = conn.execute('''
        SELECT events.id, events.eventname, events.description, events.location, events.date, events.organisationname, events.image_url
        FROM events
        WHERE events.hostid = ?
    ''', (id,)).fetchall()
    conn.close()
    return jsonify([dict(event) for event in events])

@app.route('/events', methods=['GET'])
def get_events():
    conn = get_db_connection()
    events = conn.execute('''
        SELECT events.id, events.eventname, events.description, events.location, events.date, organisations.organisationname
        FROM events
        JOIN organisations ON events.hostid = organisations.id
    ''').fetchall()
    conn.close()
    return jsonify([dict(event) for event in events])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
