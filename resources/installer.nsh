!macro customUnInstall
MessageBox MB_YESNO "Do you want to participate in our uninstall survey?" IDYES true IDNO next
true:
  ExecShell "open" "https://www.tagspaces.org/uninstallsurvey/"
  Goto next
next:
!macroend
