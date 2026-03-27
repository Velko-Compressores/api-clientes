const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ LOGIN SEGURO: bcrypt + JWT
router.post("/", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios." });
    }

    // ✅ Buscar usuário pelo email
    const sql = "SELECT * FROM clientes WHERE email = ?";

    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ erro: "Erro no servidor." });
        }

        if (!user) {
            return res.status(401).json({ erro: "Email ou senha incorretos." });
        }

        // ✅ Verificar senha usando bcrypt
        const senhaValida = bcrypt.compareSync(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: "Email ou senha incorretos." });
        }

        // ✅ Gerar TOKEN JWT real
        const token = jwt.sign(
            { id: user.id, email: user.email },
            "SEGREDO_SUPER_SEGURO",   // <- depois vamos mover isso para variável de ambiente
            { expiresIn: "2h" }
        );

        // ✅ Retorno seguro (não enviar senha!)
        res.status(200).json({
            mensagem: "Login autorizado",
            token: token,
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });
    });
});

module.exports = router;