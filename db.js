const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
})

connection.getConnection((err, conn) => {
    if (err) {
        console.error("❌ Erro no MySQL Baremetal:", err.message);
    } else {
        console.log("🔥 Conectado ao MySQL com sucesso!");
        conn.release();
    }
});

module.exports = connection.promise()