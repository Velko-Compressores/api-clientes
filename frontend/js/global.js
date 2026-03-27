// ======================
// SAUDAÇÃO GLOBAL
// ======================
const saudacaoGlobal = document.getElementById("saudacao");
const usuarioNomeGlobal = localStorage.getItem("usuarioNome");

if (saudacaoGlobal && usuarioNomeGlobal) {
    saudacaoGlobal.textContent = `Olá, ${usuarioNomeGlobal}, seja bem-vindo!`;
}

// ======================
// BOTÃO LOGOUT GLOBAL
// ======================
const btnLogoutGlobal = document.getElementById("btnLogout");
const usuarioEmailGlobal = localStorage.getItem("usuarioEmail");

// Exibir botão sair somente se logado
if (btnLogoutGlobal && usuarioEmailGlobal) {
    btnLogoutGlobal.style.display = "block";
}

if (btnLogoutGlobal) {
    btnLogoutGlobal.addEventListener("click", () => {
        localStorage.removeItem("usuarioNome");
        localStorage.removeItem("usuarioEmail");

        alert("Você saiu da conta.");
        window.location.href = "index.html";
    });
}

// ======================
// BOTÃO LOGIN GLOBAL
// ======================

const btnLoginMenu = document.getElementById("btnLoginMenu");
const usuarioEmailGlobal2 = localStorage.getItem("usuarioEmail");

// ✅ Se estiver logado → esconder botão Login
if (btnLoginMenu && usuarioEmailGlobal2) {
    btnLoginMenu.style.display = "none";
}

// ✅ Se NÃO estiver logado → mostrar botão Login (garantia)
// if (btnLoginMenu && !usuarioEmailGlobal2) {
//     btnLoginMenu.style.display = "block";
// }

