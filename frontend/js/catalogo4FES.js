// Catálogo da página C3-4FES-4FC
const produtos = [
    { id: 101, item: "JOGO DE VEDACOES", modelo: "C3-4FES-4FC", descricao: "Jogo de vedações para motores - 4FC/4FES.", preco: 19.99 },
    { id: 102, item: "CJ ESTATOR/ROTOR", modelo: "C3-4FES-4FC", descricao: " Conjunto de Estator/Rotor - 3,5HP 220/380V 60Hz 03", preco: 29.99 },
    { id: 103, item: "CHAVETA ROTOR", modelo: "C3-4FES-4FC", descricao: "Chaveta rotor - A10 X 6 X 56 C3/CE3", preco: 39.99 },
    { id: 104, item: "CJ VIRABREQUIM", modelo: "C3-4FES-4FC", descricao: "Conjunto de Virabrequim - 4FC-3.2..4DC-5.2/4FES-3..4DES-5", preco: 49.99 }
];

const listaDiv = document.getElementById("listaProdutos");

function carregarCatalogo() {
    listaDiv.innerHTML = "";

    produtos.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("produto");

        card.innerHTML = `
            <strong>${prod.item}</strong><br>
            <em>${prod.modelo}</em><br>

            <button class="add-btn" onclick="adicionarCarrinhoCatalogo(${prod.id})">
                Adicionar ao Carrinho
            </button>
        `;

        listaDiv.appendChild(card);
    });
}

carregarCatalogo();


// ✅ Agora adicionar ao carrinho usa o formato unificado
function adicionarCarrinhoCatalogo(id) {
    const produto = produtos.find(p => p.id === id);
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    if (!carrinho[id]) {
        carrinho[id] = { ...produto, quantidade: 1 };
    } else {
        carrinho[id].quantidade++;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarTabelaCarrinho(); // ✅ Agora funciona via arquivo unificado

    alert("Produto adicionado ao carrinho!");
}