# 🚀 Deploy no GitHub Pages

Este guia explica como hospedar o Cofrinho no GitHub Pages.

## 📋 Pré-requisitos

- Repositório criado no GitHub: `https://github.com/tatiannecorreia/cofrinho`
- Código já commitado e enviado para o GitHub

## 🔧 Configuração Automática (Recomendado)

O projeto já está configurado com **GitHub Actions** para deploy automático!

### Passo 1: Ativar GitHub Pages

1. Acesse seu repositório: `https://github.com/tatiannecorreia/cofrinho`
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - **Source**: `GitHub Actions`
5. Salve as configurações

### Passo 2: Fazer Push do Código

O workflow já está configurado! Basta fazer push:

```bash
git add .
git commit -m "Configurar GitHub Pages"
git push origin main
```

### Passo 3: Aguardar o Deploy

1. Vá na aba **Actions** do seu repositório
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde alguns minutos até concluir
4. Quando aparecer um ✅ verde, o deploy está completo!

### Passo 4: Acessar o Site

Seu site estará disponível em:
**https://tatiannecorreia.github.io/cofrinho/**

## 🔄 Deploy Automático

A partir de agora, **toda vez que você fizer push na branch `main`**, o GitHub Actions fará o deploy automaticamente!

```bash
# Faça suas alterações
git add .
git commit -m "Atualizar aplicação"
git push origin main

# O deploy acontece automaticamente! 🎉
```

## 📝 Verificar Status do Deploy

1. Acesse: `https://github.com/tatiannecorreia/cofrinho/actions`
2. Veja o status do último workflow
3. Clique no workflow para ver os logs detalhados

## 🔧 Configuração Manual (Alternativa)

Se preferir fazer deploy manual:

### Opção 1: Usando gh-pages (npm)

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar script no package.json (já adicionado)
# "deploy": "npm run build:gh-pages && gh-pages -d dist"

# Fazer deploy
npm run deploy
```

### Opção 2: Deploy Manual

```bash
# Build da aplicação
npm run build

# Fazer push da pasta dist para branch gh-pages
git subtree push --prefix dist origin gh-pages
```

## ⚙️ Configurações Importantes

### Base Path

O `vite.config.ts` está configurado para usar `/cofrinho/` como base path quando em produção. Isso é necessário porque o GitHub Pages serve o site em um subdiretório.

Se você mudar o nome do repositório, atualize:
- `vite.config.ts`: linha `base: '/cofrinho/'`
- Este arquivo de documentação

### Custom Domain (Opcional)

Se você tiver um domínio próprio:

1. Crie um arquivo `CNAME` na pasta `public/` com seu domínio:
   ```
   meusite.com
   ```

2. Configure o DNS do seu domínio para apontar para o GitHub Pages

3. No GitHub, vá em **Settings → Pages** e adicione o domínio customizado

## 🐛 Troubleshooting

### Site não aparece após deploy

1. Verifique se o workflow foi executado com sucesso
2. Aguarde alguns minutos (pode levar até 10 minutos para propagar)
3. Limpe o cache do navegador (Ctrl+F5)
4. Verifique a URL: deve ser `https://tatiannecorreia.github.io/cofrinho/`

### Erro 404 no GitHub Pages

- Verifique se o `base` no `vite.config.ts` está correto: `/cofrinho/`
- Certifique-se de que o build foi feito com `NODE_ENV=production`

### Assets não carregam

- Verifique se o `base` path está configurado corretamente
- Os assets devem estar em caminhos relativos ao base path

### Workflow falha

1. Vá em **Actions** → Clique no workflow que falhou
2. Veja os logs para identificar o erro
3. Erros comuns:
   - Dependências não instaladas: verifique `package.json`
   - Erro de build: verifique se o código compila localmente
   - Permissões: verifique se o GitHub Pages está ativado

## 📊 Status do Deploy

Você pode verificar o status do deploy em:
- **Actions**: `https://github.com/tatiannecorreia/cofrinho/actions`
- **Settings → Pages**: `https://github.com/tatiannecorreia/cofrinho/settings/pages`

## 🎉 Pronto!

Seu site está no ar! Compartilhe o link:
**https://tatiannecorreia.github.io/cofrinho/**

## 📱 Testar Localmente

Para testar como ficará no GitHub Pages:

```bash
# Build com base path de produção
NODE_ENV=production npm run build

# Preview local
npm run preview
```

Acesse `http://localhost:4173/cofrinho/` para ver como ficará no GitHub Pages.

