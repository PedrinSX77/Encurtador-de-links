# 🚀 Encurtador de Links Pro

> Um encurtador de URLs moderno, seguro e performático, construído com **Node.js**, **MySQL** e **JWT**.

Este projeto foi desenvolvido com foco em **segurança**, **organização de código** e **experiência do usuário**, sendo ideal como projeto de portfólio Full Stack.

---

## 📌 Versão

**v1.1** — Sistema de usuários, autenticação e proteção de rotas

---

## 🆕 Novidades da v1.1

Em comparação à versão inicial, esta release traz melhorias importantes:

* 🔐 **Autenticação JWT (JSON Web Token)**
  Apenas usuários autenticados podem criar links encurtados.

* 👤 **Sistema de Login e Registro**
  Cadastro de usuários com senhas criptografadas utilizando **Bcrypt**.

* 💾 **Persistência de Sessão**
  Token armazenado no **LocalStorage**, mantendo o usuário logado.

* 🛡️ **Middleware de Segurança**
  Validação automática do token antes do acesso às rotas protegidas.

* 🌙 **Interface em Dark Mode**
  Design moderno, responsivo e focado em UX.

---

## 🛠️ Tecnologias Utilizadas

### Backend

* Node.js
* Express.js
* MySQL (`mysql2/promise`)

### Segurança

* JSON Web Token (JWT)
* BcryptJS

### Frontend

* HTML5
* CSS3 (Glassmorphism)
* JavaScript Vanilla

---

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── controllers/     # Lógica de negócio (Auth e Links)
│   ├── middlewares/     # Middleware de autenticação (verificarToken)
│   └── routes/          # Definição das rotas da API
│
├── public/              # Arquivos estáticos (HTML, CSS, JS)
├── db.js                # Conexão com o banco de dados
├── index.js             # Ponto de entrada da aplicação
└── .env                 # Variáveis de ambiente (não versionado)
```

---

## 🚀 Instalação e Execução

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/PedrinSX77/Encurtador-de-links.git
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o banco de dados

Crie as tabelas **users** e **links** no seu MySQL.

> ⚠️ O script SQL pode ser adicionado futuramente para facilitar a instalação.

### 4️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=seu_banco
JWT_SECRET=sua_chave_secreta_aqui
```

### 5️⃣ Inicie o servidor

```bash
node index.js
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🔒 Segurança

* Senhas armazenadas com **Salt Hashing (12 rounds)**
* Tokens JWT com **expiração de 24 horas**
* Rotas sensíveis protegidas por middleware

Mesmo em caso de vazamento de dados, as credenciais permanecem seguras.

---

## 📈 Próximas melhorias (Roadmap)

* 📊 Dashboard de estatísticas de links
* ⏳ Expiração personalizada de URLs
* 🧑‍💼 Sistema de permissões (roles)
* 📄 Documentação com Swagger

---

## 👨‍💻 Autor

Desenvolvido por **PedrinSX777**

Se curtir o projeto, ⭐ deixe uma estrela no repositório!
