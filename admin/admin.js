//constantes
const usuarioLogado = document.querySelector("#usuario-logado");
const btnSair = document.querySelector(".btn-sair");
const btnSalvar = document.querySelector('.btn-salvar');
const pesquisar = document.querySelector("#pesquisarId");
// campos do formulário
const formUsuario= document.querySelector('#usuario');
const formSenha = document.querySelector('#senha');
const formEmail= document.querySelector('#email');
const radioAdmin= document.querySelector('#ativo');
// compos formulario editar
const btnconfirmarEdit = document.querySelector("#btn-salvar-editar");
const formUsuarioEdit= document.querySelector('#iusuario');
const formSenhaEdit = document.querySelector('#isenha');
const formEmailEdit= document.querySelector('#iemail');
const radioAdminEdit= document.querySelector('#iativo');

// Botão que aciona cadastrar usuario
btnSalvar.addEventListener("click", (event) => {
   
    cadastrarUsuario(event);

})


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
function onLoad() {
    carregarUsuarioLogado();
    carregarLista()
    
}



// carregar o usuario logado
function carregarUsuarioLogado() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    usuarioLogado.innerHTML = usuario;
}


// sair do sistema
btnSair.addEventListener("click", function () {
    window.location.href = "../index.html";
});

// função para abrir a tela de cadastro
function abrirCadastro() {
    const telaLista = document.querySelector(".lista-wrapper");
    const telaCadastro = document.querySelector(".cadastro-wrapper");
    telaLista.style.display = "none";
    telaCadastro.style.display = "block";

}


function cadastrarUsuario(event) {
    let usuario = formUsuario.value;
    let senha = formSenha.value;
    let email = formEmail.value;
    let admin = radioAdmin.checked ? true : false;
    


    // Verifica se ha campos obrigatórios vazios
    if (usuario == ""  || senha == "" || email == "") {
        alert("Preencha todos os campos obrigatórios, Nome, Senha e Email");
        formUsuario.focus();
        formUsuario.style.border = "3px solid red";
        formEmail.style.border = "3px solid red";
        formSenha.style.border = "3px solid red";
        event.preventDefault();
        return;
    }

    const usuarios = [{
        usuario,
        senha,
        email,
        admin,

        colaboradores: [
                {
                        nome: "matheus",
                        email: "matheus@gmail.com",
                        ativo: true


                }
        ]

}
];

    localStorage.setItem(usuario , JSON.stringify(usuarios));
    alert("Usuario criado com sucesso!");

     adicionarNaLista(usuarios[0]);



}



// adicionar Colaborador na lista

function adicionarNaLista(usuario) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement('li');
    item.innerHTML = `<p>${usuario.usuario}</p> <p>${usuario.email}</p> <button id="btn-editar"><img src="../imagens/edit.png" alt="edit"></button>`;
    const btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = `X`;
    btnExcluir.setAttribute("id", "btn-excluir");
    btnExcluir.addEventListener("click", () => {
        excluirUsuario(usuario);
        item.remove();
    });
    const btnEditar = item.querySelector("#btn-editar");
    btnEditar.addEventListener("click", () => {
        abrirModal(usuario);
        btnconfirmarEdit.addEventListener("click",()=>{
            debugger;
            editarUsuario(usuario);
        
        })
    });

    item.appendChild(btnExcluir);
    lista.appendChild(item);

}

// carregar a lista de usuarios
function carregarLista() {

   for( let i = 0; i < localStorage.length; i++) {
         let key = localStorage.key(i);
         let usuario = JSON.parse(localStorage.getItem(key));
         if(usuario[0].usuario !== undefined  ) {
            if(usuario[0].admin == false) {

                adicionarNaLista(usuario[0]);
            }

         
         }

   }



}

// pesquisar colaborador
pesquisar.addEventListener("keyup", () => {


    
    let valor = pesquisar.value.toLowerCase();
    const lista = document.querySelector("#listaCadastros")
    lista.innerHTML = "";
    for(let i = 0 ; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let usuario = JSON.parse(localStorage.getItem(key))
        if(usuario[0].usuario !== undefined) {
        if(usuario[0].usuario.toLowerCase().includes(valor) || usuario[0].email.toLowerCase().includes(valor))
        adicionarNaLista(usuario[0])


    }


}});




// excluir colaborador
function excluirUsuario(usuario) {

    localStorage.removeItem(usuario.usuario);
}




// função para abrir modal  para editar usuario
function abrirModal(usuario) {
    const modal = document.querySelector("#cadastro-wrapper-editar");
    const telaLista = document.querySelector(".lista-wrapper");
   
   formUsuarioEdit.value = usuario.usuario;
    formSenhaEdit.value = usuario.senha;
   formEmailEdit.value = usuario.email;
    radioAdminEdit.checked = usuario.admin


    


    telaLista.style.display = "none";
    modal.style.display = "block";

}







// função para editar um usuario
function editarUsuario(user){
    let usuario = formUsuarioEdit.value;
    let senha = formSenhaEdit.value;
    let email = formEmailEdit.value;
    let admin = radioAdminEdit.checked ? true : false;
    
   
    const usuarios  = JSON.parse(localStorage.getItem(user.usuario));
    usuarios[0].usuario = usuario;
    usuarios[0].senha = senha;
    usuarios[0].email = email;
    usuarios[0].admin = admin;
    excluirUsuario(user);
    localStorage.setItem(usuario, JSON.stringify(usuarios));
    adicionarNaLista(usuarios[0]);
    alert("Usuario editado com sucesso!");



}