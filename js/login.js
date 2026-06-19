
const formularioLogin = document.getElementById('formLogin');
let listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

// a estrutura aqui é quase identica com a função de cadastro

function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarioEncontrado = listaClientes.find(cliente => {
        return cliente.email === email && cliente.senha === senha;
    });

    if (usuarioEncontrado) {
        localStorage.setItem('clienteLogado', JSON.stringify(usuarioEncontrado));
        if (usuarioEncontrado.id == "C000") {
            window.location.href = 'relatorios.html';
        } else {
            window.location.href = 'loja.html';
        }

    } else {
        alert('E-mail ou senha incorretos.');
        document.getElementById('senha').value = '';
    }
}

// monitora o botão de login para executar a função login()
formularioLogin.addEventListener('submit', login);


// criação do usuário admin padrão
function cadastrarAdminDefault() {
    let adminExiste = listaClientes.some(cliente => cliente.email === "admin@admin.com");
    if (!adminExiste) {
        const admin = {
            id: "C000",
            nome: "Admin",
            email: "admin@admin.com",
            senha: "admin",
            cpf: "000.000.000-00"
        };

        listaClientes.push(admin);
        localStorage.setItem('clientes', JSON.stringify(listaClientes));
    }
}
cadastrarAdminDefault();

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
let clienteLogado = JSON.parse(localStorage.getItem('clienteLogado')) || "";

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