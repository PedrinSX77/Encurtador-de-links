![Website Status](https://img.shields.io/website?url=https%3A%2F%2Furl.odysseycloud.com.br%2F&label=Status%20do%20Encurtador&style=for-the-badge)

# 🚀 Encurtador de Links Pro — v1.2.2

> Um encurtador de URLs moderno, seguro e performático, construído com **Node.js**, **MySQL** e **JWT**. Agora com **Auto-Deploy** via PM2 e PNPM.

Este projeto foca em **segurança**, **organização de código** e **automação**, sendo ideal para quem busca uma solução robusta e pronta para produção.

---

## 🆕 Novidades da Versão v1.2.2

A evolução do projeto agora foca em **DevOps e Estabilidade**:

* **⚡ Instalação Automática**: Script interativo (`install.sh`) que configura banco de dados, tabelas e ambiente com um comando.
* **🔄 Gerenciamento 24h**: Integração com **PM2**, garantindo que o servidor reinicie sozinho em caso de falhas ou reboot do sistema.
* **🔑 Segurança Reforçada**: Geração automática de chaves `JWT_SECRET` únicas para cada instalação.
* **📦 Eficiência com PNPM**: Gerenciamento de pacotes ultra-rápido e otimizado para o servidor.

---
## 🌐 Teste Agora (Live Demo)

O projeto está rodando em ambiente de produção! Você pode testar a interface, criar sua conta e gerar seus links encurtados com SSL através do link oficial:

🔗 **[https://url.odysseycloud.com.br/](https://url.odysseycloud.com.br/)**

### 🧪 O que testar?
1. **Registro/Login:** Crie uma conta para ter seu próprio painel.
2. **Encurtamento:** Cole uma URL longa e veja a mágica do link dinâmico.
3. **Analytics:** Clique no link gerado e veja o contador de cliques atualizar em tempo real.
4. **HTTPS:** Repare no cadeado de segurança gerenciado pelo Nginx + Certbot.

## 🛠️ Tecnologias Utilizadas

### Infraestrutura & Deploy
* **PM2**: Gerenciador de processos para uptime 24/7.
* **PNPM**: Gerenciador de pacotes performático.
* **Bash Script**: Automação total do fluxo de deploy.

### Backend & Frontend
* **Node.js & Express**: Base da aplicação e roteamento.
* **MySQL**: Armazenamento persistente de usuários e links.
* **JWT & Bcrypt**: Autenticação e criptografia de senhas.
* **Glassmorphism UI**: Interface moderna em Dark Mode focada em UX.

---

## 🚀 Instalação Rápida (O Comando Mágico)

Se você utiliza um ambiente Linux (VPS, Ubuntu, etc), execute o comando abaixo para realizar o clone, configurar o banco de dados, instalar dependências e iniciar o servidor de uma só vez:

```bash
curl -s https://raw.githubusercontent.com/PedrinSX77/Encurtador-de-links/main/install.sh | bash
```

Atenção: O script solicitará suas credenciais do MySQL para criar o banco e as tabelas automaticamente.

## ⚙️ Gerenciamento do Servidor
Com o servidor rodando via PM2, utilize estes comandos para controle total:

Objetivo,Comando
```Ver Status,pnpm exec pm2 status
Ver Logs,pnpm run logs
Painel Visual,pnpm exec pm2 monit
Parar App,pnpm run stop
Reiniciar,pnpm exec pm2 restart encurtador
```

📂 Estrutura do Projeto
```
├── src/
│   ├── controllers/     # Lógica de autenticação e links
│   ├── middlewares/     # Validação de tokens JWT
│   └── routes/          # Definição dos endpoints da API
├── public/              # Interface Web (HTML, CSS, JS)
├── install.sh           # Script de instalação automática
├── index.js             # Ponto de entrada da aplicação
└── .env                 # Configurações sensíveis (gerado no deploy)
```

## 🔒 Segurança
Autenticação: Apenas usuários logados podem gerenciar links.

Senhas: Criptografia Salt Hashing de 12 rounds via Bcrypt.

Tokens: JWT com expiração automática de 24 horas.

Proteção: Middlewares validam o acesso a rotas sensíveis.

👨‍💻 Autor
Desenvolvido por PedrinSX77 🚀

Se este projeto foi útil para você, deixe uma ⭐ no repositório!
