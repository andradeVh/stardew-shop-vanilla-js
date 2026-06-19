let clienteLogado = JSON.parse(localStorage.getItem('clienteLogado')) || "";

if (clienteLogado.id != "C000") {
    window.location.href = 'paginaDeErro.html';
}

const dataAtual = new Date();

    const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataAtual.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    document.getElementById('data-hora-emissao').textContent = `${dataFormatada} às ${horaFormatada}`;

   
let listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

// pegando os elementos do html
const corpoTabela = document.getElementById('corpo-tabela-clientes');
const inputPesquisa = document.getElementById('input-pesquisa');
const btnPesquisa = document.getElementById('btn-pesquisa');


function renderizarTabela(clientesParaMostrar) {
    // limpa a tabela (evita duplicação de dados)
    corpoTabela.innerHTML = '';

    // mostra uma mensagem se não encontrar o cliente
    if (clientesParaMostrar.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum cliente encontrado.</td></tr>';
        return;
    }

    // pra cada cliente na lista, cria uma linha <tr>
    clientesParaMostrar.forEach(cliente => {
        const linha = document.createElement('tr');
        
            linha.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.email}</td>
            <td>
                <button class="btn-acao btn-editar" data-id="${cliente.id}" title="Editar">✏️</button>
                <button class="btn-acao btn-deletar" data-id="${cliente.id}" title="Deletar">🗑️</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}
//editar clientes
function editarCliente(idProcurado) {
    // procura no index
    const index = listaClientes.findIndex(cliente => cliente.id === idProcurado);
    if (index === -1) return; 

    const clienteAtual = listaClientes[index];

    // pede os dados novos, se cancelar ação mantem o anterior
    const novoNome = prompt("Editar Nome:", clienteAtual.nome) || clienteAtual.nome;
    const novoCpf = prompt("Editar CPF:", clienteAtual.cpf) || clienteAtual.cpf;
    const novoEmail = prompt("Editar E-mail:", clienteAtual.email) || clienteAtual.email;

    // atualiza lista
    listaClientes[index].nome = novoNome;
    listaClientes[index].cpf = novoCpf;
    listaClientes[index].email = novoEmail;

    // salva no localstorage
    localStorage.setItem('clientes', JSON.stringify(listaClientes));

   //limpa barra de pesquisa
    document.getElementById('input-pesquisa').value = ''; 
    renderizarTabela(listaClientes);

    alert(`Dados do cliente ${idProcurado} atualizados com sucesso!`);
}

// excluir clientes
function deletarCliente(idProcurado) {
    // sisteminha de confirmação
    const confirmacao = confirm(`Tem certeza que deseja DELETAR o cliente ${idProcurado}? Esta ação não pode ser desfeita.`);

    // se clicar no ok a afirmação vira true, então o cliente é procurado na lista e dai deletado
    if (confirmacao) {
        
        const index = listaClientes.findIndex(cliente => cliente.id === idProcurado);
        
        if (index !== -1) {
            
            listaClientes.splice(index, 1);
            
            // salva a nova lista sem o cliente
            localStorage.setItem('clientes', JSON.stringify(listaClientes));
            
            document.getElementById('input-pesquisa').value = '';
            renderizarTabela(listaClientes);
            
            alert(`Cliente ${idProcurado} excluído com sucesso!`);
        }
    }
}


// função pesquisa
function pesquisarClientes() {
    // evita a busca ser sensivel a letra maiuscula                    
    const termo = inputPesquisa.value.toLowerCase();

    // filtro da lista
    const clientesFiltrados = listaClientes.filter(cliente => {
        return (
            cliente.nome.toLowerCase().includes(termo) ||
            cliente.id.toLowerCase().includes(termo) ||
            cliente.email.toLowerCase().includes(termo) ||
            cliente.cpf.includes(termo)
        );
    });

    // renderiza so com os clientes filtrados
    renderizarTabela(clientesFiltrados);
}

// função do botão de lupa
btnPesquisa.addEventListener('click', (event) => {
    event.preventDefault();
    pesquisarClientes();
});

// eventlistener botao de editar
   corpoTabela.addEventListener('click', function(event) {
    // se     oq foi clicado    tiver    classe btn-editar
    if (event.target.classList.contains('btn-editar')) {
        const idDoCliente = event.target.getAttribute('data-id');
        editarCliente(idDoCliente);
    }

     // se     oq foi clicado    tiver    classe btn-deletar   
    if (event.target.classList.contains('btn-deletar')) {
        const idDoCliente = event.target.getAttribute('data-id');
        deletarCliente(idDoCliente);
    }
        
    
});


renderizarTabela(listaClientes);



//relatorio de compras
// puxa a lista de pedidos do local storage
let listaPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];


const corpoTabelaCompras = document.getElementById('corpo-tabela-compras');
const inputPesquisaCompras = document.getElementById('input-pesquisa-compras'); 
const btnPesquisaCompras = document.getElementById('btn-pesquisa-compras'); 

// função de renderização da tabela
function renderizarTabelaCompras(comprasParaMostrar) {
    corpoTabelaCompras.innerHTML = '';

    if (comprasParaMostrar.length === 0) {
        corpoTabelaCompras.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhuma compra encontrada.</td></tr>';
        return;
    }

    comprasParaMostrar.forEach(pedido => {
        // procura na listaClientes quem é o dono do pedido
        const clienteEncontrado = listaClientes.find(cliente => cliente.id === pedido.idCliente);
        
        // se achar mostra o nome se não mostra o id
        const nomeDoCliente = clienteEncontrado ? clienteEncontrado.nome : `Cliente Excluído (${pedido.idCliente})`;

        // deixa o pedido todo em um texto só
        const produtosEmTexto = pedido.itens.map(item => `${item.nome} (${item.quantidade}x)`).join(', ');

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${pedido.id}</td>
            <td>${nomeDoCliente}</td>
            <td>${pedido.data}</td>
            <td>Ouros ${pedido.totalDoPedido.toFixed(2).replace('.', ',')}</td>
            <td>${produtosEmTexto}</td>
        `;
        corpoTabelaCompras.appendChild(linha);
    });
}

// pesquisa de compras
function pesquisarCompras() {
    const termo = inputPesquisaCompras.value.toLowerCase();

    const comprasFiltradas = listaPedidos.filter(pedido => {
        const clienteEncontrado = listaClientes.find(cliente => cliente.id === pedido.idCliente);
        const nomeDoCliente = clienteEncontrado ? clienteEncontrado.nome.toLowerCase() : pedido.idCliente.toLowerCase();

        // junta os nomes dos produtos para podermos pesquisar por eles
        const nomesProdutos = pedido.itens.map(item => item.nome.toLowerCase()).join(' ');

        return (
            pedido.id.toLowerCase().includes(termo) ||
            nomeDoCliente.includes(termo) ||
            pedido.data.includes(termo) ||
            pedido.totalDoPedido.toString().includes(termo) ||
            nomesProdutos.includes(termo)
        );
    });

    renderizarTabelaCompras(comprasFiltradas);
}

// eventos de pesquisa 
if (btnPesquisaCompras && inputPesquisaCompras) {
    btnPesquisaCompras.addEventListener('click', (event) => {
        event.preventDefault();
        pesquisarCompras();
    });

    inputPesquisaCompras.addEventListener('input', pesquisarCompras);
}

if (corpoTabelaCompras) {
    renderizarTabelaCompras(listaPedidos);
}