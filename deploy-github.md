# Como fazer upload para o GitHub

## Passo 1: Criar repositório no GitHub

1. Acesse https://github.com
2. Clique no botão "+" no canto superior direito
3. Selecione "New repository"
4. Escolha um nome (ex: "cofrinho" ou "controle-financeiro")
5. Deixe como **público** ou **privado** (sua escolha)
6. **NÃO** marque "Initialize this repository with a README"
7. Clique em "Create repository"

## Passo 2: Conectar e enviar o código

Após criar o repositório, o GitHub mostrará comandos. Use estes comandos:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

**Substitua:**
- `SEU_USUARIO` pelo seu nome de usuário do GitHub
- `SEU_REPOSITORIO` pelo nome do repositório que você criou

## Alternativa: Usar SSH

Se você preferir usar SSH (e já tiver configurado):

```bash
git remote add origin git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

## Pronto!

Depois disso, seu código estará no GitHub e você poderá acessá-lo em:
`https://github.com/SEU_USUARIO/SEU_REPOSITORIO`

