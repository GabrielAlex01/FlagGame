@echo off
echo ============================================
echo     INICIANDO O FLAGGAME - GABRIEL ALEX
echo ============================================

cd frontend

where node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js não está instalado. Instale em https://nodejs.org
    pause
    exit /b
)

IF NOT EXIST "node_modules" (
    echo Instalando dependências com npm install...
    npm install
)

echo Iniciando servidor com npm run dev...
npm run dev

pause
