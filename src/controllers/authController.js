const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema } = require('../validators/authSchema');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const passHash = await bcrypt.hash(password, 12);

        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        const [result] = await db.execute(sql, [username, email, passHash]);

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Este e-mail já está cadastrado." });
        }
        console.error("Erro no registro:", error);
        return res.status(500).json({ error: "Erro ao salvar no servidor." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 864e5 // 1 dia
        });

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token: token 
        });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro ao processar o login." });
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token'); // Isso remove o cookie de segurança
    return res.status(200).json({ message: "Logout realizado no servidor!" });
};