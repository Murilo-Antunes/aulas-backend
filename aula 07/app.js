/* *********************************************************************
* Objetivo: Arquivo responsável pela criação dos endpoints do projeto whatsapp
* Data: 08/04/2026  
* Autor: Murilo
* Instalção do body-parser e mysql2: npm install body-parser --save & npm install mysql2 --save
* **********************************************************************/

const {inserirNovoFilme, atualizarFIlme, listarFilme, buscarFilme, excluirFilme} =  require('./controller/filme/controller_filme.js')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const porta = 8080

//criando um objeto para manipular dados do body da api em formato json
const bodyParserJson = bodyParser.json()

const app = express()

const corsOptions = {
     //A origem da requisição (nesse caso está liberando qualquer maquina por meio do "*" mas caso a origem venha de uma maquina em especifico, coloque o ip da mesma)
     origin: ["*"],
     //são os verbos(metodos) que serão liberados na API (get, post, put, delete) 
     methods: "GET, POST, PUT, DELETE, OPTIONS",
     //São permissões de cabeçalho do cors
     allowedHeaders: ['Content-type', 'Autorization'] 
}

app.use(cors(corsOptions))

app.post("/v1/locadora/filme", bodyParserJson, async (req, res) =>{
    let dados = req.body //recebe o conteudo da requsição (dentro do body)
    let contentType = req.headers['content-type']
    let result = await inserirNovoFilme(dados, contentType)

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todosfilmes", async (req, res) =>{
    let result = await listarFilme()

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/filmebyid", async (req, res) =>{
    let id = req.query.id
    let result = await buscarFilme(id)


    res.status(result.status_code).json(result)
})

app.listen(porta, function (){
    console.log("API funcionando e aguardando novas requisições")
})