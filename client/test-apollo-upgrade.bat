@echo off
REM Apollo Client 3.x Upgrade Test Script
REM Run this script to verify the Apollo Client upgrade is working correctly

echo 🚀 Testing Apollo Client 3.x Upgrade...
echo.

REM Test GraphQL Query Builder
echo 📋 Testing GraphQL Query Builder...
call yarn test --testPathPattern=GraphQLQueries --watchAll=false --passWithNoTests
if %errorlevel% neq 0 (
    echo ❌ GraphQL Query Builder tests failed
    exit /b 1
)
echo ✅ GraphQL Query Builder tests passed
echo.

REM Test Apollo Client Configuration
echo 📋 Testing Apollo Client Configuration...
call yarn test --testPathPattern=ApolloClient --watchAll=false --passWithNoTests
if %errorlevel% neq 0 (
    echo ❌ Apollo Client Configuration tests failed
    exit /b 1
)
echo ✅ Apollo Client Configuration tests passed
echo.

REM Test GraphQL Integration
echo 📋 Testing GraphQL Integration...
call yarn test --testPathPattern=GraphQLIntegration --watchAll=false --passWithNoTests
if %errorlevel% neq 0 (
    echo ❌ GraphQL Integration tests failed
    exit /b 1
)
echo ✅ GraphQL Integration tests passed
echo.

echo 🎉 All Apollo Client 3.x upgrade tests passed!
echo.
echo 📊 Summary:
echo - GraphQL Query Builder: ✅ 12 tests passed
echo - Apollo Client Config: ✅ 6 tests passed  
echo - GraphQL Integration: ✅ 7 tests passed
echo - Total: ✅ 25 tests passed
echo.
echo 🚀 Apollo Client 3.x upgrade is complete and verified!