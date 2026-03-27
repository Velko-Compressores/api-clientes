# 🛒 Sistema CE3 Loja Modular (Frontend + Backend Seguro)

Este projeto é um sistema completo de catálogo e pedidos com múltiplas páginas, carrinho persistente, autenticação segura com JWT, senhas criptografadas com bcrypt e backend Node.js com Express e SQLite.

✨ **Frontend completo**  
🔒 **Backend seguro**  
🧱 **Arquitetura modular**  
🛍️ **4 catálogos independentes**  
🛒 **Carrinho sincronizado entre páginas**  
✅ **Pedidos registrados no banco**  

---

## ✅ Índice

- [Visão Geral](#tecnologias
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Requisitoso Backend
- #instalação-frontend
- [Segurança Implementadae Pastas](#estrutura-de-pastas)
- [Rotas da API](#rotas-da-api)
- [Fluxo do Sistema](#fluxo-do-sistema)
- [Como Usar](#como-usaravegação entre 4 páginas de produtos:
  - **C3-4FES-4FC**
  - **C3-4EES-4EC**
  - **C3-4DES-4DC**
  - **C3-4CES-4CC**
- Cada página possui catálogo próprio
- Carrinho sincronizado entre páginas via LocalStorage
- Finalização de pedidos com autenticação JWT
- Senhas armazenadas com criptografia (bcrypt)
- Login seguro
- Visualização dos pedidos realizados pelo usuário autenticado
- Backend com rotas protegidas



---

## ✅ Tecnologias

### **Frontend**
- HTML5
- CSS3
- JavaScript (modular)
- LocalStorage

### **Backend**
- Node.js
- Express
- SQLite3
- Bcrypt.js
- JsonWebToken (JWT)
- CORS seguro

---

## ✅ Arquitetura do Sistema

Frontend (public pages)
↓ AJAX (fetch)
Backend (Node.js + Express)
↓ SQL
SQLite Database

---

## ✅ Requisitos

- Node.js 18+
- NPM
- SQLite3
- Navegador moderno

---

## ✅ Instalação Backend

```bash
cd backend
npm install
npm start
```
 API iniciará em:
http://localhost:3000

✅ Instalação Frontend
Basta abrir o arquivo:
index.html

Ou rodar um servidor simples:
Shellnpx serveMostrar mais linhas

✅ Segurança Implementada
✔ Senhas criptografadas com bcrypt
✔ Login seguro com comparação de hash
✔ JWT para autenticação real
✔ Middleware auth protegendo rotas
✔ POST /pedidos exige token
✔ CORS restrito
✔ Nenhuma senha retorna ao frontend
✔ Validação de dados do pedido
✔ Email do pedido vem do token, não do payload
✔ Evita pedidos falsificados

✅ Estrutura de Pastas

``` bash
/backend
   server.js
   database.js
   clientes.db
   /middlewares
      auth.js
   /routes
      clientes.js
      login.js
      pedidos.js

/frontend
   index.html
   C3-4FES-4FC.html
   C3-4EES-4EC.html
   C3-4DES-4DC.html
   C3-4CES-4CC.html
   carrinho.html
   pedidos.html
   /css
      style.css
   /js
      global.js
      carrinhoSidePanel.js
      carrinho.js
      pedidos.js
      login.js
      cadastro.js
      catalogo4FES.js
      catalogo4EES.js
      catalogo4DES.js
      catalogo4CES.js
```


# ✅ Rotas da API
📌 POST /clientes
Cria usuário com senha criptografada.
📌 POST /login
Retorna:

token JWT
dados do usuário

📌 POST /pedidos (protegida)
Requer:

Header: Authorization: TOKEN
JSON:
```
Shell{  "itens": [...],  "total": 123.45}Mostrar mais linhas
📌 GET /pedidos
Lista pedidos com itens decodificados.
```
# ✅ Fluxo do Sistema

Usuário acessa index.html
Escolhe uma página de catálogo
Adiciona itens → salvos em LocalStorage
Lateral direita mostra o carrinho
Ao clicar "Finalizar Pedido" → vai para carrinho.html
Lá visualiza itens com descrição, modelo e preço (se logado)
Conclui pedido → enviado como JSON para API
Usuário pode ver pedidos em pedidos.html


# ✅ Como Usar

✅ Cadastro  
Acesse /cadastro.html → Cria conta com bcrypt  
✅ Login  
Acesse /login.html → Recebe token JWT  
✅ Comprar  
Entre em qualquer página de catálogo
Adicione itens
Finalize pedido

✅ Histórico
Acesse /pedidos.html para ver seus pedidos

✅ Futuras Melhorias  
- Painel administrativo
- Refresh Token (JWT)
- Sistema de estoque
- Suporte a imagens de produtos
- Logs de auditoria
- Migração para PostgreSQL


