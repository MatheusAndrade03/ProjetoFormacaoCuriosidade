//constantes
const usuarioLogado = document.querySelector("#usuario-logado");
const btnSair = document.querySelector(".btn-sair");
const btnSalvar = document.querySelector('.btn-salvar');
const pesquisar = document.querySelector("#pesquisarId");
// campos do formulário
const formUsuario = document.querySelector('#usuario');
const formSenha = document.querySelector('#senha');
const formEmail = document.querySelector('#email');
const radioAdmin = document.querySelector('#ativo');
// compos formulario editar
const btnconfirmarEdit = document.querySelector("#btn-salvar-editar");
const formUsuarioEdit = document.querySelector('#iusuario');
const formSenhaEdit = document.querySelector('#isenha');
const formEmailEdit = document.querySelector('#iemail');
const radioAdminEdit = document.querySelector('#iativo');
const API_URL = "https://localhost:7222/api";

// Botão que aciona cadastrar usuario
btnSalvar.addEventListener("click", (event) => {
    
    cadastrarUsuario(event);

})


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
    window.location.replace("../index.html");
});

// função para abrir a tela de cadastro
function abrirCadastro() {
    const telaLista = document.querySelector(".lista-wrapper");
    const telaCadastro = document.querySelector(".cadastro-wrapper");
    telaLista.style.display = "none";
    telaCadastro.style.display = "block";

}

// cadastrar usuario
async function cadastrarUsuario(event) {
    let usuario = formUsuario.value;
    let senha = formSenha.value;
    let email = formEmail.value;
    let admin = radioAdmin.checked ? true : false;



    // Verifica se ha campos obrigatórios vazios
    if (usuario == "" || senha == "" || email == "") {
        alert("Preencha todos os campos obrigatórios, Nome, Senha e Email");
        formUsuario.focus();
        formUsuario.style.border = "3px solid red";
        formEmail.style.border = "3px solid red";
        formSenha.style.border = "3px solid red";
        event.preventDefault();
        return;
    }

    const usuarios = {
        nomeUsuario: usuario,
        senha,
        email,
        admin

    };

    try {
        const response = await fetch(`${API_URL}/Usuarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarios),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erro ao cadastrar usuario");
        }

        carregarLista();
        formUsuario.value = "";
        formSenha.value = "";
        formEmail.value = "";
        radioAdmin.checked = false;

    } catch (error) {
        console.error("erro ao cadastrar", error);
    }

}

// adicionar Colaborador na lista

function adicionarNaLista(usuario) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement('li');
    item.innerHTML = `<p>${usuario.nomeUsuario}</p> <p><abbr title="${usuario.email}">${usuario.email}</abbr></p> <button id="btn-editar"><img src="../imagens/edit.png" alt="edit"></button>`;
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
        btnconfirmarEdit.addEventListener("click", () => {
            debugger;
            editarUsuario(usuario);

        })
    });

    item.appendChild(btnExcluir);
    lista.appendChild(item);

}

// carregar a lista de usuarios
async function carregarLista() {

    const response = await fetch(`${API_URL}/Usuarios`);
    if (!response.ok) {
        throw new Error("Erro ao carregar lista de usuarios");
    }
    const usuarios = await response.json();


    usuarios.forEach((usuario) => {
        if (usuario.admin == false) {
            adicionarNaLista(usuario);
        }
    });







}

// pesquisar usuario
 pesquisar.addEventListener("keyup", async () => {
    debugger;


    let valor = pesquisar.value.toLowerCase();

    const response = await fetch(`${API_URL}/Usuarios`);
    if (!response.ok) {
        throw new Error("Erro ao carregar lista de usuarios");
    }

    const usuarios = await response.json();
    const lista = document.querySelector("#listaCadastros")
    lista.innerHTML = "";


   
    usuarios.filter((item) => item.nomeUsuario.toLowerCase().includes(valor) || item.email.toLowerCase().includes(valor))
    .forEach((item) =>{
        if(item.admin==false){
         adicionarNaLista(item)
        }
        
        });

   



});




// excluir usuario
function excluirUsuario(usuario) {
        try {
            const response = fetch(`${API_URL}/Usuarios/${usuario.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }


                });
            if (!response.ok) {
                throw new Error("Erro ao excluir usuario");
            }
        } catch (error) {
            console.error("Erro ao excluir usuario", error);
        }
    }




// função para abrir modal  para editar usuario
function abrirModal(usuario) {
        const modal = document.querySelector("#cadastro-wrapper-editar");
        const telaLista = document.querySelector(".lista-wrapper");

        formUsuarioEdit.value = usuario.nomeUsuario;
        formSenhaEdit.value = usuario.senha;
        formEmailEdit.value = usuario.email;
        radioAdminEdit.checked = usuario.admin





        telaLista.style.display = "none";
        modal.style.display = "block";

    }







    async function editarUsuario(user) {
        try {
            // Recupera os valores dos campos de formulário
            const usuario = formUsuarioEdit.value;
            const senha = formSenhaEdit.value;
            const email = formEmailEdit.value;
            const admin = radioAdminEdit.checked;
    
            // Monta o objeto atualizado do usuário
            const usuarioAtualizado = {
                id: user.id,
                usuario,
                senha,
                email,
                admin
            };
    
            // Envia uma requisição PUT para atualizar o usuário no servidor
            const response = await fetch(`https://localhost:7222/api/Usuarios/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioAtualizado),
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao atualizar usuário: ${response.status}`);
            }
    
          
    
            // Atualiza a interface do usuário
            adicionarNaLista(usuarioAtualizado);
    
            alert("Usuário editado com sucesso!");
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            alert("Erro ao editar usuário. Tente novamente mais tarde.");
        }
    }
    