// ======================================
// ✅ SERVER.JS — Versão segura e atualizada
// ======================================

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ======================================
// ✅ CORS SEGURO
// 🔒 Permite apenas seu frontend acessar a API
// ======================================

app.use(cors({
    origin: [
        "http://localhost:8080",         // FRONTEND LOCAL
        "http://127.0.0.1:8080",
        "http://localhost",               // Caso acesse sem porta
        // "https://seu-dominio.com"      // ✅ coloque aqui quando publicar
    ]
}));

// ======================================
// ✅ Middlewares
// ======================================
app.use(express.json());

// ======================================
// ✅ Rotas do sistema
// ======================================
const clientesRoutes = require("./routes/clientes");
const pedidosRoutes  = require("./routes/pedidos");
const loginRoutes    = require("./routes/login");

app.use("/clientes", clientesRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/login", loginRoutes);

// ======================================
// ✅ Porta do servidor
// ======================================
const PORT = 3000;

// ======================================
// ✅ Inicialização do servidor
// ======================================
app.listen(PORT, () => {
    console.log("✅ API rodando com segurança em http://localhost:" + PORT);
});