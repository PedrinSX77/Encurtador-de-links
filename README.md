🚀 ShorterLinks - Encurtador de URLs Fullstack
Bem-vindo ao ShorterLinks, um encurtador de URLs de alta performance desenvolvido com Node.js e MySQL. Este projeto foi construído focado em escalabilidade (utilizando Pool de conexões) e uma interface moderna para o usuário.

🛠️ Tecnologias Utilizadas
Backend: Node.js com Express.

Banco de Dados: MySQL (Baremetal) com biblioteca mysql2.

Segurança: Variáveis de ambiente com dotenv.

Identificadores: nanoid para geração de códigos curtos e únicos de 5 caracteres.

Frontend: HTML5, CSS3 (Modern Dark Mode) e JavaScript Vanilla.

📋 Funcionalidades
✅ Encurtamento de links via interface web.

✅ Redirecionamento automático e dinâmico.

✅ Botão de cópia rápida para o link gerado.

✅ Banco de dados persistente para salvar todos os links.

✅ Estrutura preparada para expansão (Middlewares e Connection Pool).

🔧 Como instalar e rodar o projeto
1. Clonar o repositório

git clone https://github.com/PedrinSX77/shorterlinks.git
cd shorterlinks
2. Instalar dependências

npm install
3. Configurar o Banco de Dados
Crie uma tabela no seu MySQL usando o seguinte comando SQL:

CREATE TABLE links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_original TEXT NOT NULL,
    short_code VARCHAR(5) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
4. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e preencha com suas credenciais:


DB_HOST=seu_host_aqui
DB_USER=seu_usuario_aqui
DB_PASS=sua_senha_aqui
DB_NAME=shorterlinks
PORT=3000
5. Iniciar o servidor

node index.js
Acesse: http://localhost:3000

📁 Estrutura do Projeto
Plaintext

├── assets/         # CSS e JS do frontend
├── db.js           # Configuração do Pool de conexão MySQL
├── index.js        # Servidor Express e Rotas da API
├── index.html      # Página principal
├── .env            # Variáveis sensíveis (não incluído no Git)
├── package.json    # Gerenciador de dependências
└── README.md       # Documentação do projeto