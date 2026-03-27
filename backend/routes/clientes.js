const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");

// ========================================================
// ✅ CRIAR CLIENTE COM SENHA CRIPTOGRAFADA
// ========================================================
router.post("/", (req, res) => {
    const { nome, email, telefone, senha } = req.body;

    // ✅ Validação básica
    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
    }

    // ✅ Verificar se email já existe
    const sqlCheck = "SELECT id FROM clientes WHERE email = ?";

    db.get(sqlCheck, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao verificar email." });
        }

        if (row) {
            return res.status(400).json({ erro: "Email já cadastrado." });
        }

        // ✅ Criptografar senha
        const senhaHash = bcrypt.hashSync(senha, 10);

        const sqlInsert = `
            INSERT INTO clientes (nome, email, telefone, senha)
            VALUES (?, ?, ?, ?)
        `;

        db.run(sqlInsert, [nome, email, telefone, senhaHash], function(err) {
            if (err) {
                return res.status(500).json({ erro: "Erro ao cadastrar cliente." });
            }

            // ✅ Nunca retornar a senha ao frontend
            res.status(201).json({
                id: this.lastID,
                nome,
                email,
                telefone
            });
        });
    });
});


// ========================================================
// ✅ LISTAR TODOS OS CLIENTES (somente para debug/admin futuramente)
// ========================================================
router.get("/", (req, res) => {
    db.all("SELECT id, nome, email, telefone FROM clientes", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });

        res.json(rows);
    });
});


// ========================================================
// ✅ BUSCAR CLIENTE POR ID (retorno seguro – sem senha)
// ========================================================
router.get("/:id", (req, res) => {
    db.get("SELECT id, nome, email, telefone FROM clientes WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        row ? res.json(row) : res.status(404).json({ erro: "Cliente não encontrado" });
    });
});


// ========================================================
// ✅ ATUALIZAR CLIENTE (não atualiza senha aqui)
// ========================================================
router.put("/:id", (req, res) => {
    const { nome, email, telefone } = req.body;

    const sql = `
        UPDATE clientes SET nome = ?, email = ?, telefone = ?
        WHERE id = ?
    `;

    db.run(sql, [nome, email, telefone, req.params.id], function(err) {
        if (err) return res.status(500).json({ erro: err.message });

        res.json({ id: req.params.id, nome, email, telefone });
    });
});


// ========================================================
// ✅ DELETAR CLIENTE
// ========================================================
router.delete("/:id", (req, res) => {
    db.run("DELETE FROM clientes WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: "Cliente removido com sucesso!" });
    });
});

module.exports = router;