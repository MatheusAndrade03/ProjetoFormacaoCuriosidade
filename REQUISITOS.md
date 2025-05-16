# 📋 Requisitos Funcionais

Este documento apresenta os requisitos funcionais do sistema de gerenciamento de usuários e colaboradores, desenvolvido como parte da disciplina Oficina de Integração 2.

---

## 1. Autenticação e Autorização

**RF01.** O sistema deve permitir que um usuário se autentique usando e-mail e senha.  
**RF02.** O sistema deve gerar um token JWT válido após login bem-sucedido.  
**RF03.** O sistema deve restringir o acesso a partes do sistema de acordo com o tipo do usuario (admin ou comum).  
**RF04.** O sistema deve criptografar todas as senhas utilizando Bcrypt.

---

## 2. Gestão de Colaboradores

**RF05.** O sistema deve permitir que um usuário crie um novo colaborador vinculado à sua conta.  
**RF06.** O sistema deve listar todos os colaboradores associados ao usuário logado.  
**RF07.** O sistema deve permitir que um usuário edite os dados de seus próprios colaboradores.  
**RF08.** O sistema deve permitir que um usuário exclua seus próprios colaboradores.  
**RF09.** O sistema deve impedir que um usuário visualize, edite ou exclua colaboradores de outro usuário.

---

## 3. Gestão de Usuários (apenas para administradores)

**RF10.** O sistema deve permitir que um administrador cadastre novos usuários.  
**RF11.** O sistema deve permitir que um administrador edite os dados de qualquer usuário.  
**RF12.** O sistema deve impedir que usuários comuns acessem funcionalidades administrativas.

---

## 4. Interface e Usabilidade

**RF13.** O sistema deve apresentar uma interface web acessível via navegador.  
**RF14.** A interface deve conter formulários de login, cadastro e edição com validações básicas.  
**RF15.** A interface deve exibir mensagens de sucesso e erro para cada operação (ex: cadastro, edição, exclusão).

---

## 5. Segurança

**RF16.** O sistema deve validar o token JWT( se expirou ou não) antes de qualquer ação do usuario logado.  
**RF17.** O token de acesso deve expirar após um tempo determinado, exigindo novo login.  
**RF18.** Os dados sensíveis dos usuários (como senhas) não devem ser retornados em nenhuma resposta da API.

---

## 6. Persistência

**RF19.** O sistema deve persistir os dados em um banco de dados MySQL.  
**RF20.** O sistema deve utilizar o Entity Framework para mapear os dados entre as entidades do C# e o banco de dados.

---

## 7. Testes

**RF21.** O sistema deve possuir testes automatizados para validar as principais funcionalidades.  
**RF22.** Os testes devem cobrir cenários positivos (sucesso) e negativos (erros ou ações não autorizadas).

---
