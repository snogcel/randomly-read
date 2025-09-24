@echo off
echo 🔧 Manual Dependency Installation Workaround
echo.
echo This will create a minimal node_modules structure manually
echo.

mkdir node_modules 2>nul

echo 📦 Creating basic package structure...
mkdir node_modules\express 2>nul
mkdir node_modules\mongoose 2>nul
mkdir node_modules\apollo-server-express 2>nul
mkdir node_modules\bcryptjs 2>nul
mkdir node_modules\jsonwebtoken 2>nul
mkdir node_modules\cors 2>nul
mkdir node_modules\body-parser 2>nul
mkdir node_modules\morgan 2>nul

echo.
echo ⚠️  This is a temporary workaround!
echo.
echo To properly fix this issue:
echo 1. Download Yarn from https://classic.yarnpkg.com/en/docs/install#windows-stable
echo 2. Or reinstall Node.js from https://nodejs.org/
echo.
echo For now, you can try running the server with:
echo node index.js
echo.
pause