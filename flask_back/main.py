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
import os
import time
from threading import Thread, Event
app = flask.Flask(__name__)

app.config['SECRET_KEY'] = 'thisissecret'
linux_db_uri = r'sqlite:////home/unclesam/HAVIC_XSS_2/flask_back/db/users_comments.db'
windows_db_uri = 'sqlite:///C:\\Users\\uncle\\HAVIC_XSS_2\\flask_back\\db\\users_comments.db'
app.config['SQLALCHEMY_DATABASE_URI'] = windows_db_uri
app.jinja_env.autoescape = False #Enable XSS

db = SQLAlchemy(app)
CORS(app)

#for db resetting
comment_check = None

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

#Why are we using this instead of jwt_required method
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 403
        
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

    #Do not create user if name already taken
    user = User.query.filter_by(name = data['name']).first()
    if user:
        return jsonify({'message': 'Registration failed. User was not created!'})

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

@app.route('/usercomments', methods=['GET'])
@token_required
def get_user_comments(current_user):
    comments = Comment.query.all()
    approved_users = ['jack', 'jacks friend', current_user.name]
    output = []

    for comment in comments:
        comment_data = {}
        if comment.username in approved_users:
            comment_data['username'] = comment.username
            comment_data['text'] = comment.text
            output.append(comment_data)
        
    return jsonify({'comments' : output})
    
@app.route('/usercomments_delete', methods=['GET'])
@token_required
def delete_user_comments(current_user):
    comments = Comment.query.filter_by(username=current_user.name)
    print(comments)
    for comment in comments:
        db.session.delete(comment)

    db.session.commit()

    os.system('C:\\Users\\uncle\\HAVIC_XSS_2\\lab_scripts\\go_to_comments.vbs') 
    return jsonify({'message' : 'comments successfully deleted'})
    
#End of Comment end points
@app.route('/syscall', methods=['POST'])
@token_required
def run_command(current_user):
    if not current_user.admin:
        return jsonify({'message' : 'You\'re not Admin! Get outta here!'})

    data = request.json

    os.system(data['command'])

    return jsonify({'message' : 'Command submitted!'})


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
        #THIS TOKEN BASICALLY LASTS FOR EVER (CHANGE TO PREVENT
        #FLAG SHARING)
        token = jwt.encode({'public_id' : user.public_id, 'exp' :
            datetime.datetime.utcnow() + datetime.timedelta(weeks = 9999)},
            app.config['SECRET_KEY'])
        print("user authenticated")
        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 
        'Basic realm="Login required!"'})

@app.route('/secret', methods=['GET'])
@token_required
def get_flag(current_user):
    #allow only admins to this endpoint
    if not current_user.admin:
        return jsonify({'message' : 'You\'re not Admin! Get outta here!'}), 403


    return jsonify({'message' : 'FLAG 1 = HAVIC-JCDF-8320'}) 

@app.route('/commentCheck', methods=['GET'])
def comment_timer_update():
    global comment_check
    if comment_check is None:
        comment_check = Thread(target=comment_timeout_check)
        print("hi")

    #update timer
    return jsonify({'message' : 'Nice one man'})

def comment_timeout_check():
    while True:
        
        print("hi")
       # if exp_time is not None and datetime.now() > exp_time:
       #     initialize_comments_db()
       #     exp_time = None
       #     #stop thread
       #     break
        time.sleep(1)


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
                return jsonify({'token' : token.decode('UTF-8')})
            else:
                error = "Login failed"

    return flask.render_template('index.html', error=error, posts=posts) 

def initialize_comments_db():
    #delete all comments
    comments = Comment.query.all()
    for comment in comments:
        db.session.delete(comment)
    db.session.commit()

    #initialize with default comments
    new_comment = Comment(text='This place is okey, these secrets really aint what they used to be', username='jack')
    db.session.add(new_comment)
    new_comment = Comment(text='I LOVE this site! So many secrets, not enough time', username='jacks friend')
    db.session.add(new_comment)
    db.session.commit()

    print("comments db refreshed")

def initialize_user_db():
    hashed_password = generate_password_hash("@dmin5rul3Z", method='sha256')
    new_user = User(public_id=str(uuid.uuid4()), name="Admin", 
            password=hashed_password, admin=True)
    db.session.add(new_user)
    db.session.commit()

if __name__ == '__main__':
    users = User.query.all()
    if not users:
        initialize_user_db()
    app.run(debug=True, host='0.0.0.0')