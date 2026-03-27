// ==========================
// ELEMENTOS DA TELA
// ==========================
const lista = document.getElementById("listaCarrinho");
const btnFinalizar = document.getElementById("finalizar");
const usuarioEmail = localStorage.getItem("usuarioEmail");
const token = localStorage.getItem("token");


// ==========================
// CARREGAR CARRINHO
// ==========================
function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    if (Object.keys(carrinho).length === 0) {
        lista.innerHTML = "<p>O carrinho está vazio.</p>";
        return;
    }

    lista.innerHTML = "";

    for (let id in carrinho) {
        const item = carrinho[id];

        const precoTexto = usuarioEmail
            ? `Preço unidade: R$ ${item.preco.toFixed(2)}`
            : `<span style="color:#999;">Preço oculto — faça login</span>`;

        const box = document.createElement("div");
        box.classList.add("produto");

        box.innerHTML = `
            <strong>${item.item}</strong> - ${item.modelo}<br>
            ${item.descricao}<br>
            Quantidade: ${item.quantidade}<br>
            ${precoTexto}
        `;

        lista.appendChild(box);
    }
}

carregarCarrinho();


// ==========================
// FINALIZAR PEDIDO
// ==========================
const API_PEDIDOS = "http://localhost:3000/pedidos";

btnFinalizar.addEventListener("click", finalizarPedido);

function finalizarPedido() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    if (!token) {
        alert("Você precisa estar logado para finalizar o pedido.");
        window.location.href = "login.html";
        return;
    }

    if (Object.keys(carrinho).length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const itens = Object.values(carrinho).map(item => ({
        item: item.item,
        modelo: item.modelo,
        descricao: item.descricao,
        preco: item.preco,
        quantidade: item.quantidade
    }));

    const total = usuarioEmail
        ? itens.reduce((s, it) => s + (it.preco * it.quantidade), 0)
        : 0;

    const pedido = {
        itens,
        total
    };

    fetch(API_PEDIDOS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token   // ✅ token enviado!
        },
        body: JSON.stringify(pedido)
    })
    .then(res => {
        if (res.ok) {
            alert("Pedido enviado com sucesso!");
            localStorage.removeItem("carrinho");
            window.location.href = "pedidos.html";
        } else {
            alert("Erro ao enviar pedido.");
        }
    });
}