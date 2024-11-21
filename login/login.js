const btnEntrar = document.querySelector("#botaoEntrar");
const email = document.querySelector('#iLogin');
const senha = document.querySelector('#iSenha');

const luciano = [{
        usuario: "luciano",
        senha: 'admin',
        email: "admin@gmail.com",

        colaboradores: [
                {
                        nome: "Luciano",
                        email: "luciano@gmail.com",
                        ativo: true


                }
        ]

}
];
const matheus = [{
        usuario: "matheus",
        senha: 'matheus123',
        email: "matheus@gmail.com",

        colaboradores: [
                {
                        nome: "matheus",
                        email: "matheus@gmail.com",
                        ativo: true


                }
        ]

}
];

function onLoad() {
        localStorage.setItem('luciano', JSON.stringify(luciano));
        localStorage.setItem('matheus', JSON.stringify(matheus));
}


// botão entrar ação
btnEntrar.addEventListener("click", (event) => {
       
        entrar(event)

})

// entrar no sistema
function entrar(event) {

        if (validarCampos() == true) {
                
                if (validarLoginESenha() == true) {
                        window.alert('Login bem-sucedido!')
                        window.location.href = '../home/home.html';
                }else{
                        window.alert('Email ou senha incorretos.');
                        event.preventDefault(); // impede o envio do formulário
                }



        } else {
                window.alert('Erro ao entrar no sistema.');
                event.preventDefault(); // impede o envio do formulário
        }
}

// validar campos antes de entrar
function validarCampos() {

        let email1 = email.value;
        let senha1 = senha.value;

        if (email1 === '' || senha1 === '') {

                alert('Email e senha não podem estar vazios.');
                return false;
        }

        if (!email1.includes('@') || !email1.endsWith('.com')) {
                alert('Email inválido. Certifique-se de que contém "@" e termina com ".com".');
                return false;
        }

        return true;


}

// validar login e senha 

function validarLoginESenha() {
        let emailValor = email.value;
        let senhaValor = senha.value;

                if(localStorage.length>0){
        for (let i = 0; i < localStorage.length; i++) {
                let usuarios = JSON.parse(localStorage.getItem(localStorage.key(i))); // Obtém o objeto do usuário armazenado no localStorage
                let usuario=usuarios[0];
                console.log(usuario);
                if (usuario.email == emailValor && usuario.senha == senhaValor) {
                        console.log('Login bem-sucedido!');
                        localStorage.setItem('usuarioLogado', JSON.stringify(usuario.usuario));
                        return true;
                }
        }
        return false;
}

        return false;
}
