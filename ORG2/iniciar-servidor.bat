@echo off
setlocal

cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel% equ 0 (
  start "" http://127.0.0.1:5502/index.html
  py -m http.server 5502 --bind 127.0.0.1
  exit /b
)

where python >nul 2>nul
if %errorlevel% equ 0 (
  start "" http://127.0.0.1:5502/index.html
  python -m http.server 5502 --bind 127.0.0.1
  exit /b
)

echo No se encontro Python instalado.
echo Instala Python o abre el proyecto con la extension Live Server de VS Code.
pause
