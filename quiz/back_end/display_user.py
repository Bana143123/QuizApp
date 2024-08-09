import sqlite3
import os
from prettytable import PrettyTable

def connect_db():
    db_path = os.path.abspath('instance/users.db')
    return sqlite3.connect(db_path)

def fetch_users():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users')
    rows = cursor.fetchall()
    conn.close()
    return rows

def display_users():
    users = fetch_users()
    
    # Create a PrettyTable object
    table = PrettyTable()
    table.field_names = ["ID", "Username", "Password"]  # Define column headers
    
    # Add rows to the table
    for user in users:
        table.add_row(user)
    
    print(table)

if __name__ == "__main__":
    display_users()
