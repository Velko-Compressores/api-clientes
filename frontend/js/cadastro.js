const API = "http://localhost:3000/clientes";

document.getElementById("btnCadastrar").addEventListener("click", async () => {
    const cliente = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        senha: document.getElementById("senha").value
    };

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    });

    if (res.ok) {
        alert("Cadastro concluído!");
        window.location.href = "login.html";
    } else {
        alert("Erro ao cadastrar.");
    }
});