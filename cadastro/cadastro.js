//constantes
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

// Botão que aciona cadastrar
btnSalvar.addEventListener("click", (event) => {
    
    cadastrarColaborador(event);

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
// função para abrir modal  para editar colaborador
function abrirModal(colaborador) {
    const modal = document.querySelector("#cadastro-wrapper-editar");
    const telaLista = document.querySelector(".lista-wrapper");
    radioAtivoEdit.checked = colaborador.ativo;
    formNomeEdit.value = colaborador.nome;
    formIdadeEdit.value = colaborador.idade;
    formEmailEdit.value= colaborador.email;
    formEnderecoEdit.value = colaborador.endereco;
    formOutrasInfoEdit.value = colaborador.outrasInfo;
    formInteressesEdit.value = colaborador.interesses;
    formSentimentosEdit.value= colaborador.sentimentos;
    formValoresEdit.value = colaborador.valores;


    telaLista.style.display = "none";
    modal.style.display = "block";

}

// ..............................................................................
// função para cadastrar um novo colaborador

function cadastrarColaborador(event) {
    let nome = formNome.value;
    let idade = formIdade.value;
    let email = formEmail.value;
    let endereco = formEndereco.value;
    let outrasInfo = formOutrasInfo.value;
    let interesses = formInteresses.value;
    let sentimentos = formSentimentos.value;
    let valores = formValores.value;
    let ativo = radioAtivo.checked ? true : false;
    let id = gerarId();
    let usuarioLogad = usuarioLogado.innerHTML;


    // Verifica se ha campos obrigatórios vazios
    if (nome == "" || endereco == "" || idade == "" || email == "") {
        alert("Preencha todos os campos obrigatórios, Nome, Idade, Email e Endereço");
        formNome.focus();
        formNome.style.border = "3px solid red";
        formIdade.style.border = "3px solid red";
        formEmail.style.border = "3px solid red";
        formEndereco.style.border = "3px solid red";
        event.preventDefault();
        return;
    }

    const colaborador = { nome, idade, email, endereco, outrasInfo, interesses, sentimentos, valores, ativo, id };


    let usuarios = JSON.parse(localStorage.getItem(usuarioLogad)) || [];
    usuarios[0].colaboradores.push(colaborador);
    localStorage.setItem(usuarioLogad, JSON.stringify(usuarios));
    alert("Colaborador cadastrado com sucesso!");

    adicionarNaLista(colaborador);



}
// função para editar um colaborador
    function editarColaborador(colaborador){
        let nome = formNomeEdit.value;
        let idade = formIdadeEdit.value;
        let email = formEmailEdit.value;
        let endereco = formEnderecoEdit.value;
        let outrasInfo = formOutrasInfoEdit.value;
        let interesses = formInteressesEdit.value;
        let sentimentos = formSentimentosEdit.value;
        let valores = formValoresEdit.value;
        let ativo = radioAtivoEdit.checked ? true : false;
        let usuarioLogad = usuarioLogado.innerHTML;
    

        const colaboradorNovo = { nome, idade, email, endereco, outrasInfo, interesses, sentimentos, valores, ativo,id:colaborador.id };
        excluirColaborador(colaborador);
        let usuarios = JSON.parse(localStorage.getItem(usuarioLogad)) || [];
        usuarios[0].colaboradores.push(colaboradorNovo);
        localStorage.setItem(usuarioLogad, JSON.stringify(usuarios));
        adicionarNaLista(colaboradorNovo);

    }




// gera um id aleatório para o colaborador

function gerarId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// adicionar Colaborador na lista

function adicionarNaLista(colaborador) {
    const lista = document.querySelector("#listaCadastros");
    const item = document.createElement('li');
    item.innerHTML = `<p>${colaborador.nome}</p> <p>${colaborador.email}</p> <button id="btn-editar"><img src="../imagens/edit.png" alt="edit"></button>`;
    const btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = `X`;
    btnExcluir.setAttribute("id", "btn-excluir");
    btnExcluir.addEventListener("click", () => {
        excluirColaborador(colaborador);
        item.remove();
    });
    const btnEditar = item.querySelector("#btn-editar");
    btnEditar.addEventListener("click", () => {
        abrirModal(colaborador);
        btnconfirmarEdit.addEventListener("click",()=>{
            editarColaborador(colaborador);
        
        })
    });

    item.appendChild(btnExcluir);
    lista.appendChild(item);

}

// carregar a lista de colaboradores
function carregarLista() {
    let usuario = usuarioLogado.innerHTML;
    let cadastros = JSON.parse(localStorage.getItem(usuario)) || [];

    cadastros[0].colaboradores.forEach(item => adicionarNaLista(item));





}

// excluir colaborador
function excluirColaborador(colaborador) {
    let usuario = usuarioLogado.innerHTML;
    let cadastros = JSON.parse(localStorage.getItem(usuario)) || [];
    cadastros[0].colaboradores = cadastros[0].colaboradores.filter(item => item.id !== colaborador.id);
    localStorage.setItem(usuario, JSON.stringify(cadastros));


}


// pesquisar colaborador
pesquisar.addEventListener("keyup", () => {


    let usuario = usuarioLogado.innerHTML;
    let cadastros = JSON.parse(localStorage.getItem(usuario)) || [];
    let valor = pesquisar.value.toLowerCase();
    const lista = document.querySelector("#listaCadastros")
    lista.innerHTML = "";
    cadastros[0].colaboradores.forEach(item => {
        if (item.nome.toLowerCase().includes(valor) || item.email.toLowerCase().includes(valor)) {
            adicionarNaLista(item);
        }
    });


});