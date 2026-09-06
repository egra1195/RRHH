@echo off
REM Arranque de la aplicacion de RRHH bajo IIS (httpPlatform).
REM Se reutiliza el runtime de Node que ya trae el SAR: no se instala nada nuevo
REM en el servidor, igual que hace Ficha_Medicos.

set NODE_EXE=C:\inetpub\wwwroot\SAR\modern\runtime\node.exe

if not exist "%NODE_EXE%" (
    echo ERROR: no se encuentra Node en %NODE_EXE%
    exit /b 1
)

"%NODE_EXE%" "C:\inetpub\wwwroot\RRHH\server.mjs"
