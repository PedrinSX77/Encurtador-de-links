#!/bin/bash

# --- CONFIGURAÇÕES DE CORES ---
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# --- CABEÇALHO ---
echo -e "${GREEN}"
echo "  _____ _                _              _     _       _        "
echo " / ____| |              | |            | |   (_)     | |       "
echo "| (___ | |__   ___  _ __| |_ ___ _ __  | |    _ _ __ | | _____ "
echo " \___ \| '_ \ / _ \| '__| __/ _ \ '__| | |   | | '_ \| |/ / __|"
echo " ____) | | | | (_) | |  | ||  __/ |    | |___| | | | |   <\__ \\"
echo "|_____/|_| |_|\___/|_|   \__\___|_|    |_____|_|_| |_|_|\_\___/"
echo -e "                      Versão 1.2.2 - Deploy Automático${NC}\n"

TARGET_DIR="shorterlinks"

# --- VERIFICAÇÃO DE DEPENDÊNCIAS ---
echo -e "${YELLOW}[1/6] Verificando requisitos do sistema...${NC}"
for cmd in git mysql curl; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "${RED}❌ Erro: O comando '$cmd' não foi encontrado. Instale-o e tente novamente.${NC}"
        exit 1
    fi
done

# --- CLONAGEM DO REPOSITÓRIO ---
echo -e "${YELLOW}[2/6] Preparando diretório...${NC}"
if [ ! -d "$TARGET_DIR" ]; then
    git clone https://github.com/PedrinSX77/Encurtador-de-links.git $TARGET_DIR || { echo -e "${RED}❌ Erro ao clonar.${NC}"; exit 1; }
fi
cd $TARGET_DIR || exit

# --- CONFIGURAÇÃO DO BANCO DE DADOS ---
if [ ! -f .env ]; then
    echo -e "${GREEN}📝 --- CONFIGURAÇÃO AUTOMATIZADA DO BANCO ---${NC}"
    # O </dev/tty força o script a ouvir o teu teclado e não o fluxo do curl
    read -p "   🔹 Host do MySQL (padrão: localhost): " db_host </dev/tty
    db_host=${db_host:-localhost}
    
    read -p "   🔹 Usuário do MySQL (padrão: root): " db_user </dev/tty
    db_user=${db_user:-root}
    
    read -s -p "   🔹 Senha do MySQL: " db_pass </dev/tty
    echo ""
    
    read -p "   🔹 Nome do Banco (padrão: shorterlinks): " db_name </dev/tty
    db_name=${db_name:-shorterlinks}

    echo -e "${YELLOW}🗄️ Criando banco e tabelas...${NC}"
    
    # Execução do SQL via CLI - Corrigido para usar a variável $db_name
    mysql -h "$db_host" -u "$db_user" -p"$db_pass" <<EOF || { echo -e "${RED}❌ Falha na conexão MySQL. Verifica os teus dados.${NC}"; exit 1; }
CREATE DATABASE IF NOT EXISTS $db_name;
USE $db_name;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    urlOriginal TEXT NOT NULL,
    shortCode VARCHAR(5) NOT NULL UNIQUE,
    userId INT,
    clicks INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
EOF

    echo -e "${GREEN}   ✅ Banco de dados e tabelas validados!${NC}"

    # --- GERAÇÃO DO .ENV ---
    jwt_secret=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)
    echo -e "${YELLOW}💾 Gerando ficheiro .env...${NC}"
    cat <<EOF > .env
PORT=3000
DB_HOST=$db_host
DB_USER=$db_user
DB_PASS=$db_pass
DB_NAME=$db_name
JWT_SECRET=$jwt_secret
EOF
fi

# --- INSTALAÇÃO DO PNPM ---
echo -e "${YELLOW}[4/6] Configurando pnpm...${NC}"
if ! command -v pnpm &> /dev/null; then
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    export PNPM_HOME="$HOME/.local/share/pnpm"
    export PATH="$PNPM_HOME:$PATH"
fi

# --- INSTALAÇÃO DE DEPENDÊNCIAS ---
echo -e "${YELLOW}[5/6] Instalando dependências e PM2...${NC}"
pnpm install && pnpm add -g pm2

# --- DEPLOY COM PM2 ---
echo -e "${YELLOW}[6/6] Iniciando servidor em background...${NC}"
pnpm exec pm2 delete encurtador 2>/dev/null || true
pnpm exec pm2 start index.js --name encurtador --watch
pnpm exec pm2 save

# --- CONCLUSÃO ---
echo -e "\n${GREEN}===================================================="
echo "🎉 INSTALAÇÃO CONCLUÍDA COM SUCESSO!"
echo "🌐 URL: http://localhost:3000"
echo "📊 Painel PM2: pnpm exec pm2 status"
echo -e "====================================================${NC}"
