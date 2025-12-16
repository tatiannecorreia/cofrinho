# 📱 Como Gerar o APK do Cofrinho

Este guia explica como transformar a aplicação web em um APK Android instalável.

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 18 ou superior)
   - Download: https://nodejs.org/

2. **Android Studio** instalado
   - Download: https://developer.android.com/studio
   - Instale o Android SDK e configure as variáveis de ambiente

3. **Java JDK** (versão 11 ou superior)
   - Geralmente vem com o Android Studio

## 🚀 Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Instalar Capacitor CLI (se necessário)

```bash
npm install -g @capacitor/cli
```

### 3. Build da Aplicação Web

```bash
npm run build
```

Isso criará a pasta `dist` com os arquivos otimizados.

### 4. Adicionar Plataforma Android

```bash
npx cap add android
```

### 5. Sincronizar Arquivos

```bash
npx cap sync
```

Este comando copia os arquivos da pasta `dist` para o projeto Android.

### 6. Abrir no Android Studio

```bash
npx cap open android
```

Ou abra manualmente a pasta `android` no Android Studio.

### 7. Gerar o APK

#### Opção A: Pelo Android Studio (Recomendado)

1. No Android Studio, vá em **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Aguarde o build terminar
3. Clique em **locate** para encontrar o APK
4. O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Opção B: Pelo Terminal (Gradle)

```bash
cd android
./gradlew assembleDebug
```

O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

### 8. APK de Release (Assinado)

Para gerar um APK assinado para publicação:

1. Crie um keystore:
```bash
keytool -genkey -v -keystore cofrinho-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias cofrinho
```

2. Configure o `android/app/build.gradle` com suas credenciais

3. Gere o APK de release:
```bash
cd android
./gradlew assembleRelease
```

## 📦 Estrutura de Arquivos

Após a configuração, você terá:

```
cofrinho/
├── src/              # Código fonte React
├── dist/             # Build da aplicação web
├── android/          # Projeto Android nativo
│   └── app/
│       └── build/
│           └── outputs/
│               └── apk/
│                   └── debug/
│                       └── app-debug.apk  ← SEU APK AQUI
└── capacitor.config.ts
```

## 🔧 Comandos Úteis

```bash
# Build e sincronizar
npm run build && npx cap sync

# Abrir Android Studio
npx cap open android

# Atualizar dependências nativas
npx cap update

# Ver logs do dispositivo
adb logcat
```

## ⚠️ Troubleshooting

### Erro: "Command not found: cap"
```bash
npm install -g @capacitor/cli
```

### Erro: "Android SDK not found"
- Abra o Android Studio
- Vá em **Tools** → **SDK Manager**
- Instale o Android SDK e configure o `ANDROID_HOME`

### Erro: "Gradle sync failed"
- No Android Studio: **File** → **Sync Project with Gradle Files**
- Ou execute: `cd android && ./gradlew clean`

### APK muito grande
- O APK de debug inclui símbolos de debug
- Use `assembleRelease` para um APK menor e otimizado

## 📱 Testando o APK

1. **Emulador Android:**
   - No Android Studio: **Tools** → **Device Manager** → Criar dispositivo virtual

2. **Dispositivo Físico:**
   - Ative **Modo Desenvolvedor** no Android
   - Ative **Depuração USB**
   - Conecte via USB e execute: `adb install app-debug.apk`

3. **Instalação Direta:**
   - Transfira o APK para o dispositivo
   - Permita instalação de fontes desconhecidas
   - Toque no APK para instalar

## 🎯 Próximos Passos

- Configurar ícone do aplicativo
- Adicionar splash screen
- Configurar permissões necessárias
- Publicar na Google Play Store (requer conta de desenvolvedor)

## 📝 Notas

- O APK de debug é para testes
- Para distribuição, use APK de release assinado
- O tamanho do APK inicial será ~20-30MB (inclui WebView)
- A aplicação funciona offline após a instalação

