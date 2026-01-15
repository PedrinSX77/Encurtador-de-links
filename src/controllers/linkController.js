const db = require('../../db'); 
const { nanoid } = require('nanoid');

// Lógica de Encurtar
exports.encurtarLink = async (req, res) => {
    const { urlOriginal } = req.body;
    const shortCode = nanoid(5);
    
    try {
        const sql = 'INSERT INTO links (urlOriginal, shortCode) VALUES (?, ?)'
        await db.execute(sql, [urlOriginal, shortCode])
        res.json({ message: "Link encurtado!", shortCode });
    } catch (error) {
        res.status(500).send("Erro ao salvar no banco");
    }
};

// Lógica de Redirecionar
exports.redirecionarLink = async (req, res) => {
    const { code } = req.params;

    try {
        const sql = 'SELECT urlOriginal FROM links WHERE shortCode = ?';
        const [rows] = await db.execute(sql, [code]);

        if (rows.length === 0) {
            return res.status(404).send("Link não encontrado");
        }

        const urlDestino = rows[0].urlOriginal;
        return res.redirect(urlDestino);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro interno no servidor");
    }
};