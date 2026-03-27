const express = require("express");
const router = express.Router();
const db = require("../database");
const auth = require("../middlewares/auth");

// ================================================
// ✅ Criar pedido (rota protegida com JWT)
// ================================================
router.post("/", auth, (req, res) => {
    const { itens, total } = req.body;
    const cliente_email = req.usuario.email; // ✅ Pega email do token autenticado
    const data = new Date().toISOString();

    // ✅ Validação básica
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ erro: "Lista de itens inválida." });
    }

    if (typeof total !== "number") {
        return res.status(400).json({ erro: "Total inválido." });
    }

    // ✅ Preparar SQL
    const sql = `
        INSERT INTO pedidos (cliente_email, itens, total, data)
        VALUES (?, ?, ?, ?)
    `;

    // ✅ Salvar string JSON dos itens no banco
    db.run(
        sql,
        [cliente_email, JSON.stringify(itens), total, data],
        function (err) {
            if (err) {
                console.log("Erro ao salvar pedido:", err);
                return res.status(500).json({ erro: "Erro ao salvar o pedido." });
            }

            res.status(201).json({
                id: this.lastID,
                cliente_email,
                itens,
                total,
                data
            });
        }
    );
});


// ================================================
// ✅ Listar pedidos (rota protegida ou pública?)
// ================================================
// Se quiser liberar só para logados → usar auth:
// router.get("/", auth, (req, res) => {

router.get("/", (req, res) => {
    db.all("SELECT * FROM pedidos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar pedidos." });

        // ✅ Converter campo itens de string para JSON
        const result = rows.map(pedido => ({
            ...pedido,
            itens: JSON.parse(pedido.itens)
        }));

        res.status(200).json(result);
    });
});

module.exports = router;