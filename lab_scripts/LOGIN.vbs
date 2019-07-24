set WshShell = WScript.CreateObject("Wscript.Shell")
call WshShell.Run("firefox.exe http://localhost/", 1, false)

Wscript.Sleep 4000
WshShell.SendKeys "{TAB}"
WScript.Sleep 2000
WshShell.SendKeys "Admin"
WScript.Sleep 2000
WshShell.SendKeys "{TAB}"
WScript.Sleep 2000
WshShell.SendKeys "@dmin5rul3Z"
WScript.Sleep 2000
WshShell.SendKeys "{ENTER}"
WScript.Sleep 2000
WshShell.SendKeys "{TAB}"
WScript.Sleep 2000
WshShell.SendKeys "{TAB}"
WScript.Sleep 2000
WshShell.SendKeys "{ENTER}"
WScript.Quit()