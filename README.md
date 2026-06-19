# 🐟 Peixaria Baiacu - Loja Virtual

> Um e-commerce temático inspirado no universo de Stardew Valley, desenvolvido exclusivamente com tecnologias web nativas.

## Sobre o Projeto

Esse projeto fez parte da avaliação final da disciplina de Programação Front-End, do curso de ADS no Instituto Federal de Santa Catarina.

O sistema conta com catálogo, carrinho, finalização de compra e uma interface exclusiva para o administrador gerir clientes e relatórios simples de vendas.

[Link para o pdf do projeto](https://github.com/andradeVh/IFSC-ADS-REPO/tree/main/Semestre%202/Programa%C3%A7%C3%A3o%20Frontend%20I).

---
## Imagens

Home
![Screenshot da home](/mediaReadme/printIndex.png)
---
Loja
![Screenshot da loja](/mediaReadme/printLoja.png)
---
Responsividade
![Gif demonstrando a responsividade](/mediaReadme/responsividade.gif)
---
## Estrutura

### Área do Cliente
* **Cadastro e Autenticação:** Criação de conta com validação de dados e login de utilizador.
* **Menu Dinâmico:** Links de "Login/Cadastro" alternam automaticamente para o nome do utilizador logado e a opção "Sair".
* **Catálogo de Produtos:** Renderização dinâmica dos peixes através de JavaScript.
* **Carrinho de Compras:** Adicionar/remover itens, cálculo do total em "Ouros" em tempo real e atualização do contador de itens.
* **Simulação de Compra:** Validação que exige login ativo para finalizar o pedido.

### Área do Administrador (Dashboard)
* **Controle de Acesso:** Proteção de rota na página de relatórios (apenas utilizadores com ID `C000` conseguem aceder).
* **Gestão de Clientes:** Listagem total, sistema de pesquisa avançada por múltiplos campos e funcionalidade de edição de dados em tempo real.
* **Relatório de Compras:** Listagem detalhada de todos os pedidos efetuados, incluindo ID, ID do Cliente, Data, Valor Total e os itens adquiridos formatados.

---

## Tecnologias Utilizadas

Foi pedido que o projeto fosse construído do zero e não utilizasse bibliotecas ou frameworks externos:

* **HTML5:** Estruturação semântica da aplicação (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer_>`).
* **CSS3:** Estilização baseada na estética pixel-art do jogo, utilizando Flexbox e CSS Grid para garantir a responsividade (Desktop, Tablet e Smartphone).
* **JavaScript** Lógica de negócios, manipulação assíncrona do DOM, delegação de eventos e tratamento de arrays (`map`, `filter`, `forEach`, `findIndex`).
* **LocalStorage:** Utilizado como base de dados local para persistir as informações de clientes, sessões ativas e histórico de pedidos.

---

## Autores

O projeto exigia o trabalho em dupla usando versionamento de código através da ferramenta Git e o próprio GitHub.

* **Victor Hugo Andrade** - [andradeVh](https://github.com/andradeVh) :shipit:

* **Giovanna Regina** - [giovannaregina](https://github.com/giovannaregina)