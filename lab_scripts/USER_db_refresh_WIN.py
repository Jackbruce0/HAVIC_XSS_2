import sqlite3

#This script initializes 'comment' and 'user' table of user_comments.db
#ADMIN USER DISSAPPEARS AFTER THIS IS RUN
#Admin will only return if flask is restarted as well

with sqlite3.connect("C:\\Users\\uncle\\HAVIC_XSS_2\\flask_back\\db\\users_comments.db") as connection:
    c = connection.cursor()
    
    c.execute('DELETE FROM user')
