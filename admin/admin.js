//constantes
const usuarioLogado = document.querySelector("#usuario-logado");
const btnSair = document.querySelector(".btn-sair");
const btnSalvar = document.querySelector('#btn-cadastrar');
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
// abrir lista
function abrirLista() {
    const telaLista = document.querySelector(".lista-wrapper");
    const telaCadastro =document.querySelector("#cadastro-wrapper-cadastro");
    telaLista.style.display = "block";
    telaCadastro.style.display = "none";
}


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
    VerificarAdmin();
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
    const telaCadastro = document.querySelector("#cadastro-wrapper-cadastro");
    telaLista.style.display = "none";
    telaCadastro.style.display = "block";

}

// cadastrar usuario
async function cadastrarUsuario(event) {
    event.preventDefault();
    debugger;
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
        if(response.status == 400){
            alert("Email já cadastrado");
            return;
        }
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erro ao cadastrar usuario");
        }
        

        
         carregarLista();
         abrirLista();
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
    item.innerHTML = `<p>${usuario.nomeUsuario}</p> <p><abbr title="${usuario.email}">${usuario.email}</abbr></p> <button id="btn-editar"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>`;
    const btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
    btnExcluir.setAttribute("id", "btn-excluir");
    btnExcluir.addEventListener("click", () => {
        excluirUsuario(usuario);
        item.remove();
    });
    const btnEditar = item.querySelector("#btn-editar");
    btnEditar.addEventListener("click", () => {
        abrirModal(usuario);
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
    const lista = document.querySelector("#listaCadastros");
    lista.innerHTML = "";
    usuarios.forEach((usuario) => {
        if (usuario.admin == false) {
            adicionarNaLista(usuario);
        }
    });
}

// pesquisar usuario
pesquisar.addEventListener("keyup", async () => {
   
    let valor = pesquisar.value.toLowerCase();

    const response = await fetch(`${API_URL}/Usuarios`);
    if (!response.ok) {
        throw new Error("Erro ao carregar lista de usuarios");
    }

    const usuarios = await response.json();
    const lista = document.querySelector("#listaCadastros")
    lista.innerHTML = "";

    usuarios.filter((item) => item.nomeUsuario.toLowerCase().includes(valor) || item.email.toLowerCase().includes(valor))
        .forEach((item) => {
            if (item.admin == false) {
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

    btnconfirmarEdit.onclick = (event) => {
        event.preventDefault();
        editarUsuario(usuario);
        modal.style.display = "none";
        telaLista.style.display = "block";
    };
}

async function editarUsuario(user) {
  
    const usuario = formUsuarioEdit.value;
    const senha = formSenhaEdit.value;
    const email = formEmailEdit.value;
    const admin = radioAdminEdit.checked;

    const usuarioAtualizado = {
            id: user.id,
            nomeUsuario: usuario,
            email,
            senha,
            admin
        };

    try {
        const response = await fetch(`${API_URL}/Usuarios/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioAtualizado),
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar usuário: ${response.status}`);
        }

        carregarLista();
        
        alert("Usuário editado com sucesso!");
    } catch (error) {
        console.error("Erro ao editar usuário:", error);
        alert("Erro ao editar usuário. Tente novamente mais tarde.");
    }
}

function verificarLogado() {

    let status = JSON.parse(sessionStorage.getItem("status"));
    if (status == false || status == null) {
        window.location.replace("../index.html");
    }
}


async function VerificarAdmin() {

    const usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));

    try {
        const response = await fetch(`${API_URL}/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error("Erro ao carregar lista de Usuarios");
        }

        const usuarioAdmin = await response.json();

        if (usuarioAdmin.admin == false) {
            window.location.href = "../home/home.html";
        }
    } catch {
        console.error("Erro ao carregar lista:", error);
    }
}
