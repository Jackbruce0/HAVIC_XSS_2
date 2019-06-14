#!/usr/bin/python3
import flask

app = flask.Flask("__main__")

@app.route("/")
def my_index():
    return flask.render_template("index.html",token="Hello from Flask!") 

app.run(debug=True, host='0.0.0.0')
