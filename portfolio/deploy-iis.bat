@echo off
REM IIS Deployment Script for Muhammad Waseem Portfolio
REM Run as Administrator

echo ============================================
echo IIS Deployment Package Creator
echo ============================================

set PROJECT_DIR=%~dp0
set BUILD_DIR=%PROJECT_DIR%dist
set PACKAGE_DIR=%PROJECT_DIR%iis-deploy
set ZIP_NAME=mw-portfolio-iis-%DATE:~-4,4%%DATE:~-10,2%%DATE:~-7,2%.zip

echo.
echo [1/5] Building production bundle...
cd /d "%PROJECT_DIR%"
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    exit /b 1
)

echo.
echo [2/5] Creating deployment package...
if exist "%PACKAGE_DIR%" rmdir /s /q "%PACKAGE_DIR%"
mkdir "%PACKAGE_DIR%"

echo Copying files...
xcopy "%BUILD_DIR%\*" "%PACKAGE_DIR%\" /E /I /Q /Y

echo.
echo [3/5] Verifying web.config...
if not exist "%PACKAGE_DIR%\web.config" (
    echo ERROR: web.config not found!
    exit /b 1
)

echo.
echo [4/5] Creating ZIP package...
powershell -Command "Compress-Archive -Path '%PACKAGE_DIR%\*' -DestinationPath '%PROJECT_DIR%\%ZIP_NAME%' -Force"

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create ZIP!
    exit /b 1
)

echo.
echo [5/5] Cleanup...
rmdir /s /q "%PACKAGE_DIR%"

echo.
echo ============================================
echo DEPLOYMENT PACKAGE CREATED SUCCESSFULLY!
echo ============================================
echo.
echo Package: %PROJECT_DIR%\%ZIP_NAME%
echo.
echo IIS DEPLOYMENT INSTRUCTIONS:
echo 1. Extract ZIP to your IIS site folder (e.g., C:\inetpub\wwwroot\portfolio)
echo 2. In IIS Manager, create a new Application or Website pointing to that folder
echo 3. Ensure Application Pool uses .NET CLR Version: No Managed Code
echo 4. Enable "Directory Browsing" = False
echo 5. Set Default Document to: index.html
echo 6. Install URL Rewrite Module 2.0+ on IIS server
echo 7. For HTTPS, bind SSL certificate in IIS Bindings
echo.
echo For contact form to work, configure SMTP in server.mjs or use Azure Functions / AWS Lambda
echo.
pause