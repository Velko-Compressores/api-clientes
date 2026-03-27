const express = require("express");
const path = require("path");

const app = express();

// Define a pasta pública
app.use(express.static(path.join(__dirname)));

// Rota padrão → abre index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Rodar servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`✅ Frontend rodando em http://localhost:${PORT}`);
});

