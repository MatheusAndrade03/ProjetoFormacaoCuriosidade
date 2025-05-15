const btnEntrar = document.querySelector("#botaoEntrar");
const email = document.querySelector('#iLogin');
const senha = document.querySelector('#iSenha');

// Dados iniciais
const usuariosIniciais = [
    {
        nomeUsuario: "luciano",
        senha: "admin",
        email: "admin@gmail.com",
        admin: true
    },
    {
        nomeUsuario: "matheus",
        senha: "matheus123",
        email: "matheus@gmail.com",
        admin: false
    }
];
// Ao carregar a página
async function onLoad() {
    let status = false;
    sessionStorage.setItem('status', JSON.stringify(status));
    try {
        const response = await fetch('https://localhost:7222/api/Usuarios');
        if (!response.ok) throw new Error('Erro ao acessar API de usuários');
        const usuarios = await response.json();

        for (const usuarioInicial of usuariosIniciais) {
            const usuarioExiste = usuarios.some(user => user.email === usuarioInicial.email);
            if (!usuarioExiste) {
                await criarUsuario(usuarioInicial);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar os dados iniciais:', error);
    }
}
// Função para criar um novo usuário no banco de dados
async function criarUsuario(usuario) {
    try {
        const response = await fetch('https://localhost:7222/api/Usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar usuário no banco de dados');
        }
    } catch (error) {
        console.error(`Erro ao criar o usuário ${usuario.usuario}:`, error);
    }
}

// Botão entrar ação
btnEntrar.addEventListener("click", (event) => {
    event.preventDefault();
    entrar();
});

// Função para entrar no sistema
async function entrar() {
    if (validarCampos()) {
        try {
            //const usuarioValido = await validarLoginESenha();
            let token = await verificarLoginByToken();
            if (token) {
                alert('Login bem-sucedido!');
                const decodedToken = jwt_decode(token);
                let nomeUsuario = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                let userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                const usuario = { nomeUsuario, role, userId }
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario.nomeUsuario));
                localStorage.setItem('UsuarioId', JSON.stringify(usuario.userId));
                let status = true;
                sessionStorage.setItem('status', JSON.stringify(status));
                localStorage.setItem('horaLogin', JSON.stringify(horaAtual()));
                localStorage.setItem('horaLimite', JSON.stringify(horaAtual() + 100));
                window.location.href = 'home/home.html';
            } else {
                alert('Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro ao validar login:', error);
            alert('Erro ao conectar ao servidor.');
        }
    } else {
        alert('Erro ao entrar no sistema.');
    }
}
// Função para validar campos antes de entrar
function validarCampos() {
    const emailValor = email.value.trim();
    const senhaValor = senha.value.trim();
    if (!emailValor || !senhaValor) {
        alert('Email e senha não podem estar vazios.');
        return false;
    }
    if (!emailValor.includes('@') || !emailValor.endsWith('.com')) {
        alert('Email inválido. Certifique-se de que contém "@" e termina com ".com".');
        return false;
    }
    return true;
}

// Função para validar login e senha
async function validarLoginESenha() {
    const emailValor = email.value.trim();
    const senhaValor = senha.value.trim();
    try {
        const response = await fetch('https://localhost:7222/api/Usuarios');
        if (!response.ok) throw new Error('Erro ao acessar API de usuários');

        const usuarios = await response.json();
        const usuario = usuarios.find(user => user.email === emailValor && user.senha === senhaValor);

        return usuario || false;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return false;
    }
}

async function verificarLoginByToken() {
    const emailValor = email.value.trim();
    const senhaValor = senha.value.trim();
    const login = { senha: senhaValor, email: emailValor };

    try {
        const response = await fetch(`https://localhost:7222/api/Authentication/login`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login)

        });
        if (!response.ok) {
            throw new Error('Erro ao acessar API de usuários');
        } else {
            const tokenResponse = await response.json();
            const token = tokenResponse.token;
            return token || false;
        }

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return false;
    }
}

function horaAtual() {
    let data = new Date();
    let hora = data.getHours();
    hora = hora * 60;
    let min = data.getMinutes();
    let horaTotal = hora + min;
    return horaTotal;
}

