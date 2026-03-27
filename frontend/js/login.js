const API_LOGIN = "http://localhost:3000/login";

document.getElementById("btnLogin").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.status === 200) {

        // ✅ Salvando dados do usuário
        localStorage.setItem("usuarioNome", data.usuario.nome);
        localStorage.setItem("usuarioEmail", data.usuario.email);

        // ✅ Salvando TOKEN JWT (importante!)
        localStorage.setItem("token", data.token);

        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert(data.erro || "Erro ao fazer login.");
    }
});