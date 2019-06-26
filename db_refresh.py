#!/usr/bin/python3
import sqlite3

#This script initials 'comment' table of user_comments.db
#to 2 defualt comments

with sqlite3.connect("flask_back/db/users_comments.db") as connection:
    c = connection.cursor()
    c.execute('DELETE FROM comment')
    c.execute('INSERT INTO comment ("text", "username") VALUES("This place is okay, these secrets really aint what they used to be", "jack")')
    c.execute('INSERT INTO comment ("text", "username") VALUES("I LOVE this site! So many secrets, not enough time", "jacks friend")')
