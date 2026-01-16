const db = require('../../db'); 
const { nanoid } = require('nanoid');

// Lógica de Encurtar
exports.encurtarLink = async (req, res) => {
    const { urlOriginal } = req.body;
    const shortCode = nanoid(5);
    
    try {
        const sql = 'INSERT INTO links (urlOriginal, shortCode, userId) VALUES (?, ?, ?)';
        await db.execute(sql, [urlOriginal, shortCode, req.user.id]);
        res.json({ message: "Link encurtado!", shortCode });
    } catch (error) {
        res.status(500).send("Erro ao salvar no banco");
    }
};

// Lógica de Redirecionar
exports.redirecionarLink = async (req, res) => {
    const { code } = req.params;

    try {
        const sql = 'SELECT id, urlOriginal FROM links WHERE shortCode = ?';
        const [rows] = await db.execute(sql, [code]);

        if (rows.length > 0) {
            await db.execute('UPDATE links SET clicks = clicks + 1 WHERE id = ?', [rows[0].id]);
        } else {
            return res.status(404).send("Link não encontrado");
        }

        const urlDestino = rows[0].urlOriginal;
        return res.redirect(urlDestino);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro interno no servidor");
    }
};

exports.listLinks = async (req, res) => {
    const userId = req.user.id;

    try {
        const sql = 'SELECT * FROM links WHERE userId = ?';
        const [rows] = await db.execute(sql, [userId]);
        res.json({ links: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar links");
    }
}

exports.deleteLink = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Pegamos do token via middleware

    try {
        const [result] = await db.execute(
            'DELETE FROM links WHERE id = ? AND userId = ?',
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Link não encontrado ou permissão negada." });
        }

        res.json({ message: "Link deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar o link." });
    }
};