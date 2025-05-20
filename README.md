# Sistema de Gerenciamento de Usuários e Colaboradores

Este projeto foi desenvolvido como parte da disciplina **Oficina de Integração 2** (ES47C/IF66K) da UTFPR, com foco em integrar conhecimentos de Programação Web, Banco de Dados, POO, Arquitetura de Software e Testes.

## objetivo

O sistema permite o gerenciamento de colaboradores por usuários cadastrados. Cada usuário possui seus próprios colaboradores. Usuários com perfil de administrador podem também gerenciar outros usuários. O sistema faz parte de um contexto fictício do projeto de extensão .

---

## Funcionalidades

- ✅ Login de usuários com autenticação via **JWT**
- ✅ Criptografia de senhas com **Bcrypt**
- ✅ Cadastro, listagem, edição e exclusão de colaboradores
- ✅ Cadastro e edição de usuários (restrito a administradores)
- ✅ Proteção de rotas por tipo de usuário (admin / comum)
- ✅ imprimir listagem de colaboradores
- ✅ Responsividade para mobile

---

## 🔧⚗️ Tecnologias Utilizadas

### 🔹 Front-End
- HTML
- CSS
- JavaScript
- jwt-decode

### 🔹 Back-End
- C#
- ASP.NET (.NET)
- Entity Framework
- JWT
- Bcrypt

### 🔹 Banco de Dados
- MySQL

### 🔹 Segurança
- JWT para autenticação
- Bcrypt para senhas

### 🔹 Outros
- Git e GitHub para versionamento
- xUnit (ou outro framework) para testes automatizados

---

## 📐📐 Arquitetura do Projeto

A aplicação está dividida nas seguintes camadas:

- **Frontend**: Interface do usuário (HTML, CSS, JS)
- **API**: ASP.NET Web API que gerencia autenticação e CRUDs
- **Banco de dados**: MySQL, mapeado via Entity Framework
- **Segurança**: JWT para autenticação e controle de acesso por roles

> Veja o diagrama de arquitetura no arquivo `docs/diagrama-arquitetura.png` (ou outro local, se desejar).

---

## Estratégia de Testes Automatizados

- Testes de API com foco em:
  - Autenticação
  - Acesso autorizado por perfil
  - CRUD de colaboradores e usuários
- Framework utilizado: `xUnit` (ou informe o que estiver usando)
- Cobertura de testes: (colocar a porcentagem se tiver ou ferramenta usada como Coverlet, ReportGenerator...)

---

## 🗂️ Como Executar o Projeto

### 🔧 Pré-requisitos
- Visual Studio
- .NET SDK instalado
- VS Code
- Instalar asp.net e as configurações do C# no Visual studio
- MySQL Server instalado
### 📦 Passos

1. Clone o repositório:
    ## Backend
   ```bash
   git clone https://github.com/MatheusAndrade03/OperacaoCuriosidadeApi

 
2. Clone o repositório:
    ## Frontend
   ```bash
   git clone https://github.com/MatheusAndrade03/ProjetoFormacaoCuriosidade


3. Abra o backend (OperacaoCuriosidadeApiI) no Visual Studio 

4. Configure o appsettings.json com a string de conexão ao banco MySQL. 

"ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=OperacaoCuriosidadeBD;Uid=(seu id do acesso ao workebench);Pwd=(sua senha)"
},

5. Execute as migrações do Entity Framework:

Entre no caminho correto que possua o .csproj 

EX:C:\Users\User\Desktop\Estudos\OperacaoCuriosidadeApi\OperaçãoCuriosidadeApi\OperaçãoCuriosidadeApi

 depois rode os comandos abaixo

Caso não tenha o EF use o comando de install
dotnet tool install --global dotnet-ef

Caso tenha autialize
dotnet tool update --global dotnet-ef

 depois execute as migrações com este comando:
dotnet ef database update

6. Inicie o backend

dotnet run

7. Abra o frontend (ProjetoFormacaoCuriosidade) no VsCode 

8. Rode o (index.html) diretamente no navegador ou hospede com um servidor local.

9. Utilize o login do admin
email: admin@gmail.com
senha: admin

