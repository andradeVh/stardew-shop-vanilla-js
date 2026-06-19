// codigo para criar os cards dos produtos dinamicamente, usando a lista de produtos do arquivo loja-dados.js. Idêntico ao jogo da memória.

function criarProdutoCard(produto) {
    const card = document.createElement("article");
    card.classList.add("produto-card");

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h4>${produto.nome}</h4>
        <p>${produto.descricao}</p>
        <span> ${produto.preco.toFixed(2)} Ouros</span>
        <button class="btn-adicionar" data-id="${produto.id}">Adicionar ao Carrinho</button>
    `;
    return card;
}

const containerProdutos = document.getElementById("container-produtos");

function renderizarProdutos() {
    const produtosParaExibir = obterCatalogo();

    containerProdutos.innerHTML = "<h3>Produtos Disponíveis</h3>";

    produtosParaExibir.forEach(produto => {
        const novoCard = criarProdutoCard(produto);

        containerProdutos.appendChild(novoCard);
    });
}

renderizarProdutos();

let carrinho = [];


const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
const containerItens = document.getElementById('itens-carrinho');
const elementoTotal = document.getElementById('valor-total');
const contadorBadge = document.getElementById('contador-carrinho');


botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (event) => {

        const card = event.target.closest('.produto-card');


        const nomeProduto = card.querySelector('h4').innerText;
        const precoTexto = card.querySelector('span').innerText;
        const produtoId = card.querySelector('button').dataset.id;


        const precoNumero = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());


        let produtoEncontrado = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === produtoId);
        let quantidade = 1;

        if (produtoEncontrado) {
            produtoEncontrado.quantidade++;
        } else {
            carrinho.push({ nome: nomeProduto, preco: precoNumero, id: produtoId, quantidade: quantidade });
        }





        atualizarCarrinho();
    });
});
let totalDaCompra;
// itens no carrinho lateral
function atualizarCarrinho() {
    // limpa tudo que tem escrito no HTML do carrinho para desenhar de novo
    containerItens.innerHTML = '';
    totalDaCompra = 0;
    if (carrinho.length === 0) {

        containerItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    } else {

        carrinho.forEach((item, index) => {
            totalDaCompra += item.preco * item.quantidade;


            const divItem = document.createElement('div');
            divItem.style.display = 'flex';
            divItem.style.justifyContent = 'space-between';
            divItem.style.marginBottom = '8px';
            divItem.style.fontWeight = 'bold';
            divItem.style.color = '#3e2723';

            divItem.innerHTML = `
                    <span>${item.nome}</span>
                    <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    <span>Qtd: ${item.quantidade}</span>
                    <button onclick="removerDoCarrinho(${index})" style="color:#cc3333; background:none; border:none; cursor:pointer; font-weight:bold;">[X]</button>
                `;

            containerItens.appendChild(divItem);
        });
    }

    // Atualiza o valor total 
    elementoTotal.innerText = `Ouros ${totalDaCompra.toFixed(2).replace('.', ',')}`;


    if (contadorBadge) {
        contadorBadge.innerText = carrinho.length;
    }


}

const botaoFinalizarCompra = document.getElementById('btn-finalizar-compra');
let listaPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
let clienteLogado = JSON.parse(localStorage.getItem('clienteLogado')) || "";

function finalizarCompra() {
    let proximoNumero = listaPedidos.length + 1;
    if (clienteLogado) {
        let data = new Date;

        const novoPedido = {
            id: `CP${proximoNumero.toString().padStart(3, '0')}`, // gera um ID no formato CP001, CP002, etc. Poderia tambem usar ifs para verificar o ultimo id e incrementar, ou usar metodo .slice(-3), mas achei mais simples assim
            idCliente: clienteLogado.id,
            itens: carrinho,
            totalDoPedido: totalDaCompra,
            data: data.toLocaleDateString('pt-BR')
        };

        listaPedidos.push(novoPedido);

        localStorage.setItem('pedidos', JSON.stringify(listaPedidos));
        carrinho = [];
        atualizarCarrinho();
        alert("Você finalizou a sua compra com sucesso!")
    } else {
        alert("Você precisa estar logado para finalizar a compra!")
        window.location.href = 'login.html'
    }
}

// monitora o botão de compra para executar a função finalizarCompra()
botaoFinalizarCompra.addEventListener('click', finalizarCompra);

// Função para o botão de remover itens
function removerDoCarrinho(index) {
    item = carrinho[index];
    if (item.quantidade > 1) {
        item.quantidade--;
    } else {
        carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}

const botaoDeslogarConta = document.getElementById('btn-sair');

function deslogarConta() {
    localStorage.removeItem("clienteLogado");
}

// monitora o botão de sair para executar a função deslogarConta()
botaoDeslogarConta.addEventListener('click', deslogarConta);

document.addEventListener('DOMContentLoaded', () => {
    // Menu da Conta
    const btnConta = document.getElementById('btn-conta');
    const menuConta = document.getElementById('menu-conta');
    const loginCadastro = document.getElementById('login-cadastro')
    if (clienteLogado) {
        document.getElementById('nome-usuario').textContent = clienteLogado.nome;
        loginCadastro.classList.add('escondido');
    }

    if (btnConta && menuConta) {
        btnConta.addEventListener('click', (e) => {
            e.stopPropagation();
            menuConta.classList.toggle('escondido');
        });

        window.addEventListener('click', () => {
            menuConta.classList.add('escondido');
        });

        menuConta.addEventListener('click', (e) => e.stopPropagation());
    }
})

// checa se o usuário é admin, caso não, esconde o painel admin do html
const linkAdmin = document.getElementById('menu-admin');

if (clienteLogado.id != "C000") {
    linkAdmin.classList.add('escondido');
} else {
    linkAdmin.classList.remove('escondido');
}

const linkLogin = document.getElementById('tela-login');
const linkCadastro = document.getElementById('tela-cadastro');
const botaoSair = document.getElementById('btn-sair');

if (clienteLogado) {
    linkLogin.classList.add('escondido');
    linkCadastro.classList.add('escondido');
    botaoSair.classList.remove('escondido');
} else {
    linkLogin.classList.remove('escondido');
    linkCadastro.classList.remove('escondido');
    botaoSair.classList.add('escondido');

}

//pesquisa de produtos global (de qualquer pagina)
const btnPesquisaGlobal = document.getElementById('btn-pesquisa');
const inputPesquisaGlobal = document.getElementById('input-pesquisa');

function realizarBusca() {
    // pega o que o usuário digitou e limpa os espaços em branco nos cantos
    const termo = inputPesquisaGlobal.value.trim(); 
    
    // se digitou algo, redireciona para a loja com a palavra na URL
    if (termo !== "") {
        window.location.href = `loja.html?busca=${encodeURIComponent(termo)}`;
    }
}

// ativa a busca se os elementos existirem na página atual
if (btnPesquisaGlobal && inputPesquisaGlobal) {
    
    // botao da lupa
    btnPesquisaGlobal.addEventListener('click', (event) => {
        event.preventDefault(); // Evita recarregar a página atoa
        realizarBusca();
    });

    // enter no teclado
    inputPesquisaGlobal.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            realizarBusca();
        }
    });
}

function renderizarProdutos() {
    let produtosParaExibir = obterCatalogo(); //p filtrar

    // "olha" o URL e procura a palavra
    const parametrosURL = new URLSearchParams(window.location.search);
    const termoBusca = parametrosURL.get('busca');

    // se tiver uma busca na URL, aplica o filtro
    if (termoBusca) {
        const termoLimpo = termoBusca.toLowerCase();
        
        // filtra buscando tanto no nome quanto na descrição do produto
        produtosParaExibir = produtosParaExibir.filter(produto => 
            produto.nome.toLowerCase().includes(termoLimpo) || 
            produto.descricao.toLowerCase().includes(termoLimpo)
        );
        
        // coloca o título mostrando oq foi pesquisado e um botão para limpar a busca
        containerProdutos.innerHTML = `
            <h3>Resultados para: "${termoBusca}" 
                <a href="loja.html" style="font-size: 0.6em; margin-left: 15px; color: #cc3333; text-decoration: none; cursor: pointer;">[Limpar busca]</a>
            </h3>`;
    } else {
        // se não tiver busca, mostra o título normal
        containerProdutos.innerHTML = "<h3>Produtos Disponíveis</h3>";
    }

    // desenha os cards
    if (produtosParaExibir.length === 0) {
        containerProdutos.innerHTML += "<p style='text-align: center; margin-top: 20px;'>Nenhum produto encontrado com esse termo.</p>";
    } else {
        produtosParaExibir.forEach(produto => {
            const novoCard = criarProdutoCard(produto);
            containerProdutos.appendChild(novoCard);
        });
    }
}