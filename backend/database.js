// database.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./clientes.db", (err) => {
    if (err) console.error("Erro ao conectar:", err);
    else console.log("Banco conectado.");
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            telefone TEXT,
            senha TEXT NOT NULL
        )
    `);
    
    // ✅ Tabela de pedidos
    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_email TEXT NOT NULL,
            itens TEXT NOT NULL,
            total REAL NOT NULL,
            data TEXT NOT NULL
        )
    `);

});


module.exports = db;