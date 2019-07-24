@echo off
python C:\Users\uncle\HAVIC_XSS_2\lab_scripts\db_refresh_WIN.py
start cmd /k CALL C:\Users\uncle\HAVIC_XSS_2\lab_scripts\back_launch.bat
start cmd /k CALL C:\xampp\apache_start.bat
start C:\Users\uncle\HAVIC_XSS_2\lab_scripts\LOGIN.vbs
goto End
:End