@echo off
title DiaPredict - Start All Services

echo =============================================
echo    DiaPredict - Early Diabetes Detection
echo =============================================
echo.

REM Start Flask ML Service
echo [1/3] Starting ML Service (Flask - port 5001)...
start "Flask ML Service" cmd /k "cd /d %~dp0ml-service && python app.py"

timeout /t 2 /nobreak >nul

REM Start Express Backend
echo [2/3] Starting Backend (Express - port 5000)...
start "Express Backend" cmd /k "cd /d %~dp0server && npm start"

timeout /t 2 /nobreak >nul

REM Start React Frontend
echo [3/3] Starting Frontend (React - port 3000)...
start "React Frontend" cmd /k "cd /d %~dp0client && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo All services started!
echo.
echo   Frontend  : http://localhost:3000
echo   Backend   : http://localhost:5000
echo   ML Service: http://localhost:5001
echo.
echo Opening browser...
start "" "http://localhost:3000"

pause
