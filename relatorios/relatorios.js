
const usuarioLogado = document.querySelector("#usuario-logado");

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

function abrirTelaAdmin(){
    let usuario = usuarioLogado.innerHTML;
    const usuarioAdmin = JSON.parse(localStorage.getItem(usuario));
    if(usuarioAdmin[0].admin == true){
    window.location.href = "../admin/admin.html";
    }else{
        alert("Acesso negado!");
    }
}