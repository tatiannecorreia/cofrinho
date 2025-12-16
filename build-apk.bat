@echo off
echo ========================================
echo   Build APK - Cofrinho
echo ========================================
echo.

echo [1/5] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias
    pause
    exit /b 1
)

echo.
echo [2/5] Fazendo build da aplicacao web...
call npm run build
if errorlevel 1 (
    echo ERRO: Falha no build
    pause
    exit /b 1
)

echo.
echo [3/5] Adicionando plataforma Android (se necessario)...
if not exist "android" (
    call npx cap add android
)

echo.
echo [4/5] Sincronizando arquivos...
call npx cap sync
if errorlevel 1 (
    echo ERRO: Falha ao sincronizar
    pause
    exit /b 1
)

echo.
echo [5/5] Abrindo Android Studio...
echo.
echo IMPORTANTE: No Android Studio:
echo   1. Vá em Build -^> Build Bundle(s) / APK(s) -^> Build APK(s)
echo   2. Aguarde o build terminar
echo   3. O APK estará em: android\app\build\outputs\apk\debug\app-debug.apk
echo.
call npx cap open android

echo.
echo Build concluido! Verifique o Android Studio.
pause

