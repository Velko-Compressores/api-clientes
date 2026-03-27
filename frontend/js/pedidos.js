const API_PEDIDOS = "http://localhost:3000/pedidos";

const usuarioEmail = localStorage.getItem("usuarioEmail");
const token = localStorage.getItem("token");
const lista = document.getElementById("pedidosLista");

if (!token) {
    lista.innerHTML = "<p>Você precisa estar logado para ver seus pedidos.</p>";
} else {
    carregarPedidos();
}

async function carregarPedidos() {
    const res = await fetch(API_PEDIDOS, {
        headers: {
            "Authorization": token
        }
    });

    const todosPedidos = await res.json();

    const pedidosUsuario = todosPedidos.filter(
        p => p.cliente_email === usuarioEmail
    );

    if (pedidosUsuario.length === 0) {
        lista.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>";
        return;
    }

    lista.innerHTML = "";

    pedidosUsuario.forEach(pedido => {
        const div = document.createElement("div");
        div.classList.add("pedido");

        let itensHTML = "";
        pedido.itens.forEach(item => {
            itensHTML += `
                <div class="item">
                    • ${item.item} — ${item.modelo}<br>
                    ${item.descricao}<br>
                    Quantidade: ${item.quantidade}<br>
                    Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}
                    <br><br>
                </div>
            `;
        });

        div.innerHTML = `
            <strong>===== Pedido #${pedido.id} =====</strong><br>
            <strong>Data:</strong> ${new Date(pedido.data).toLocaleString()}<br>
            <strong>Total:</strong> R$ ${pedido.total.toFixed(2)}<br><br>
            <strong>Itens:</strong><br><br>
            ${itensHTML}
        `;

        lista.appendChild(div);
    });
}
