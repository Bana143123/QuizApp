from flask import Flask, request, jsonify
import sqlite3
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
def connect_db():
    db_path = os.path.abspath('instance/users.db')
    print(f"Database path: {db_path}")
    return sqlite3.connect(db_path)

@app.route('/')
def index():
    return "Welcome to the Quiz App Backend!"


@app.route('/update', methods=['PUT'])
def update_user():
    data = request.get_json()
    username = data.get('username')
    new_password = data.get('new_password')
    
    conn = connect_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute('UPDATE users SET password = ? WHERE username = ?', (new_password, username))
        if cursor.rowcount == 0:
            return jsonify({"message": "User not found"}), 404
        conn.commit()
        conn.close()
        return jsonify({"message": "Password updated successfully"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"message": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    # data = {"username" : "Narendra",
            # "password" : "1234"}
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')
    
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(data)
        username = data.get('username')
        password = data.get('password')
        
        conn = connect_db()
        cursor = conn.cursor()

        # Check if the username already exists
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"message": "Username already exists"}), 409

        cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        conn.close()
        
        return jsonify({"message": "Registration successful"}), 201

    except Exception as e:
        return jsonify({"message": f"Registration failed: {str(e)}"}), 500

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == "__main__":
    app.run(debug=True, port=8081)
