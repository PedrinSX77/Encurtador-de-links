const express = require('express');
require('dotenv').config();

// Importando o arquivo de rotas que criamos
const linkRoutes = require('./src/routes/linkRoutes');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Dizemos ao app para usar nossas rotas
app.use('/', linkRoutes);
app.use('/auth', require('./src/routes/authRoutes'));

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});