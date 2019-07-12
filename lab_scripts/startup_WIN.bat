@echo off
python C:\Users\uncle\HAVIC_XSS_2\lab_scripts\db_refresh_WIN.py
start cmd /k CALL C:\Users\uncle\HAVIC_XSS_2\lab_scripts\back_launch.bat
start cmd /k CALL C:\Users\uncle\HAVIC_XSS_2\lab_scripts\front_launch.bat