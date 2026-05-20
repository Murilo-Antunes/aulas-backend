/* *********************************************************************
* Objetivo: Arquivo responsável pela criação dos endpoints do projeto whatsapp
* Data: 08/04/2026  
* Autor: Murilo
* Instalção do body-parser e mysql2: npm install body-parser --save & npm install mysql2 --save
* **********************************************************************/

const filme =  require('./controller/filme/controller_filme.js')
const classificacao = require('./controller/classificacao_indicativa/controller_classificacao_indicativa.js')
const ator = require('./controller/ator/controller_ator.js')
const diretor = require('./controller/diretor/controller_diretor.js')
const genero = require('./controller/genero/controller_genero.js')
const nacionalidade = require("./controller/nacionalidade/controller_nacionalidade.js")
const atividade = require("./controller/atividade/controller_atividade.js")

const filmeGenero = require('./controller/filme_genero/controller_filme_genero.js')

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

// -------------------------- ROTAS FILME --------------------------  

app.post("/v1/locadora/filme", bodyParserJson, async (req, res) =>{
    let dados = req.body //recebe o conteudo da requsição (dentro do body)
    let contentType = req.headers['content-type']
    let result = await filme.inserirNovoFilme(dados, contentType)

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todosfilmes", async (req, res) =>{
    let result = await filme.listarFilme()

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/filmebyid/:id", async (req, res) =>{
    let id = req.params.id
    let result = await filme.buscarFilme(id)


    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/filme/:id", bodyParserJson, async (req, res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await filme.atualizarFIlme(dados, id, contentType)
    

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/filme/:id", async (req, res) =>{
    let id = req.params.id
    let result = await filme.excluirFilme(id)

    res.status(result.status_code).json(result)
})

// -------------------------- ROTAS CLASSIFICAÇÃO -------------------------- 

app.post("/v1/locadora/classificacao", bodyParserJson, async (req, res) =>{
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await classificacao.inserirNovaClassificacaoIndicativa(dados, contentType)

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todasclassificacoes", async (req,res) =>{
    let result = await classificacao.listarClassificacaoIndicativa()
    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/classifcacaobyid/:id", async (req, res) =>{
    let id = req.params.id
    let result = await classificacao.buscarClassificacaoIndicativa(id)

    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/classificacao/:id", bodyParserJson, async(req, res) =>{
    let dados = req.body
    let contentType = req.headers['content-type']
    let id = req.params.id
    let result = await classificacao.atualizarClassificacaoIndicativa(dados, id, contentType)

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/classificacao/:id", async (req,res) =>{
    let id = req.params.id
    let result = await classificacao.excluirClassificacaoIndicativa(id)

    res.status(result.status_code).json(result)
})

// -------------------------- ROTAS ATOR -------------------------- 
app.post("/v1/locadora/ator", bodyParserJson, async (req, res) =>{
    let dados = req.body //recebe o conteudo da requsição (dentro do body)
    let contentType = req.headers['content-type']
    let result = await ator.inserirNovoAtor(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todosatores", async (req, res) =>{
    let result = await ator.listarAtor()

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/atorbyid/:id", async (req, res) =>{
    let id = req.params.id
    let result = await ator.buscarAtor(id)


    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/ator/:id", bodyParserJson, async (req, res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await ator.atualizarAtor(dados, id, contentType)
    

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/ator/:id", async (req, res) =>{
    let id = req.params.id
    let result = await ator.excluirAtor(id)

    res.status(result.status_code).json(result)
})


// -------------------------- ROTAS DIRETOR -------------------------- 
app.post("/v1/locadora/diretor", bodyParserJson, async (req, res) =>{
    let dados = req.body //recebe o conteudo da requsição (dentro do body)
    let contentType = req.headers['content-type']
    let result = await diretor.inserirNovoDiretor(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todosdiretores", async (req, res) =>{
    let result = await diretor.listarDiretor()

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/diretorbyid/:id", async (req, res) =>{
    let id = req.params.id
    let result = await diretor.buscarDiretor(id)


    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/diretor/:id", bodyParserJson, async (req, res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await diretor.atualizarDiretor(dados, id, contentType)
    

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/diretor/:id", async (req, res) =>{
    let id = req.params.id
    let result = await diretor.excluirDiretor(id)

    res.status(result.status_code).json(result)
})
// -------------------------- ROTAS GÊNERO --------------------------

app.post("/v1/locadora/genero", bodyParserJson, async (req, res) =>{
    let dados = req.body
    let contentType = req.headers['content-type']
    let result = await genero.inserirNovoGenero(dados, contentType)    

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todosgeneros", async (req,res)=>{
    let result = await genero.listarGenero()
    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/generobyid/:id", async(req,res) =>{
    let id = req.params.id
    let result = await genero.buscarGenero(id)

    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/genero/:id", bodyParserJson, async (req,res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await genero.atualizarGenero(dados, id, contentType)

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/genero/:id", async (req,res) =>{
    let id = req.params.id
    let result = await genero.excluirGenero(id)

    res.status(result.status_code).json(result)
})

// -------------------------- ROTAS NACIONALIDADE --------------------------

app.post("/v1/locadora/nacionalidade", bodyParserJson, async (req, res) =>{
    let dados = req.body
    let contentType = req.headers['content-type']
    let result = await nacionalidade.inserirNovaNacionalidade(dados, contentType)

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todasnacionalidades", async (req,res)=>{
    let result = await nacionalidade.listarNacionalidade()
    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/nacionalidadebyid/:id", async(req,res) =>{
    let id = req.params.id
    let result = await nacionalidade.buscarNacionalidade(id)

    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/nacionalidade/:id", bodyParserJson, async (req,res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await nacionalidade.atualizarNacionalidade(dados, id, contentType)

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/nacionalidade/:id", async (req,res) =>{
    let id = req.params.id
    let result = await nacionalidade.excluirNacionalidade(id)

    res.status(result.status_code).json(result)
})

// -------------------------- ROTAS ATIVIDADE --------------------------

app.post("/v1/locadora/atividade", bodyParserJson, async (req, res) =>{
    let dados = req.body
    let contentType = req.headers['content-type']
    let result = await atividade.inserirNovaAtividade(dados, contentType)

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todasatividades", async (req,res)=>{
    let result = await atividade.listarAtividade()
    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/atividadebyid/:id", async(req,res) =>{
    let id = req.params.id
    let result = await atividade.buscarAtividade(id)

    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/atividade/:id", bodyParserJson, async (req,res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await atividade.atualizarAtividade(dados, id, contentType)

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/atividade/:id", async (req,res) =>{
    let id = req.params.id
    let result = await atividade.excluirAtividade(id)

    res.status(result.status_code).json(result)
})

// -------------------------- ROTAS FILME GENERO --------------------------
app.post("/v1/locadora/filmeGenero", bodyParserJson, async (req, res) =>{
    let dados = req.body
    let contentType = req.headers['content-type']
    let result = await filmeGenero.inserirNovoFilmeGenero(dados, contentType)    

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/todosfilmesgeneros", async (req,res)=>{
    let result = await filmeGenero.listarFilmeGenero()
    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/filmegenerobyid/:id", async(req,res) =>{
    let id = req.params.id
    let result = await filmeGenero.buscarFilmeGenero(id)

    res.status(result.status_code).json(result)
})

app.put("/v1/locadora/filmegenero/:id", bodyParserJson, async (req,res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await filmeGenero.atualizarFilmeGenero(dados, id, contentType)

    res.status(result.status_code).json(result)
})

app.delete("/v1/locadora/filmegenero/:id", async (req,res) =>{
    let id = req.params.id
    let result = await filmeGenero.excluirFilmeGenero(id)

    res.status(result.status_code).json(result)
})

app.get("/v1/locadora/help", (req, res) =>{
    const docApi = {
        "API-descripition"  : "API de CRUD para locadora de filmes",
        "development"     : "Murilo Antunes",
        "date"              : "2026-04-29",
        "version"         : "1.0.0",
        "endpoints": [
            {
                "id": 1,
                "Rota 1" : "/v1/locadora/filme",
                "obs" : "Insere um novo filme no banco de dados"
            },
            {
                "id": 2,
                "Rota 2" : "/v1/locadora/todosfilmes",
                "obs" : "Lista todos os filmes cadastrados no banco de dados"
            },   
            {
                "id": 3,
                "Rota 3" : "/v1/locadora/filmebyid/:id",
                "obs" : "Busca um filme por id"
            },   
            {
                "id": 4,
                "Rota 4" : "/v1/locadora/atualizarfilme/:id",
                "obs" : "Atualiza dados de um filme no banco de dados"
            },
            {
                "id": 5,
                "Rota 5" : "/v1/locadora/deletarfilme/:id",
                "obs" : "Deleta um filme no banco de dados pelo seu id"
            },                
        ]
    }
    res.json(docApi)
})

app.get('/', (req, res) => {
    res.json({message: 'Api funcionando'})
})

app.listen(porta, function (){
    console.log("API funcionando e aguardando novas requisições")
})
