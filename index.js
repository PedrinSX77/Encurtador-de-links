const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');

// Importando o arquivo de rotas que criamos
const linkRoutes = require('./src/routes/linkRoutes');
const authRoutes = require('./src/routes/authRoutes');
const viewRoutes = require('./src/routes/viewRoutes');
const billingRoutes = require('./src/routes/billingRoutes');


const app = express();
app.use(cookieParser());
app.use(express.json());

// Servindo arquivos estáticos da pasta "public"

app.use(express.static(path.join(__dirname, 'public')));

// Configurando o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.set('strict routing', false);

const PORT = process.env.PORT || 3000;

// Dizemos ao app para usar nossas rotas
app.use('/api/links', linkRoutes);
app.use('/api/auth', authRoutes);

// Rotas de visualização (views)
app.use('/', viewRoutes);

// Rotas de faturamento (billing)

app.use('/api/billing', billingRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});