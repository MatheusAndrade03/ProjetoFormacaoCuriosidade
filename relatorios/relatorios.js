
const usuarioLogado = document.querySelector("#usuario-logado");
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
}




// carregar o usuario logado
function carregarUsuarioLogado(){
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    usuarioLogado.innerHTML = usuario;
}






// sair do sistema
const btnSair = document.querySelector(".btn-sair");


btnSair.addEventListener("click", function(){
    window.location.replace ( "../index.html");
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
