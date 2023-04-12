# Projeto de API

Tarefas: 0. Requisitos
0.1 Node
0.2 Mysql
0.3 Mysql Workbench

1. Configurar o projeto
   1.1 npm init
   2.2 npm install
2. Criar as rotas - express
   GET, GET:id, POST, DELETE, PUT
3. Persistência - banco
   SEQUELIZE - MYSQL

## Proposta

1. Objetivo: Criar api usando Node
2. Compreender o papel Node
3. O que API? Backend & Frontend

- API
- Rotas e Parâmetros (URL)
- Métodos HTTP: GET/POST/PUT/DELETE

4. Bibliotecas utilizadas:

- Express (Rotas)
- Mysql2/Postgresql(pg) (Acesso(conexão) ao banco)
- Sequelize (Manipulação do banco - ORM)

5. Ferramenta para testar - Postman

- GET/POST/PUT/DELETE
- Rotas
- Parâmetros

## Instalar Node e Postman;

1. Acessar: [Site Node](https://nodejs.org/en/)

- Instalar LTS - Mais Estável

2. Instalar Postman

- [Site Postman](https://www.postman.com/downloads/)

## Criar projeto

1. Criar pasta do projeto
2. Abrir terminal (via mouse no rodapé, clica arrasta para cima)
3. Testar node no terminal

- Digitar:
  ```
  node -v
  ```

### Criar projeto Node

- NPM (Node Package Management) - Gerenciador de pacotes
- Criar projeto via linha de comando(terminal):
  ```
  npm init -y
  ```
- O parâmetro -y poupa uma série de perguntas
- Visualizar o arquivo gerado: package.json
- Criar o arquivo app.js
- Testar com:

```
console.log('oi kekel');
```

- Executar no terminal com

```
node app.js;
```

- Modificar package.json para definir um start dentro da tag script:

```
{
  "name": "api-pweb2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "",
  "license": "ISC"
}
```

- Testar no terminal, boa prática pois qualquer projeto deve ser iniciado "com npm start"

```
  npm start
```

### Instalar dependências - bibliotecas

#### Executar esses comandos no terminal

- Usar o NPM(gerenciador de pacotes) para instalar pacotes;
- Executar esses comandos no terminal

```
  npm install mysql2
  npm install sequelize
  npm install express
```

#### Nodemon

Objetivo: Permitir o hot deploy. Alterações já serão refletidas em qualquer mudança, sem a necessidade de parar e rodar o servidor novamente.

- Intalar de forma global o nodemon

```
npm install -g nodemon
```

Alterar package.json na tag scripts

```
"start": "npx nodemon app.js"
```

## Criar as rotas - express

- Documentação - (Express)[http://expressjs.com/en/starter/hello-world.html]
- (Rotas) - [http://expressjs.com/en/starter/basic-routing.html]

```
//app.js
const express = require('express');//importar
const app = express();//instanciar
app.use(express.json());//

//rota GET
app.get('/teste', (req, res) => {
  res.send('HeloOoOO');
});

//start servidor
app.listen(9000, async () => {
  console.log('servidor rodando');
});
```

## Explorando os recursos de rotas

- Revisar arrow function;
- Destacar o método GET, em breve usar POST/PUT/DELETE;
- Na definição, primeiro parâmetro é a rota, exemplo: 'oi' e 'responder';
- Atenção ao erro de esquercer '/' no início da rota;
- A função callback recebe 2 parâmetros, resquest(req), response(res);
- A resposta sempre via o uso de res.send
- Possibilidade de rota variável usando parâmetros. Ex.: chamar no postman uma url com
  responder/thiago. Para tal usar, como no exemplo: '/responder/:nome'

```
  ...
  app.get('/oi', (req, res) => {
    res.send({
      message:'oi'
    })
  });
  //Ex.: http://localhost:9000/responder/thiago
  app.get('/responder/:nome',(req, res) => {

    const nomeAluno =  req.params.nome;
    const listaAluno = [
      'Roberto','Emily','Vitória'
    ];
    res.send({
      destinatario:'Antônio',
      message: `Oi ${nomeAluno}`,
      colegas: listaAluno
    });
  })
```

## Acessar banco

## Criando arquivo de configuração da conexão

Criar arquivo db.js

```
const { Sequelize } = require('sequelize');
//postgresql
//npm install pg
//const database = new Sequelize('postgres://postgres@localhost:5432/crud', {dialect: 'postgres'});
const database = new Sequelize('pweb2', 'root', 'mysql123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = database;

```

## Alterar o arquivo app.js

```
  ...
  const database = require('./db');
  ...

  app.listen(9000, async () => {
    const resultDb = await database.sync();

    console.log('server running');
  });

```

####

## Criar classes model (Sequelize)

### Criando Classe de Mapaeamento

(documentação)[https://sequelize.org/docs/v6/getting-started/]

- Exemplo Previsao

```
const { DataTypes } = require('sequelize');

const database = require('../db');

const Previsao = database.define('previsao', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cidade: DataTypes.STRING,
  temperatura: DataTypes.DECIMAL(10,2),
  temperaturaMaxima: DataTypes.DECIMAL(10,2),
  temperaturaMinima: DataTypes.DECIMAL(10,2),
  descricao: DataTypes.STRING,
  data: DataTypes.DATEONLY
},{
  tableName: 'previsao'
});

module.exports = Previsao;

```

### Testando classe

```
...
const Previsao = require('./models/previsao');
...

app.get('/insert', async (req, res) => {
  let novaPrevisao = {
    cidade: 'Rio Largo',
    temperatura: 27,
    temperaturaMaxima: 27,
    temperaturaMinima: 20,
    descricao: 'Chuva',
    data: '2023-02-02'
  };

  novaPrevisao = Previsao.create(novaPrevisao);

  res.send(novaPrevisao);

});

app.get('/todos', async (req, res) => {
  const result = await Previsao.findAll();

  res.send(result);
});

```
