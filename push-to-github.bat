@echo off
echo ========================================
echo   Push para GitHub - Cofrinho
echo ========================================
echo.

echo Configurando remote...
git remote set-url origin https://github.com/tatiannecorreia/cofrinho.git

echo.
echo Fazendo push...
echo.
echo IMPORTANTE: Quando solicitado:
echo   Username: tatiannecorreia
echo   Password: Cole seu Personal Access Token (não sua senha)
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   ERRO: Falha ao fazer push
    echo ========================================
    echo.
    echo Possiveis causas:
    echo   1. Token sem permissao "repo"
    echo   2. Repositorio nao existe
    echo   3. Token expirado ou invalido
    echo.
    echo Solucao:
    echo   1. Acesse: https://github.com/settings/tokens
    echo   2. Crie um novo token com permissao "repo"
    echo   3. Execute este script novamente
    echo.
) else (
    echo.
    echo ========================================
    echo   SUCESSO! Codigo enviado ao GitHub
    echo ========================================
    echo.
    echo Proximos passos:
    echo   1. Acesse: https://github.com/tatiannecorreia/cofrinho/settings/pages
    echo   2. Em "Source", selecione: GitHub Actions
    echo   3. Salve as configuracoes
    echo   4. Aguarde o deploy em: https://github.com/tatiannecorreia/cofrinho/actions
    echo   5. Seu site estara em: https://tatiannecorreia.github.io/cofrinho/
    echo.
)

pause

