@echo off
echo 🚀 Setting up local development environment...
echo.

echo 📦 Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)

echo 🗄️ Setting up database...
call npm run seed
if %errorlevel% neq 0 (
    echo ❌ Failed to seed database
    echo Make sure MongoDB is running on localhost:27017
    pause
    exit /b 1
)

echo.
echo ✅ Local development setup complete!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running (mongod)
echo 2. Start the server: cd server && npm run dev:js
echo 3. Start the client: cd client && npm start
echo.
echo Sample login credentials:
echo - Username: testuser, Password: password123
echo - Username: admin, Password: admin123 (admin user)
echo.
pause