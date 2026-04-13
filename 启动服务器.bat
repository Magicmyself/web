@echo off
cd /d "%~dp0"
echo ========================================
echo   MiKun Vision 摄影工作室网站
echo ========================================
echo.
echo 正在启动服务器...
echo.
E:\node\node server.mjs
echo.
echo 服务器已启动！
echo 访问地址: http://localhost:3000
echo.
echo 按任意键停止服务器...
pause > nul
taskkill /F /IM node.exe > nul 2>&1
echo 服务器已停止
pause