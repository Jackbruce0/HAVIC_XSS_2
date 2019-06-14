#!/usr/bin/python3
import flask
from flask_sqlalchemy import SQLAlchemy

app = flask.Flask(__name__)

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/unclesam/webapp_react/flask_back/db/todo.db'

db = SQLAlchemy(app)
# Example for creating a db of User's and their todo tasks
class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(50))
    complete = db.Column(db.Boolean)
    user_id = db.Column(db.Integer)

@app.route('/user', methods=['GET'])
def get_all_users():
    return ''

@app.route('/user/<user_id>', methods=['PUT'])
def promote_user():
    return ''

@app.route('/user/<user_id>', methods=['PUT'])
def promote_user():
    return ''

@app.route('/user/<user_id>', methods=['DELETE'])
def delete_user();
    rerurn ''

@app.route("/")
def my_index():
    return flask.render_template("index.html",token="Hello from Flask!") 

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
