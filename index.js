const express = require('express');
const db = require('./db'); // Importando sua conexão
const { nanoid } = require('nanoid');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

app.post('/encurtar', async (req, res) => {
    const { urlOriginal } = req.body;
    const shortCode = nanoid(5);
    try {
        const sql = 'INSERT INTO links (url_original, short_code) VALUES (?, ?)'
        await db.execute(sql, [urlOriginal, shortCode])
        res.json({ message: "Link encurtado!", shortCode });
    } catch (error) {
        res.status(500).send("Erro ao salvar no banco");
    }
});

app.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const sql = 'SELECT url_original FROM links WHERE short_code = ?';
        const [rows] = await db.execute(sql, [code]);

        if (rows.length === 0) {
            return res.status(404).send("Link não encontrado");
        }

        const urlDestino = rows[0].url_original;
        return res.redirect(urlDestino);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro interno no servidor");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});