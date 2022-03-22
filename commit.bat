@echo off
set /p message=
git add -A
git commit -m "%message%"
git push -f
pause