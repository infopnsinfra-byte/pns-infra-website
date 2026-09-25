@echo off
cd /d "%~dp0"
echo.
echo P&S Infra website is starting at http://localhost:8080
start "P&S Infra" http://localhost:8080
python -m http.server 8080
pause
