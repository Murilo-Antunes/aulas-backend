/* *********************************************************************
* Objetivo: Arquivo responsável pela criação da api do projeto whatsapp
* Data: 08/04/2026  
* Autor: Murilo
* **********************************************************************/

const express = require('express')
const cors = require('cors')
const porta = 8080

const app = express()

const corsOptions = {
     //A origem da requisição (nesse caso está liberando qualquer maquina por meio do "*" mas caso a origem venha de uma maquina em especifico, coloque o ip da mesma)
     origin: ["*"],
     //são os verbos(metodos) que serão liberados na API (get, post, put, delete) 
     methods: "GET", 
     //São permissões de cabeçalho do cors
     allowedHeaders: ['Content-type', 'Autorization'] 
}

const {getTodosDados, getMensagensUsuario, getDadosProfile, getDadosPessoaisContatos, getConversaUsuario, filtrarConversaGeral} = require('./module/manipular_array')

app.use(cors(corsOptions))

app.get("/v1/whatsapp/dados/gerais", (req, res) =>{
    let funcao = getTodosDados()
    if(!funcao)
        res.status(404).json({message: "Erro na url"})
    else
        res.status(200).json(funcao)
})

app.get("/v1/whatsapp/dados/profile/:numero", (req, res) =>{
    let numero = req.params.numero
    let funcao = getDadosProfile(numero)

    if(!funcao)
        res.status(404).json({message: "Erro na url"})
    else
        res.status(200).json(funcao)
})


app.get("/v1/whatsapp/dados/pessoais/mensagens/:numero", (req, res) =>{
    let numero = req.params.numero
    let funcao = getMensagensUsuario(numero)

    if(!funcao)
        res.status(404).json({message: "Erro na url"})
    else
        res.status(200).json(funcao)
})

app.get("/v1/whatsapp/dados/pessoais/contatos/:numero", (req, res) =>{
    let numero = req.params.numero
    let funcao = getDadosPessoaisContatos(numero)

    if(!funcao)
        res.status(404).json({message: "Erro na url"})
    else
        res.status(200).json(funcao)
})

app.get("/v1/whatsapp/dados/pessoais/contato/mensagens/:numero", (req, res) =>{
    let numero = req.params.numero
    let nome = req.query.nome
    let funcao = getConversaUsuario(numero, nome)

    if(!funcao)
        res.status(404).json({message: "Erro na url"})
    else
        res.status(200).json(funcao)
})

app.get("/v1/whatsapp/dados/pessoais/mensagens/filtro/:numero", (req, res) =>{
    let numero = req.params.numero
    let termo = req.query.termo
    let funcao = filtrarConversaGeral(numero, termo)

    if(!funcao)
        res.status(404).json({message: "Erro na url"})
    else
        res.status(200).json(funcao)
})

app.get('/v1/whatsapp/help', (req, res) => {
    const docApi = {
        "API-descripition"  : "API para manipular dados de Estados e Cidades",
        "development"     : "Murilo Antunes",
        "date"              : "2026-04-02",
        "version"         : "1.0.0",
        "endpoints": [
            {
                "id": 1,
                "Rota 1" : "/v1/whatsapp/dados/gerais",
                "obs" : "retorna todos os dados do json"
            },
            {
                "id": 2,
                "Rota 2" : "/v1/whatsapp/dados/profile/:numero",
                "obs" : "retorna dados do profile do usuario"
            },   
            {
                "id": 3,
                "Rota 3" : "/v1/whatsapp/dados/pessoais/mensagens/:numero",
                "obs" : "retorna as mensagens do usuário"
            },   
            {
                "id": 4,
                "Rota 4" : "/v1/whatsapp/dados/pessoais/contatos/:numero",
                "obs" : "retorna os dados dos contatos do usuário"
            },
            {
                "id": 5,
                "Rota 5" : "/v1/whatsapp/dados/pessoais/contato/mensagens/:numero",
                "obs" : "retorna as trocas de mensangens entre o usuário e um contato específico (query:nome)"
            },
            {
                "id": 6,
                "Rota 6" : "/v1/whatsapp/dados/pessoais/mensagens/filtro/:numero",
                "obs" : "filtra todas as mensagens do usuário de acordo com um termo especifico (query:termo)"
            }                  
        ]
    }

    response.json(docApi)
})

app.get('/', (req, res) => {
    res.json({message: 'Api funcionando'})
})

app.use((req, res) => {
    res.status(404).json({message: 'Rota não encontrada'})
})

app.listen(porta, function (){
    console.log("API funcionando e aguardando novas requisições")
})