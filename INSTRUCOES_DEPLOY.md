# 🚀 Instruções para Deploy no GitHub Pages

## ⚠️ Problema com o Token

O token fornecido não está funcionando. Siga estas instruções:

## 🔑 Criar um Novo Token

1. **Acesse**: https://github.com/settings/tokens
2. **Clique em**: "Generate new token" → "Generate new token (classic)"
3. **Configure**:
   - **Note**: `cofrinho-deploy`
   - **Expiration**: Escolha uma data (ou "No expiration")
   - **Selecione o escopo**: Marque `repo` (acesso completo aos repositórios)
4. **Clique em**: "Generate token"
5. **COPIE O TOKEN** (você só verá uma vez!)

## 📤 Fazer Push Manualmente

### Opção 1: Usar o Script (Windows)

1. Execute: `push-to-github.bat`
2. Quando solicitar credenciais:
   - **Username**: `tatiannecorreia`
   - **Password**: Cole o token que você copiou

### Opção 2: Comando Manual

Abra o PowerShell ou Git Bash e execute:

```bash
cd C:\Users\tatia\Downloads\cofrinho
git push -u origin main
```

Quando solicitar:
- **Username**: `tatiannecorreia`
- **Password**: Cole seu token (não sua senha do GitHub)

### Opção 3: Configurar Token na URL

```bash
git remote set-url origin https://SEU_TOKEN_AQUI@github.com/tatiannecorreia/cofrinho.git
git push -u origin main
```

Substitua `SEU_TOKEN_AQUI` pelo token que você criou.

## ✅ Após o Push Bem-Sucedido

### 1. Ativar GitHub Pages

1. Acesse: https://github.com/tatiannecorreia/cofrinho/settings/pages
2. Em **Source**, selecione: **GitHub Actions**
3. Clique em **Save**

### 2. Verificar Deploy

1. Vá em: https://github.com/tatiannecorreia/cofrinho/actions
2. Você verá o workflow "Deploy to GitHub Pages" executando
3. Aguarde alguns minutos até aparecer ✅ verde

### 3. Acessar o Site

Seu site estará disponível em:
**https://tatiannecorreia.github.io/cofrinho/**

## 🔄 Deploy Automático

A partir de agora, **toda vez que você fizer push na branch `main`**, o GitHub Actions fará o deploy automaticamente!

```bash
# Fazer alterações
git add .
git commit -m "Minhas alterações"
git push origin main

# O deploy acontece automaticamente! 🎉
```

## 🐛 Se o Push Ainda Não Funcionar

### Verificar se o Repositório Existe

Acesse: https://github.com/tatiannecorreia/cofrinho

Se não existir, crie:
1. Vá em: https://github.com/new
2. Nome: `cofrinho`
3. Público ou Privado (sua escolha)
4. **NÃO** marque "Initialize with README"
5. Clique em "Create repository"

### Verificar Permissões do Token

O token precisa ter a permissão `repo` marcada. Verifique em:
https://github.com/settings/tokens

### Usar GitHub Desktop (Alternativa)

Se preferir uma interface gráfica:
1. Baixe: https://desktop.github.com/
2. Faça login
3. Clone o repositório
4. Faça commit e push pela interface

## 📝 Checklist

- [ ] Token criado com permissão `repo`
- [ ] Repositório existe no GitHub
- [ ] Push realizado com sucesso
- [ ] GitHub Pages ativado (Source: GitHub Actions)
- [ ] Workflow executado com sucesso
- [ ] Site acessível em https://tatiannecorreia.github.io/cofrinho/

## 🎉 Pronto!

Depois de seguir estes passos, seu site estará no ar e atualizará automaticamente a cada push!

