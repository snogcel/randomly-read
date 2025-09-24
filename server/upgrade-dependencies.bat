@echo off
echo 🚀 Starting Server Dependencies Upgrade...
echo.

echo ⚠️  WARNING: This will update major dependencies with breaking changes!
echo Make sure you have committed your current code before proceeding.
echo.
set /p confirm="Continue with upgrade? (y/N): "
if /i not "%confirm%"=="y" (
    echo Upgrade cancelled.
    pause
    exit /b 0
)

echo.
echo 📦 Backing up current package.json...
copy package.json package.json.backup
if %errorlevel% neq 0 (
    echo ❌ Failed to backup package.json
    pause
    exit /b 1
)

echo 📝 Updating package.json...
copy package.json.new package.json
if %errorlevel% neq 0 (
    echo ❌ Failed to update package.json
    echo Restoring backup...
    copy package.json.backup package.json
    pause
    exit /b 1
)

echo 🧹 Cleaning node_modules...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo 📦 Installing updated dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    echo Restoring backup...
    copy package.json.backup package.json
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies upgraded successfully!
echo.
echo 🔧 Next steps:
echo 1. Review UPGRADE_GUIDE.md for breaking changes
echo 2. Update your code files:
echo    - Replace routes.js with routes.new.js
echo    - Replace config.js with config.new.js
echo 3. Test the application: npm run dev:js
echo 4. Run tests: npm test
echo.
echo 📋 Major changes:
echo - Apollo Server: 1.3.0 → 3.12.1 (BREAKING)
echo - Mongoose: 5.3.12 → 8.2.0 (BREAKING)
echo - GraphQL: 14.2.1 → 16.8.1 (BREAKING)
echo - Moment.js → Day.js (BREAKING)
echo - Faker → @faker-js/faker (BREAKING)
echo - Express: 4.16.4 → 4.19.2 (Security fixes)
echo.
pause