const formularioCadastro = document.getElementById('formCadastro');
let clienteLogado = JSON.parse(localStorage.getItem('clienteLogado')) || "";
let listaClientes = JSON.parse(localStorage.getItem('clientes')) || []; // recupera a lista de clientes do localStorage ou inicia como um array vazio


// logica para cadastrar um novo cliente, armazenar no localStorage e exibir uma mensagem de sucesso. Foi mais fácil do que pensei kk
function cadastrar(event) {
    let proximoNumero;
    if (listaClientes.length === 0) {
        proximoNumero = 1;
    } else {
        proximoNumero = listaClientes[listaClientes.length - 1].id.slice(1); // pega o numero do ultimo id cadastrado, ignorando a letra "C" no começo
        proximoNumero = parseInt(proximoNumero) + 1; // transforma em numero inteiro e incrementa para o próximo id
    }
    // problema: se um cliente for deletado, o proximo id vai ser o mesmo do cliente deletado, mas como o id é só um identificador e não tem relação com a quantidade de clientes, 
    // isso não causa nenhum problema real. Se quiser evitar isso, poderia usar um contador separado no localStorage para gerar os ids, mas como foi assim que entreguei o projeto, decidi não alterar.

    event.preventDefault();

    const novoCliente = {
        id: `C${proximoNumero.toString().padStart(3, '0')}`, // gera um ID no formato C001, C002, etc. Poderia tambem usar ifs para verificar o ultimo id e incrementar, ou usar metodo .slice(-3), mas achei mais simples assim
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value
    };

    if (listaClientes.some(cliente => cliente.email === novoCliente.email)) {
        alert('Este e-mail já está cadastrado. Por favor, use outro e-mail ou faça login.');
        return;
    }

    if (novoCliente.cpf.length !== 11) {
        alert('O CPF deve ter 11 dígitos.');
        return;
    }

    if (listaClientes.some(cliente => cliente.cpf === novoCliente.cpf)) {
        alert('Este CPF já está cadastrado. Por favor, use outro CPF ou faça login.');
        return;
    }


    listaClientes.push(novoCliente);
    localStorage.setItem('clientes', JSON.stringify(listaClientes));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'
    formularioCadastro.reset();
}

// monitora o botão de cadastro para executar a função cadastrar()
if (clienteLogado) {
    formularioCadastro.addEventListener('submit', alterarDados);
} else {
    formularioCadastro.addEventListener('submit', cadastrar);
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

if (clienteLogado) {
    document.getElementById('nome').value = clienteLogado.nome;
    document.getElementById('email').value = clienteLogado.email;
    document.getElementById('senha').value = clienteLogado.senha;
    document.getElementById('cpf').value = clienteLogado.cpf;
    document.getElementById('btn-cadastrar').textContent = "Salvar Alterações";
    document.querySelector('#formCadastro h2').textContent = "Alterar Dados";
}

function alterarDados(event) {
    event.preventDefault();


    const alterarDados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value
    };

    if (listaClientes.some(cliente => cliente.email === alterarDados.email && cliente.id !== clienteLogado.id)) {
        alert('Este e-mail já está cadastrado. Por favor, use outro e-mail ou faça login.');
        return;
    }

    if (listaClientes.some(cliente => cliente.cpf === alterarDados.cpf && cliente.id !== clienteLogado.id)) {
        alert('Este CPF já está cadastrado. Por favor, use outro CPF ou faça login.');
        return;
    }

    if (alterarDados.cpf.length !== 11) {
        alert('O CPF deve ter 11 dígitos.');
        return;
    }

    clienteLogado.nome = alterarDados.nome;
    clienteLogado.email = alterarDados.email;
    clienteLogado.senha = alterarDados.senha;
    clienteLogado.cpf = alterarDados.cpf;

    const index = listaClientes.findIndex(cliente => cliente.id === clienteLogado.id);
    const clienteAtual = listaClientes[index];

    listaClientes[index].nome = clienteLogado.nome;
    listaClientes[index].email = clienteLogado.email;
    listaClientes[index].senha = clienteLogado.senha;
    listaClientes[index].cpf = clienteLogado.cpf;

    localStorage.setItem('clientes', JSON.stringify(listaClientes));
    localStorage.setItem('clienteLogado', JSON.stringify(clienteLogado));

    alert('Dados atualizados com sucesso!');
    window.location.href = 'loja.html'
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
}