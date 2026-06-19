let clienteLogado = JSON.parse(localStorage.getItem('clienteLogado')) || "";
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

    // Carrossel
    const slide = document.querySelector('.carrossel-slide');
    const imagens = document.querySelectorAll('.carrossel-slide img');
    const btnPrev = document.querySelector('.carrossel-btn.prev');
    const btnNext = document.querySelector('.carrossel-btn.next');

    if (slide && imagens.length > 0) {
        let index = 0;
        const totalImagens = imagens.length;
        let intervalo;

        function atualizarCarrossel() {
            slide.style.transform = `translateX(${-index * 100}%)`;
        }

        function proximaImagem() {
            index++;
            if (index >= totalImagens) index = 0;
            atualizarCarrossel();
        }

        function imagemAnterior() {
            index--;
            if (index < 0) index = totalImagens - 1;
            atualizarCarrossel();
        }

        function iniciarAutoplay() {
            intervalo = setInterval(proximaImagem, 10000);
        }

        function resetarAutoplay() {
            clearInterval(intervalo);
            iniciarAutoplay();
        }

        btnNext.addEventListener('click', () => {
            proximaImagem();
            resetarAutoplay();
        });

        btnPrev.addEventListener('click', () => {
            imagemAnterior();
            resetarAutoplay();
        });

        iniciarAutoplay();
    }
});

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