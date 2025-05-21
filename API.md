## 📬 Guia para consumir a API via Postman

Este guia mostra como utilizar o Postman para testar os endpoints da API do sistema de gerenciamento de usuários e colaboradores.

Base da API: http://localhost:5000/api

# 🔐 Autenticação

### Login

POST /authentication/login

Body (JSON):

{
  "email": "admin@email.com",
  "senha": "sua_senha"
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
  "nome": "Maria Silva",
  "cargo": "Desenvolvedora",
  "usuarioId": 1
}

### 👩‍👩‍👧 Atualizar colaborador

PUT /colaboradores/{id}

Body (JSON):

{
  "id": 1,
  "nome": "Maria Silva Atualizada",
  "cargo": "Dev Pleno",
  "usuarioId": 1
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
  "nome": "João Admin",
  "email": "joao@email.com",
  "senha": "123456",
  "ehAdmin": true
}

### 👥 Atualizar usuário

PUT /usuarios/{id}

Body (JSON):

{
  "id": 1,
  "nome": "João Admin Editado",
  "email": "joao@email.com",
  "senha": "nova_senha",
  "ehAdmin": true
}

### ❌ Deletar usuário

DELETE /usuarios/{id}


