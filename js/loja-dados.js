const CATALOGO_PRODUTOS = [
    {
        id: "P001",
        nome: "Baiacu",
        descricao: "Infla quando ameaçado.",
        preco: 200.00,
        imagem: "imagens-peixes/baiacu1-removebg-preview.png"
    },
    {
        id: "P002",
        nome: "Achigã",
        descricao: "Um peixe popular que vive em lagos.",
        preco: 100.00,
        imagem: "imagens-peixes/achigã-removebg-preview.png"
    },
    {
        id: "P003",
        nome: "Lagosta",
        descricao: "Um crustáceo grande que vive no oceano. Possui uma grande cauda.",
        preco: 120.00,
        imagem: "imagens-peixes/lagosta-removebg-preview.png"
    },
    {
        id: "P004",
        nome: "Lula",
        descricao: "Uma criatura das profundezas do mar que pode ficar enorme.",
        preco: 80.00,
        imagem: "imagens-peixes/lula-removebg-preview.png"
    },
    {
        id: "P005",
        nome: "Lula da Meia Noite",
        descricao: "Um cidadão estranho e misterioso das profundezas do oceano.",
        preco: 100.00,
        imagem: "imagens-peixes/lulameianoite-removebg-preview.png"
    },
    {
        id: "P006",
        nome: "Peixe Carmim",
        descricao: "Vive nas profundezas do oceano, mas gosta de colocar seus ovos nas águas quentes de verão.",
        preco: 1500.00,
        imagem: "imagens-peixes/peixecarmim-removebg-preview.png"
    },
    {
        id: "P007",
        nome: "Caranguejo",
        descricao: "Um crustáceo marinho com duas puãs poderosas.",
        preco: 100.00,
        imagem: "imagens-peixes/caranguejo-removebg-preview.png"
    },
    {
        id: "P008",
        nome: "Anchova",
        descricao: "Um pequeno peixe prateado encontrado no oceano.",
        preco: 30.00,
        imagem: "imagens-peixes/anchova-removebg-preview.png"
    },
    {
        id: "P009",
        nome: "Achigã-pequeno",
        descricao: "Um peixe de água doce muito sensível à poluição.	",
        preco: 50.00,
        imagem: "imagens-peixes/achigãpequeno-removebg-preview.png"
    },
    {
        id: "P010",
        nome: "Camarão",
        descricao: "Um necrófago que se alimenta do fundo do oceano. Sua carne é muito apreciada.",
        preco: 60.00,
        imagem: "imagens-peixes/camarao-removebg-preview.png"
    }

];

// Função para que o arquivo loja.js consiga pegar essa lista
function obterCatalogo() {
    return CATALOGO_PRODUTOS;
}
