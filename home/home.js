const usuarioLogado = document.querySelector("#usuario-logado");
const pesquisar =document.querySelector("#pesquisarId");

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
    carregarLista();
    carregarDashborde()
}




// carregar o usuario logado
function carregarUsuarioLogado(){
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    usuarioLogado.innerHTML = usuario;
}



// sair do sistema
const btnSair = document.querySelector(".btn-sair");


btnSair.addEventListener("click", function(){
    window.location.href = "../index.html";
});



// adicionar Colaborador na lista

function adicionarNaLista(colaborador) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement('li');
    item.innerHTML = `<p><abbr title="${colaborador.nome}">${colaborador.nome}</abbr></p>  <p><abbr title="${colaborador.email}">${colaborador.email}</abbr></p> <p class="pAtivo ${colaborador.ativo?"ativo":"inativo"}">${colaborador.ativo?"ativo":"inativo"}</p>`;
  
    lista.appendChild(item);

}

// carregar a lista de colaboradores
function carregarLista() {
    let usuario = usuarioLogado.innerHTML;
    let cadastros= JSON.parse(localStorage.getItem(usuario)) || [];
        
    cadastros[0].colaboradores.reverse().forEach(item=> adicionarNaLista(item));





}
// pesquisar colaborador

pesquisar.addEventListener("keyup", ()=>{

    
    let usuario = usuarioLogado.innerHTML;
    let cadastros= JSON.parse(localStorage.getItem(usuario)) || [];
    let valor = pesquisar.value.toLowerCase(); 
    const lista = document.querySelector("#listaCadastros")
    lista.innerHTML = "";
    cadastros[0].colaboradores.forEach(item=>{
        if(item.nome.toLowerCase().includes(valor) || item.email.toLowerCase().includes(valor)){
            adicionarNaLista(item);
        }
    });

    
});

// dashborde

function carregarDashborde() {
    let dashbordeTotal = document.querySelector("#dashboard-div1");
    let dashbordeAtivo = document.querySelector( "#dashboard-div2");
    let dashbordeInativo = document.querySelector("#dashboard-div3");
    let usuario = usuarioLogado.innerHTML;

    let cadastros= JSON.parse(localStorage.getItem(usuario))||[];

   let totalCadastro=cadastros[0].colaboradores.length
    let totalAtivo = cadastros[0].colaboradores.filter(item=> item.ativo).length;
    let totalInativo = cadastros[0].colaboradores.filter(item=> !item.ativo).length;

    dashbordeTotal.innerHTML = totalCadastro;
    dashbordeAtivo.innerHTML = totalAtivo;
    dashbordeInativo.innerHTML = totalInativo;

}




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