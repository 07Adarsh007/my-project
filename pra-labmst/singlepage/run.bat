@echo off
echo ===========================================
echo    React Authentication App - Quick Start
echo ===========================================
echo.

cd /d "%~dp0"

echo Step 1: Installing dependencies...
echo.
npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo Step 2: Starting development server...
echo.
echo ===========================================
echo    Server will start at: http://localhost:5173
echo ===========================================
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause