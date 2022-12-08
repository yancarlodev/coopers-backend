<h1 align="center">
    Coopers Back-end
</h1>

<h3 align="center">Let's track ours tasks!</h3>

<br/>

## 🔨 Tecnologias e bibliotecas utilizadas
- [x] NodeJS com Express - Linguagem e framework
- [x] Typescript - Superset Javascript para tipagem
- [x] JsonWebToken e Bcrypt - Autenticação e segurança
- [x] Jest e supertest - Testes automatizados e de integração
- [x] Prisma - ORM
- [x] PostgreSQL - Banco de dados
- [x] Yup - validação de dados
- [x] Express Async Errors - gerenciador de erros
- [x] Heroku - Deploy da aplicação
- [x] Docker - Containerização da aplicação


<br/>

## ✅ Links

- [x] Aplicação em produção: https://ng-transfer.herokuapp.com/
- [x] <a href="https://github.com/yancarlodev/coopers-backend">Github do projeto</a>

<br/>

## ✅ Como rodar a aplicação localmente

Antes de tudo, você precisa das seguintes tecnologias:

- [x] [NPM](https://www.npmjs.com/)
- [x] [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) Opcional

<br/>

### 🎲 Preparando o ambiente

Primeiramente, será necessário configurar o arquivo <code>.env</code>. Para isso, vamos renomear o arquivo <code>.env.example</code> para <code>.env</code> e mudar as informações dentro dele:

```bash

# arquivo .env

# Define a porta em que a aplicação irá rodar
PORT=3000

# Aqui colocaremos as credenciais do postgreSQL, como o usuário, senha e o nome do banco de de dados. Por exemplo:
# "postgresql://matheus:1234@localhost:5432/NGTransfer?schema=public" 
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>?schema=public"

# Aqui, configuramos a chave secreta que será utilizada pela aplicação, podendo ser qualquer valor
SECRET_KEY=chavesecreta123

# E por fim, as variáveis para o Docker, só é preciso colocar as mesmas informações que o "DATABASE_URL"
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database

```

Com o <code>.env</code> pronto, podemos rodar os seguintes comandos no terminal:

```bash

# Na raiz do repositório execute o seguinte comando para baixar as dependências
$ yarn
ou
$ npm install

# Agora, execute o seguinte comando para rodar a criação do banco de dados e das tabelas
$ npx prisma migrate dev

# E por fim, rode a aplicação com o seguinte comando
$ yarn dev
ou 
$ npm run dev

# Se tudo der certo, você verá a seguinte mensagem no terminal "App listening on port <Porta definida no dotenv>. Let's track ours tasks!"
```

<br/>

### 🎲 Testes automatizados

Para executar os testes automatizados, é necessário um arquivo <code>.env.test</code>. Logo, só precisaremos duplicar o <code>.env</code> já existente, e mudar o nome do banco de dados na <code>DATABASE_URL</code> para um banco de testes.

```bash

DATABASE_URL="postgresql://matheus:1234@localhost:5432/NGTransferTest?schema=public"

```

Após configurado, podemos rodar os testes com o seguinte comando no terminal:

```bash

yarn test

```

<br/>

## ✅ Como utilizar a aplicação

Para facilitar a utilização da aplicação, no diretório raiz do projeto se encontro o <code>insomnia_endpoints.json</code>, um arquivo contendo as requisições já configuradas para o <a href="https://insomnia.rest/download">Insomnia</a>.

<br/>

### 🎲 Session endpoints

<strong>[POST] Register</strong> ---> /session/register

Este endpoint irá realizar o cadastro do usuário, recebendo um corpo de requisição contendo o <code>email</code>, com pelo menos 3 caracteres, e a <code>password</code>, devendo haver pelo menos 8 caracteres, um número e uma letra maiúscula.

#### Envio

```bash

{
	"email": "cleiton@mail.com",
	"password": "Teste123"
}

```

#### Resposta

A resposta é o usuário criado com seu <code>id</code>, <code>email</code> e sem sua <code>password</code>.

```bash

{
	"id": "96c172b3-3249-42a6-b9d3-743d1c55db4a",
	"email": "cleiton@mail.com"
}

```

<br/>

<strong>[POST] Login</strong> ---> /session/login

Este endpoint irá realizar o login do usuário, recebendo um corpo de requisição contendo o <code>email</code> e a <code>password</code>.

#### Envio

```bash

{
	"email": "cleiton@mail.com",
	"password": "Teste123"
}

```

#### Resposta

A reposta é um <code>token</code> de autenticação do usuário com expiração de 24h.

```bash

{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg3MjMwNDksImV4cCI6MTY2ODgwOTQ0OSwic3ViIjoiYzE5MjQzNTItMGZlNS00OGMyLTkyODYtODYzMzNkN2U3NThkIn0.0c1160FM_ZMPGT5vH5t8Yv09ZjaUB423PTqbYWlooFs"
}

```

</br>

### 🎲 To-do endpoints

<strong>⚠️ Para acessar esses endpoints, é necessário portar o token fornecido no login!</strong>

<strong>[GET] Trás todos os to-dos</strong> ---> /todos

Este endpoint irá retornar todos os to-dos, sem a necessidade de enviar um corpo de requisição.

#### Resposta

A reposta é o saldo do usuário.

```bash

[
	{
		"id": "9b36e6e3-3543-4da0-9788-759ff39b9c09",
		"title": "Clean-up the house",
		"isComplete": true,
		"userId": "2c1ed457-e72f-49b1-a6fa-803b774ff302"
	},
	{
		"id": "1df467fd-dbad-4eed-bbee-9148be34f9d6",
		"title": "Clean-up the house",
		"isComplete": false,
		"userId": "2c1ed457-e72f-49b1-a6fa-803b774ff302"
	}
]

```

</br>

<strong>[POST] Cria um to-do</strong> ---> /todos

Este endpoint irá criar um to-do, sendo necessário passar o <code>title</code>, e um opcionalmente um <code>isComplete</code> indicando se a tarefa foi concluída ou não. Se <code>isComplete</code> não foi passado, por padrão será falso.

#### Envio

```bash

{
	"title": "Clean-up the house",
	"isComplete": true
}

```

#### Resposta

A reposta contêm o <code>id</code>, <code>title</code>, <code>isComplete</code> e o <code>userId</code>, que indica o dono desse to-do.

```bash

{
	"id": "3e8b58a6-b0f3-4057-8a3a-e15e6124be25",
	"title": "Clean-up the house",
	"isComplete": true,
	"userId": "2c1ed457-e72f-49b1-a6fa-803b774ff302"
}

```

</br>

<strong>[PATCH] Atualiza um to-do</strong> ---> /todos/:id

Neste endpoint é possível passar o <code>title</code> e <code>isComplete</code> para que sejam atualizados.

#### Envio

```bash

{
	"title": "Do the laundry",
	"isComplete": false
}

```

#### Resposta

A reposta é o to-do com as informações atualizadas.

```bash

{
	"id": "99bb0e6e-7003-42d9-8555-f30ae73a53e0",
	"title": "Do the laundry",
	"isComplete": false,
	"userId": "2c1ed457-e72f-49b1-a6fa-803b774ff302"
}

```

</br>

<strong>[DELETE] Deleta um to-do</strong> ---> /todos/:id

Neste endpoint só é necessário informar o id do to-do. Não existe retorno, apenas o <code>status code</code> sendo 204 (No content).

</br>

<h1 align="center">👥 Desenvolvedor responsável 👥</h1> 

<table align="center">
  <tr>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/40778394?v=4" width="100px;" alt="Foto do Yan"/><br>        
        <sub>
            <b>Yan Carlo</b> <br/>
            <a href="https://github.com/yancarlodev" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/yancarlodev/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
  </tr>
</table>