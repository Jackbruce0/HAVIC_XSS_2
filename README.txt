GOVERNMENT SECRETS DB - CTF EXTRAVAGANZA

The goal of this lab is for attackers to inject malcicous js code
to steal the jwt of the currently logged in Admin. They will store
this token in thier personal local storage AND REFRESH THE PAGE ,
to be authenticated as an Admin.

//More TBA

Players will be given login credentials to a non-Admin user.
They will only be allowed to view their own coments for security
reasons.

OPERATING INSTRUCTIONS:
"startup.sh" will clear comments db to default values and launch back end
and front end services simultaneosly.

"db_refresh.py" will just clear comments db to default values

"labscripts/attack1.js" contains example js for XSS attack
	+ Attacker must have HTTP server running to recieve the fruits of this attack
	
