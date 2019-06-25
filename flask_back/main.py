#!/usr/bin/python3
import flask
from flask import Flask, request, jsonify, make_response 
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from flask_cors import CORS
app = flask.Flask(__name__)

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/unclesam/HAVIC_XSS_2/flask_back/db/users_comments.db'
app.jinja_env.autoescape = False #Enable XSS

db = SQLAlchemy(app)
CORS(app)
# Example for creating a db of User's and their todo tasks
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1000))
    username = db.Column(db.String(80))

#class Todo(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    text = db.Column(db.String(50))
#    complete = db.Column(db.Boolean)
#    user_id = db.Column(db.Integer)

#Why are we using this instead of jwt_required method
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401
        
        #'current_user' must be first param in every method implementing 
        #'token_required'
        return f(current_user, *args, **kwargs)

    return decorated

# User endpoints
@app.route('/users', methods=['GET'])
def get_all_users():
    
    #if not current_user.admin:
    #    return jsonify({'message' : 'Cannot perform that function!'})

    users = User.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['name'] = user.name
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        output.append(user_data)

    return jsonify({'users' : output})

@app.route('/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):

    user = User.query.filter_by(public_id=public_id).first()
    
    if not user:
        return jsonify({'message' : 'No user found!'})
    
    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['name'] = user.name
    user_data['password'] = user.password
    user_data['admin'] = user.admin

    return jsonify({'user' : user_data}) 

@app.route('/user', methods=['POST'])
#@token_required
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(public_id=str(uuid.uuid4()), name=data['name'], 
            password=hashed_password, admin=False)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'New user created!'})

@app.route('/user/<public_id>', methods=['PUT'])
#@token_required
def promote_user(public_id):
    
    user = User.query.filter_by(public_id=public_id).first()
    
    if not user:
        return jsonify({'message' : 'No user found!'})
 
    user.admin = True
    db.session.commit()
    

    return jsonify({'message' : 'The user has been promoted!'})

@app.route('/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    
    user = User.query.filter_by(public_id=public_id).first()
    
    if not user:
        return jsonify({'message' : 'No user found!'})
 
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'message' : 'The user has been deleted!'})

#End of User endpoints

# Comment end points
@app.route('/comment', methods=['POST'])
def post_comment():
    data = request.get_json()
    new_comment = Comment(text=data['text'], username=data['username'])
    db.session.add(new_comment)
    db.session.commit()

    return jsonify({'message' : 'Comment submitted!'})

@app.route('/comments', methods=['GET'])
def get_all_comments():
    comments = Comment.query.all()

    output = []

    for comment in comments:
        comment_data = {}
        comment_data['username'] = comment.username
        comment_data['text'] = comment.text
        output.append(comment_data)
        
    return jsonify({'comments' : output})

#End of Comment end points

@app.route('/login', methods=['POST'])
def login():
    auth = request.json

    if not auth or not auth['name'] or not auth['password']:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 
            'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth['name']).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 
            'Basic realm="Login required!"'})
    pass_hash = generate_password_hash('123456', method='sha256')
    if check_password_hash(user.password, auth['password']):
        token = jwt.encode({'public_id' : user.public_id, 'exp' :
            datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            app.config['SECRET_KEY'])
        print("user authenticated")
        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 
        'Basic realm="Login required!"'})

@app.route('/secrets')
#@token_required
def secrets():
    #allow only admins to this endpoint
    return flask.render_template('secrets.html')

@app.route('/', methods=['GET', 'POST'])
def my_index():
    posts = []
    error = None
    
    if request.method == 'POST':
        if request.form['submit_button'] == 'Login':
            user = User.query.filter_by(name=request.form['username']).first()

            if not user:
                error = "Login failed"
    
            if check_password_hash(user.password, request.form['password']):
                token = jwt.encode({'public_id' : user.public_id, 'exp' :
                    datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
                    app.config['SECRET_KEY'])
                #instead of returning json. input jwt into header
                return jsonify({'token' : token.decode('UTF-8')})
            else:
                error = "Login failed"

    return flask.render_template('index.html', error=error, posts=posts) 

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
