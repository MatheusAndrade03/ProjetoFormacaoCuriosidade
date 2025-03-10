// constantes
const usuarioLogado = document.querySelector("#usuario-logado");
const btnSair = document.querySelector(".btn-sair");
const btnSalvar = document.querySelector('.btn-salvar');
const pesquisar = document.querySelector("#pesquisarId");
const btnconfirmarEdit = document.querySelector("#btn-salvar-editar");

// campos do formulário
const radioAtivo = document.querySelector('#ativo');
const formNome = document.querySelector('#nome');
const formIdade = document.querySelector('#idade');
const formEmail = document.querySelector('#email');
const formEndereco = document.querySelector('#endereco');
const formOutrasInfo = document.querySelector('#outras-informacoes');
const formInteresses = document.querySelector('#interesses-area');
const formSentimentos = document.querySelector('#sentimentos-area');
const formValores = document.querySelector('#valores-area');

// campos editar 
const radioAtivoEdit = document.querySelector('#iativo');
const formNomeEdit = document.querySelector('#inome');
const formIdadeEdit = document.querySelector('#ididade');
const formEmailEdit = document.querySelector('#iemail');
const formEnderecoEdit = document.querySelector('#iendereco');
const formOutrasInfoEdit = document.querySelector('#ioutras-informacoes');
const formInteressesEdit = document.querySelector('#iinteresses-area');
const formSentimentosEdit = document.querySelector('#isentimentos-area');
const formValoresEdit = document.querySelector('#ivalores-area');

const API_URL = "https://localhost:7222/api";

// carrega ao iniciar a tela
function onLoad() {
    verificarLogado();
    verificarExpiracao();
    carregarTelaAdmin();
    carregarUsuarioLogado();
    carregarLista();
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



// Botão que aciona cadastrar
btnSalvar.addEventListener("click", (event) => {
    cadastrarColaborador(event);
});
btnconfirmarEdit.addEventListener("click", (event) => {
    event.preventDefault();
    editarColaborador(colaborador);
});
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
function abrirLista() {
    const telaLista = document.querySelector(".lista-wrapper");
    const telaCadastro = document.querySelector(".cadastro-wrapper");
    telaLista.style.display = "block";
    telaCadastro.style.display = "none";
}



// função para cadastrar um novo colaborador
async function cadastrarColaborador(event) {
    event.preventDefault();
    verificarExpiracao();
    let nome = formNome.value;
    let idade = formIdade.value;
    let email = formEmail.value;
    let endereco = formEndereco.value;
    let outrasInfo = formOutrasInfo.value;
    let interesses = formInteresses.value;
    let sentimentos = formSentimentos.value;
    let valores = formValores.value;
    let ativo = radioAtivo.checked;
    const usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));

    // Verifica se há campos obrigatórios vazios
    if (nome == "" || idade == "" || email == "" || endereco == "") {
        alert("Preencha todos os campos obrigatórios: Nome, Idade, Email e Endereço.");
        formNome.focus();
        formNome.style.border = "3px solid red";
        formIdade.style.border = "3px solid red";
        formEmail.style.border = "3px solid red";
        formEndereco.style.border = "3px solid red";
        event.preventDefault();
        return;
    }
    const colaborador = { nome, idade, email, endereco, outrasInfo, interesses, sentimentos, valores, ativo, usuarioId };
    try {
        const response = await fetch(`${API_URL}/Colaboradores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(colaborador),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erro ao cadastrar colaborador");
        }
        alert("Colaborador cadastrado com sucesso!");
        abrirLista();
        carregarLista();
        formNome.value = "";
        formIdade.value = "";
        formEmail.value = "";
        formEndereco.value = "";
        formOutrasInfo.value = "";
        formInteresses.value = "";
        formSentimentos.value = "";
        formValores.value = "";
        radioAtivo.checked = false;
        formNome.style.border = "none";
        formIdade.style.border = "none";
        formEmail.style.border = "none";
        formEndereco.style.border = "none";
    } catch (error) {
        console.error("Erro ao cadastrar colaborador:", error);
    }
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
        colaboradores.forEach((colaborador) => adicionarNaLista(colaborador));
    } catch (error) {
        console.error("Erro ao carregar lista:", error);
    }
}

// adicionar colaborador na lista
function adicionarNaLista(colaborador) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement("li");
    item.innerHTML = `<p><abbr title="${colaborador.nome}">${colaborador.nome}</abbr></p> 
                      <p><abbr title="${colaborador.email}">${colaborador.email}</abbr></p> 
                      <button id="btn-editar"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>`;

    const btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
    btnExcluir.setAttribute("id", "btn-excluir");
    btnExcluir.addEventListener("click", () => excluirColaborador(colaborador.id, item));

    const btnEditar = item.querySelector("#btn-editar");
    btnEditar.addEventListener("click", () => abrirModal(colaborador));

    item.appendChild(btnExcluir);
    lista.appendChild(item);
}

// excluir colaborador
async function excluirColaborador(id, item) {
    verificarExpiracao();
    try {
        const response = await fetch(`${API_URL}/Colaboradores/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Erro ao excluir colaborador");
        }
        item.remove();
    } catch (error) {
        console.error("Erro ao excluir colaborador:", error);
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

// Função para editar um colaborador
async function editarColaborador(colaborador) {
    verificarExpiracao();
    const nome = formNomeEdit.value;
    const idade = formIdadeEdit.value;
    const email = formEmailEdit.value;
    const endereco = formEnderecoEdit.value;
    const outrasInfo = formOutrasInfoEdit.value;
    const interesses = formInteressesEdit.value;
    const sentimentos = formSentimentosEdit.value;
    const valores = formValoresEdit.value;
    const ativo = radioAtivoEdit.checked;
    const id = colaborador.id;
    const usuarioId = JSON.parse(localStorage.getItem("UsuarioId"));
    const colaboradorAtualizado = { id, nome, idade, email, endereco, outrasInfo, interesses, sentimentos, valores, ativo, usuarioId };
    try {
        const response = await fetch(`https://localhost:7222/api/Colaboradores/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(colaboradorAtualizado),
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar colaborador: ${response.status}`);
        }
        carregarLista();
    } catch (error) {
        console.error("Erro ao atualizar colaborador:", error);
        alert("Erro ao atualizar colaborador. Tente novamente mais tarde.");
    }
}

// Abrir o modal e configurar o botão de salvar edição
function abrirModal(colaborador) {
    const modal = document.querySelector("#cadastro-wrapper-editar");
    const telaLista = document.querySelector(".lista-wrapper");
    radioAtivoEdit.checked = colaborador.ativo;
    formNomeEdit.value = colaborador.nome;
    formIdadeEdit.value = colaborador.idade;
    formEmailEdit.value = colaborador.email;
    formEnderecoEdit.value = colaborador.endereco;
    formOutrasInfoEdit.value = colaborador.outrasInfo;
    formInteressesEdit.value = colaborador.interesses;
    formSentimentosEdit.value = colaborador.sentimentos;
    formValoresEdit.value = colaborador.valores;

    telaLista.style.display = "none";
    modal.style.display = "block";

    btnconfirmarEdit.onclick = () => {
        editarColaborador(colaborador);
        modal.style.display = "none";
        telaLista.style.display = "block";
    };
}

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
        return;
    }
}

function verificarExpiracao() {

    let hora = new Date().getHours();
    let minuto = new Date().getMinutes();
    hora = hora * 60;
    let horaAtual = hora + minuto;
    let horaLimite = JSON.parse(localStorage.getItem("horaLimite"));
    let status = JSON.parse(sessionStorage.getItem("status"));
    if (horaAtual >= horaLimite) {
        status = false;
        sessionStorage.setItem('status', JSON.stringify(status));
    } else {
        status = true;
        sessionStorage.setItem('status', JSON.stringify(status));
    }
    verificarLogado();
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
