## 📬 Guia para consumir a API via Postman

Este guia mostra como utilizar o Postman para testar os endpoints da API do sistema de gerenciamento de usuários e colaboradores.

Base da API: http://localhost:5000/api

# 🔐 Autenticação

### Login

POST /authentication/login

referente ao usuario criado

Body (JSON):

{
  "email": "admin@email.com",
  "senha": "admin"
}

Resposta:

{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}


# 👥 Colaboradores

### 📃 Listar todos

GET /colaboradores

### 📰 Buscar por ID

GET /colaboradores/{id}

### 👨‍👦 Criar colaborador

POST /colaboradores

Body (JSON):

{
  "ativo": true,
  "email": "lucas@example.com",
  "endereco": "Rua 29 de agosto",
  "idade": "13",
  "interesses": "Jogar",
  "nome": "Lucas",
  "outrasInfo": "Estudante",
  "sentimentos": "Confiante",
  "valores": "Fiel",
  "usuarioId": 4
}

### 👩‍👩‍👧 Atualizar colaborador

PUT /colaboradores/{id}

Body (JSON):

{
  "ativo": true,
  "email": "lucas123@example.com",
  "endereco": "Rua kanematsu matsu",
  "idade": "14",
  "interesses": "Jogar bola",
  "nome": "Lucas roberto",
  "outrasInfo": "Estudante",
  "sentimentos": "Confiante",
  "valores": "Fiel",
  "usuarioId": 4
}

### ❌ Deletar colaborador

DELETE /colaboradores/{id}

# 👤 Usuários (somente Admin)

### 📃 Listar todos

GET /usuarios

### 📰 Buscar por ID

GET /usuarios/{id}

###  📨 Buscar por e-mail

GET /usuarios/{email}

### 👤 Criar usuário

POST /usuarios

Body (JSON):

{
  "id": 4,
  "nomeUsuario": "Joao",
  "senha": "123456",
  "email": "joao@example.com",
  "admin": true
  
}

### 👥 Atualizar usuário

PUT /usuarios/{id}

Body (JSON):

{
  "id": 4,
  "nomeUsuario": "Joao",
  "senha": "987654321",
  "email": "joaop@example.com",
  "admin": true
  
}

### ❌ Deletar usuário

DELETE /usuarios/{id}


