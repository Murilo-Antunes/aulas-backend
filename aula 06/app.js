/* *********************************************************************
* Objetivo: Arquivo responsável pela criação da api do projeto de estados e cidades 
* Data: 01/04/2026  
* Autor: Marcel
* Instalação do express = npm install express --save 
*       dependencia responsável pela utilização do protocolo http para criar uma API
* Instalação do cors    = npm install cors --save
*       dependencia responsável pelas configurações a serem realizadas para a permissão de acesso da API 
* **********************************************************************/

//import das funções get
const { getCapitalEstado, 
        getCapitalPais, 
        getCidades, 
        getDadosEstado, 
        getEstadosRegiao, 
        getListaDeEstados
    } = require('./module/manipular_array.js')


//import das dependencias para usar API
const express = require('express')
const porta  = 8080
const cors = require('cors')
const { json } = require('body-parser')


//criando um objeto para manipular express
const app = express()

//configurações de cors (criação de variavel que carrega as configurações)
const corsOptions = {
    //A origem da requisição (nesse caso está liberando qualquer maquina por meio do "*" mas caso a origem venha de uma maquina em especifico, coloque o ip da mesma)
    origin: ["*"],
    //são os verbos(metodos) que serão liberados na API (get, post, put, delete) 
    methods: "GET", 
    //São permissões de cabeçalho do cors
    allowedHeaders: ['Content-type', 'Autorization'] 
}

//cabeçalhos especificações de um pacote de dados, como se fosse um envelope, (dados de quem está mandando e quem está recebendo)
//body do pacote é o conteudo do "envelope"


app.use(cors(corsOptions))




app.get('/v1/senai/estados/dados/:sigla', function(request, response){
    let sigla = request.params.sigla
    let funcao = getDadosEstado(sigla)

    if(!funcao){
        response.status(404)
        response.json({"message": "erro na url"})
    }else{
        response.status(200)
        response.json(funcao)
    }

    
})

app.get('/v1/senai/estados/capital/:sigla', function(request, response){
    let sigla = request.params.sigla
    let funcao = getCapitalEstado(sigla)

    if(!funcao){
        response.status(404)
        response.json({"message": "erro na url"})
    }else{
        response.status(200)
        response.json(funcao)   
    }

    
})

app.get('/v1/senai/estados/regiao/:regiao', function(request, response){
    let regiao = request.params.regiao
    let funcao = getEstadosRegiao(regiao)

    if(!funcao){
        response.status(404)
        response.json({"message": "erro na url"})
    }else{
        response.status(200)
        response.json(funcao)   
    }

    
})

app.get('/v1/senai/capital/pais', function(request, response){
    let funcao = getCapitalPais()

    if(!funcao){
        response.status(404)
        response.json({"message": "erro na url"})
    }else{
        response.status(200)
        response.json(funcao)
    }

    
})

app.get('/v1/senai/cidades/:sigla', function(request, response){
    let sigla = request.params.sigla
    let funcao = getCidades(sigla)

    if(!funcao){
        response.status(404)
        response.json({"message": "erro na url"})
    }else{
        response.status(200)
        response.json(funcao) 
    }

    
})

//criando endpoints para API
    // o "/estados" é a assinatura do endpoint
    // o endpoint sempre trabalha com response(retornos da api | res) e request(chegadas de dados na api | req)
    //SEMPRE que o back fizer um RESPONSE ele vai mandar um JSON e um STATUS CODE
app.get('/v1/senai/estados', function(request, response){
    let funcao = getListaDeEstados()

    response.json(funcao) //a resposta vai ser mandada como json
    response.status(200) //status "200" que representa um sucesso de requisição de uma API
}) 

app.get('/v1/senai/help', function(request, response){
    const docApi = {
        "API-descripition"  : "API para manipular dados de Estados e Cidades",
        "development"     : "Murilo Antunes",
        "date"              : "2026-04-02",
        "version"         : "1.0.0",
        "endpoints": [
            {
                "id": 1,
                "Rota 1" : "http://localhost:8080/v1/senai/estados",
                "obs" : "retorna a lista de todos estados"
            },
            {
                "id": 2,
                "Rota 2" : "http://localhost:8080/v1/senai/estados/dados/sp",
                "obs" : "retorna a lista de dados de um estado de acordo com a sigla"
            },   
            {
                "id": 3,
                "Rota 3" : "http://localhost:8080/v1/senai/estados/capital/sp",
                "obs" : "retorna os dados da capital filtrando pela sigla do estado"
            },   
            {
                "id": 4,
                "Rota 4" : "http://localhost:8080/v1/senai/estados/regiao/sul",
                "obs" : "retorna todos os estados referente a uma região"
            },
            {
                "id": 5,
                "Rota 5" : "http://localhost:8080/v1/senai/capital/pais",
                "obs" : "retorna todos os estados que já foram a capital do país"
            },
            {
                "id": 6,
                "Rota 6" : "http://localhost:8080/v1/senai/cidades/{sigla}",
                "obs" : "retorna todas cidades filtrando pela sigla do estado"
            }                  
        ]
    }

    response.json(docApi)
})


app.use((req, res) => {
    res.status(404).json({message: 'Rota não encontrada'})
})


//serve para inicializar a api para receber requisições
app.listen(porta, function (){
    console.log("API funcionando e aguardando novas requisições")
})




