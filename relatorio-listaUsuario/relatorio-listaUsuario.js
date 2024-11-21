// constantes
const btnSair = document.querySelector(".btn-sair");
const btnImprimir = document.querySelector(".btn-imprimir");
const usuarioLogado = document.querySelector("#usuario-logado");
const pesquisar = document.querySelector("#pesquisarId");




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
    carregarLista()
}




// carregar o usuario logado
function carregarUsuarioLogado(){
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    usuarioLogado.innerHTML = usuario;
}





// Função para sair da página e voltar a tela de login
btnSair.addEventListener("click", function(){
    window.location.href = "../login/login.html";
});
// Função para imprimir a página atual
btnImprimir.addEventListener("click", function(){
    window.print();
});



// adicionar Colaborador na lista

function adicionarNaLista(colaborador) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement('li');
    item.innerHTML = `<p>${colaborador.nome}</p> <p>${colaborador.email}</p> <p>${colaborador.ativo?"ativo":"inativo"}</p>`;
    lista.appendChild(item);

}


// carregar a lista de colaboradores
function carregarLista() {
        let usuario = usuarioLogado.innerHTML;
    let cadastros= JSON.parse(localStorage.getItem(usuario)) || [];

    cadastros[0].colaboradores.forEach(item=> adicionarNaLista(item));





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