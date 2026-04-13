@echo off
cd /d "%~dp0"
echo Stopping website server...

REM Find and stop processes using port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /F /PID %%a 2>nul
)

echo Stopping Node.js processes...
taskkill /F /IM node.exe 2>nul

echo Server stopped!
pause