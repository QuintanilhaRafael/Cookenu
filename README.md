# Cookenu

## 📄 Sobre

Backend de uma rede social, na qual os usuários podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. 

## 🔗 Link do Deploy
https://lammar-cookenu2.onrender.com

## 🔗 Link para acessar os endpoints do Postman
https://documenter.getpostman.com/view/22376488/2s93CHtZsA

## 💻 Funcionalidades

### Sign Up

- Cria um novo usuário. O email deve ser único, senão uma mensagem de erro irá aparecer e não irá criar.
- O usuário deverá passar o name, email, password e role através do body.
- Após criar o usuário, será gerado um token de autenticação.

### Login

- Faz o login do usuário na aplicação.
- O usuário deverá passar o email e password de um usuário já cadastrado através do body.
- Após o login, será gerado um token de autenticação.

### Create Recipe

- Cria uma nova receita.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar title e description através do body.

### Follow Another User

- Endpoint para começar a seguir outro usuário.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar o userToFollowId através do body.

### Unfollow Another User

- Deixa de seguir outro usuário.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar o userToUnfollowId através do path params.

### Delete Recipe

- Deleta uma receita.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- Um usuário "normal" deve ser capaz de deletar uma receita própria dele e um usuário "admin" é capaz de deletar qualquer receita.
- O usuário deverá passar o id da receita através do path params.

### Delete User

- Deleta um usuário.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado e o seu role deve ser "admin".
- O usuário deverá passar o id do usuário através do path params.

### Get Profile

- Retorna as informações do usuário que está logado.
- O usuário deve estar autenticado para utilizar o endpoint.

### Get Recipes Feed

- Retorna as receitas criadas pelos usuários que segue.
- O usuário deve estar autenticado para utilizar o endpoint.

### Get User By Id

- Retorna as informações do usuário desejado.
- Para utilizar este endpoint, o usuário deve estar autenticado.
- O id do usuário deve ser passado por path params.

### Get Recipe By Id

- Retorna as informações da receita desejada.
- Para utilizar este endpoint, o usuário deve estar autenticado.
- O id da receita deve ser passado por path params.

### Edit Recipe

- Edita uma receita.
- Para utilizar este endpoint, o usuário deve estar autenticado.
- Um usuário "normal" deve ser capaz de editar uma receita própria dele.
- O usuário deverá passar title e description através do body.

### Forgot Password

- Este endpoint envia um e-mail para o usuário que esqueceu a sua senha com uma nova senha.
- O usuário deve passar o email através do body.

## 👩‍💻 Desenvolvedores:

- Rafael Gonçalves Quintanilha Guimarães.
- João Vitor Gomes Lara Resende.
- Nei Luis Duarte Tavares Junior.
