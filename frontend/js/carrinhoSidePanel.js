// ======================================================
// ✅ carrinhoSidePanel.js
//     Lógica de exibição e controle do carrinho lateral
// ======================================================


// ✅ Atualiza a tabela lateral do carrinho
function atualizarTabelaCarrinho() {
    const tabelaBody = document.querySelector("#tabelaCarrinho tbody");
    if (!tabelaBody) return; // caso a página não tenha carrinho lateral

    tabelaBody.innerHTML = "";

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    for (let id in carrinho) {
        const item = carrinho[id];

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>
                ${item.item} - ${item.modelo}
            </td>
            <td>
                <button class="btn-carrinho btn-plus" onclick="incrementar(${id})">+</button>
                <span>${item.quantidade}</span>
                <button class="btn-carrinho btn-minus" onclick="diminuir(${id})">-</button>
                <button class="btn-carrinho btn-trash" onclick="removerItem(${id})">🗑</button>
            </td>
        `;

        tabelaBody.appendChild(linha);
    }
}



// ✅ Incrementar item
function incrementar(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
    carrinho[id].quantidade++;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}



// ✅ Diminuir item
function diminuir(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

    if (carrinho[id].quantidade > 1) {
        carrinho[id].quantidade--;
    } else {
        delete carrinho[id];
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}



// ✅ Remover item
function removerItem(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
    delete carrinho[id];
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}



// ✅ Ao carregar a página, sempre atualizar o carrinho lateral
document.addEventListener("DOMContentLoaded", () => {
    atualizarTabelaCarrinho();
});




// ============================================
// ✅ BOTÃO FINALIZAR DO SIDE PANEL (CATÁLOGOS)
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const btnFinalizarIndex = document.getElementById("btnFinalizar");

    if (btnFinalizarIndex) {
        btnFinalizarIndex.addEventListener("click", () => {
            // ✅ Independente de login, sempre vai para carrinho.html
            window.location.href = "carrinho.html";
        });
    }
})



// ==============================================
// ✅ BOTÃO CONTINUAR COMPRANDO (CATÁLOGOS)
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
    const btnContinuar = document.getElementById("btnContinuar");

    if (btnContinuar) {
        btnContinuar.addEventListener("click", () => {
            // ✅ Sempre retorna para a página principal (menu das 4 áreas)
            window.location.href = "index.html";
        });
    }
});





