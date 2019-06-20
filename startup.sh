#!/bin/bash

#This script will startup backend server (flask) and front
#end server (react)

#start react
cd ~/HAVIC_XSS_2/react_front/
yarn start &

#start flask
~/HAVIC_XSS_2/flask_back/main.py


