@echo off
cd /d "%~dp0"
echo Syncing images...

REM Create directories if they don't exist
if not exist "public\assets\images\works" mkdir "public\assets\images\works"
if not exist "public\assets\images\members" mkdir "public\assets\images\members"
if not exist "public\assets\images\posters" mkdir "public\assets\images\posters"

REM Clear old files
ECHO Clearing old images...
del /F /Q "public\assets\images\works\*" 2>nul
del /F /Q "public\assets\images\members\*" 2>nul
del /F /Q "public\assets\images\posters\*" 2>nul

REM Copy new files
ECHO Copying new images...
copy /Y "assets\images\works\*" "public\assets\images\works\" > nul
copy /Y "assets\images\members\*" "public\assets\images\members\" > nul
copy /Y "assets\images\posters\*" "public\assets\images\posters\" > nul

ECHO Building project...
E:\node\npx vite build
ECHO Build completed!
pause