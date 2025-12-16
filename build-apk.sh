#!/bin/bash

echo "========================================"
echo "  Build APK - Cofrinho"
echo "========================================"
echo ""

echo "[1/5] Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências"
    exit 1
fi

echo ""
echo "[2/5] Fazendo build da aplicação web..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERRO: Falha no build"
    exit 1
fi

echo ""
echo "[3/5] Adicionando plataforma Android (se necessário)..."
if [ ! -d "android" ]; then
    npx cap add android
fi

echo ""
echo "[4/5] Sincronizando arquivos..."
npx cap sync
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao sincronizar"
    exit 1
fi

echo ""
echo "[5/5] Abrindo Android Studio..."
echo ""
echo "IMPORTANTE: No Android Studio:"
echo "  1. Vá em Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "  2. Aguarde o build terminar"
echo "  3. O APK estará em: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
npx cap open android

echo ""
echo "Build concluído! Verifique o Android Studio."

