const usuarioLogado = document.querySelector("#usuario-logado");
const pesquisar = document.querySelector("#pesquisarId");
const API_URL = "https://localhost:7222/api";
// abrir menu
function abrirMenu() {
    let nav = document.querySelector(".nav");
    let overflow = document.querySelector(".overflow");
    nav.style.display = "block";
    nav.style.left = "0";
    overflow.style.display = "block";
}

// fehar menu
function fecharMenu() {
    let nav = document.querySelector(".nav");
    let overflow = document.querySelector(".overflow");
    nav.style.left = "-400px";
    overflow.style.display = "none";
}


// carrega ao iniciar a tela
function onLoad() {
    verificarLogado();
    carregarTelaAdmin();
    carregarUsuarioLogado();
    carregarLista();
    carregarDashborde()
}




// carregar o usuario logado
function carregarUsuarioLogado() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    usuarioLogado.innerHTML = usuario;
}



// sair do sistema
const btnSair = document.querySelector(".btn-sair");


btnSair.addEventListener("click", function () {
    window.location.replace("../index.html");

});



// adicionar Colaborador na lista

function adicionarNaLista(colaborador) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement('li');
    item.innerHTML = `<p><abbr title="${colaborador.nome}">${colaborador.nome}</abbr></p>  <p><abbr title="${colaborador.email}">${colaborador.email}</abbr></p> <p class="pAtivo ${colaborador.ativo ? "ativo" : "inativo"}">${colaborador.ativo ? "Ativo" : "Inativo"}</p>`;

    lista.appendChild(item);

}

// carregar a lista de colaboradores
async function carregarLista() {
    const usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));
    try {
        const response = await fetch(`${API_URL}/Usuarios/${usuarioId}`);

        if (!response.ok) {
            throw new Error("Erro ao carregar lista de colaboradores");
        }

        const usuario = await response.json();
        const colaboradores = usuario.colaboradores;

        const lista = document.querySelector("#listaCadastros");
        lista.innerHTML = "";

        colaboradores.reverse().forEach((colaborador) => adicionarNaLista(colaborador));
    } catch (error) {
        console.error("Erro ao carregar lista:", error);
    }
}

// pesquisar colaborador

pesquisar.addEventListener("keyup", async () => {
    let valor = pesquisar.value.toLowerCase();
    const usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));

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

// dashborde

async function carregarDashborde() {
    let dashbordeTotal = document.querySelector("#dashboard-div1");
    let dashbordeAtivo = document.querySelector("#dashboard-div2");
    let dashbordeInativo = document.querySelector("#dashboard-div3");
    let usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));

    try {
        const response = await fetch(`${API_URL}/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error("Erro ao carregar lista de colaboradores");
        }
        const usuario = await response.json();
        const cadastros = usuario.colaboradores;
        let totalCadastro = cadastros.length
        let totalAtivo = cadastros.filter(item => item.ativo).length;
        let totalInativo = cadastros.filter(item => !item.ativo).length;

        dashbordeTotal.innerHTML = totalCadastro;
        dashbordeAtivo.innerHTML = totalAtivo;
        dashbordeInativo.innerHTML = totalInativo;

    } catch (error) {
        console.error("Erro ao carregar lista:", error);

    }
}




//Admin - abrir tela admin

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

// verificar se esta logado 

function verificarLogado() {
    let status = JSON.parse(sessionStorage.getItem("status"));
    if (status == false || status == null) {
        window.location.replace("../index.html");
    }
}