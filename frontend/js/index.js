

// ==================================
// NAO FUNCIONA MAIS
// ==================================

// ==================================
// NAO FUNCIONA MAIS
// ==================================

// ==================================
// NAO FUNCIONA MAIS
// ==================================


// ==================================
// LISTA DE PRODUTOS
// ==================================
const produtos = [
    { id: 1, nome: "Produto A", preco: 19.99 },
    { id: 2, nome: "Produto B", preco: 29.99 },
    { id: 3, nome: "Produto C", preco: 39.99 },
    { id: 4, nome: "Produto D", preco: 49.99 }
];

const listaDiv = document.getElementById("listaProdutos");
const tabelaBody = document.querySelector("#tabelaCarrinho tbody");


// ==================================
// CARREGAR PRODUTOS NA TELA
// ==================================
function carregarProdutos() {
    if (!listaDiv) return;
    listaDiv.innerHTML = "";

    produtos.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("produto");
        card.innerHTML = `
            <strong>${prod.nome}</strong><br>
            <button class="add-btn" onclick="adicionarCarrinho(${prod.id})">
                Adicionar ao Carrinho
            </button>
        `;

        listaDiv.appendChild(card);
    });
}
carregarProdutos();


// ==================================
// ADICIONAR AO CARRINHO
// ==================================
function adicionarCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    // Corrigir carrinhos antigos (array)
    if (Array.isArray(carrinho)) {
        const novo = {};
        carrinho.forEach(item => novo[item] = (novo[item] || 0) + 1);
        carrinho = novo;
    }

    carrinho[id] = (carrinho[id] || 0) + 1;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}



// ==================================
// ATUALIZAR TABELA DO CARRINHO
// ==================================
function atualizarTabelaCarrinho() {
    if (!tabelaBody) return;

    tabelaBody.innerHTML = "";

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    // Corrigir carrinhos antigos salvos como array
    if (Array.isArray(carrinho)) {
        const novoCarrinho = {};
        carrinho.forEach(id => novoCarrinho[id] = (novoCarrinho[id] || 0) + 1);
        carrinho = novoCarrinho;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    for (let id in carrinho) {
        const prod = produtos.find(p => p.id == id);
        const qtd = carrinho[id];

        const linha = document.createElement("tr");


            linha.innerHTML = `
                <td>${prod.nome} - ${prod.pagina}</td>
                <td>
                    <button class="btn-carrinho btn-plus" onclick="incrementar(${id})">+</button>
                    <span>${qtd}</span>
                    <button class="btn-carrinho btn-minus" onclick="diminuir(${id})">-</button>
                    <button class="btn-carrinho btn-trash" onclick="removerItem(${id})">🗑</button>
                </td>
            `;


        tabelaBody.appendChild(linha);
    }
}

atualizarTabelaCarrinho();


// ==================================
// AÇÕES DO CARRINHO
// ==================================
function incrementar(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
    carrinho[id]++;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}

function diminuir(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    if (carrinho[id] > 1) {
        carrinho[id]--;
    } else {
        delete carrinho[id];
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}

function removerItem(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
    delete carrinho[id];
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}




// ==================================
// BOTÕES DO CARRINHO (INDEX.HTML)
// ==================================
const btnFinalizar = document.getElementById("btnFinalizar");
const btnContinuar = document.getElementById("btnContinuar");

// ✅ Botão Finalizar → SEMPRE vai para carrinho.html
if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
        window.location.href = "carrinho.html";
    });
}

// ✅ Botão Continuar → sobe para os produtos
if (btnContinuar) {
    btnContinuar.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
