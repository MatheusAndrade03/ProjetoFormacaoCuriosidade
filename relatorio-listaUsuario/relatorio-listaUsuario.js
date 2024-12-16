// constantes
const btnSair = document.querySelector(".btn-sair");
const btnImprimir = document.querySelector(".btn-imprimir");
const usuarioLogado = document.querySelector("#usuario-logado");
const pesquisar = document.querySelector("#pesquisarId");
const API_URL = "https://localhost:7222/api";



// abrir menu
function abrirMenu(){
    let nav = document.querySelector(".nav");
    let overflow= document.querySelector(  ".overflow");
    nav.style.display = "block";
    nav.style.left = "0";
    overflow.style.display = "block";

}

// fehar menu
function fecharMenu(){
    let nav = document.querySelector(".nav");
    let overflow= document.querySelector(  ".overflow");
    nav.style.left = "-400px";
    overflow.style.display = "none";
}




// carrega ao iniciar a tela
function onLoad(){
    verificarLogado();
    carregarTelaAdmin();
    carregarUsuarioLogado();
    carregarLista()
}




// carregar o usuario logado
function carregarUsuarioLogado(){
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    usuarioLogado.innerHTML = usuario;
}





// Função para sair da página e voltar a tela de login
btnSair.addEventListener("click", function(){
    window.location.replace ( "../index.html");
});
// Função para imprimir a página atual
btnImprimir.addEventListener("click", function(){
    window.print();
});



// adicionar Colaborador na lista

function adicionarNaLista(colaborador) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement('li');
    item.innerHTML = `<p><abbr title="${colaborador.nome}">${colaborador.nome}</abbr></p> <p><abbr title="${colaborador.email}">${colaborador.email}</abbr></p> <p class="pAtivo ${colaborador.ativo?"ativo":"inativo"}">${colaborador.ativo?"ativo":"inativo"}</p>`;
    lista.appendChild(item);

}


// carregar a lista de colaboradores
async function carregarLista() {
    const usuarioId= JSON.parse(localStorage.getItem("UsuarioId"));
    try {
        const response = await fetch(`${API_URL}/Usuarios/${usuarioId}`);

        if (!response.ok) {
            throw new Error("Erro ao carregar lista de colaboradores");
        }

        const usuario = await response.json();
        const colaboradores = usuario.colaboradores;
        
        const lista = document.querySelector("#listaCadastros");
        lista.innerHTML = "";

        colaboradores.forEach((colaborador) => adicionarNaLista(colaborador));
    } catch (error) {
        console.error("Erro ao carregar lista:", error);
    }
}

// pesquisar colaborador

pesquisar.addEventListener("keyup", async () => {
    let valor = pesquisar.value.toLowerCase();
    const usuarioId= JSON.parse(localStorage.getItem("UsuarioId"));

    try {
        const response = await fetch(`${API_URL}/Usuarios/${usuarioId}`);

        if (!response.ok) {
            throw new Error("Erro ao carregar colaboradores para pesquisa");
        }

        const Usuario = await response.json();
        const colaboradores = Usuario.colaboradores;
        const lista = document.querySelector("#listaCadastros");
        lista.innerHTML = "";

        colaboradores
            .filter((item) => item.nome.toLowerCase().includes(valor) || item.email.toLowerCase().includes(valor))
            .forEach((item) => adicionarNaLista(item));
    } catch (error) {
        console.error("Erro na pesquisa:", error);
    }
});


//Admin - Cadastro de usuarios


async function abrirTelaAdmin() {

    const usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));

    try {
        const response = await fetch(`${API_URL}/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error("Erro ao carregar lista de Usuarios");

        }
        const usuarioAdmin = await response.json();



        if (usuarioAdmin.admin == true) {
            window.location.href = "../admin/admin.html";
        } else {
            alert("Acesso negado!");
        }


    } catch {

        console.error("Erro ao carregar lista:", error);


    }


}
// verifica se esta logado
function verificarLogado() {

    let status = JSON.parse(sessionStorage.getItem("status"));
    if (status == false || status == null) {
        window.location.replace("../index.html");
    }

}
// carregar tela admin
async function carregarTelaAdmin() {
    const liAdmin = document.querySelector(".li-admin");
    const usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));

    try {
        const response = await fetch(`${API_URL}/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error("Erro ao carregar lista de Usuarios");

        }
        const usuarioAdmin = await response.json();



        if (usuarioAdmin.admin == true) {
            liAdmin.style.display = "flex";
            
        } else {
            liAdmin.style.display = "none";
        }


    } catch {

        console.error("Erro ao carregar lista:", error);


    }


}
