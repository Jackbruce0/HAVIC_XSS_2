set WshShell = WScript.CreateObject("Wscript.Shell")
call WshShell.Run("firefox.exe http://localhost/comments", 1, false)