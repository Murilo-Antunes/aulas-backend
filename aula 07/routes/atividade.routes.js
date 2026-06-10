const express = require('express');
const bodyParser = require('body-parser')
const bodyParserJson = bodyParser.json()

const atividade = require("../controller/atividade/controller_atividade.js")


//Cria um objeto de rota para o arquivo de rotas de atividades
const router = express.Router();

router.post("/atividade", bodyParserJson, async (req, res) =>{
    let dados = req.body
    let contentType = req.headers['content-type']
    let result = await atividade.inserirNovaAtividade(dados, contentType)

    res.status(result.status_code).json(result)
})

router.get("/todasatividades", async (req,res)=>{
    let result = await atividade.listarAtividade()
    res.status(result.status_code).json(result)
})

router.get("/atividadebyid/:id", async(req,res) =>{
    let id = req.params.id
    let result = await atividade.buscarAtividade(id)

    res.status(result.status_code).json(result)
})

router.put("/atividade/:id", bodyParserJson, async (req,res) =>{
    let id = req.params.id
    let contentType = req.headers['content-type']
    let dados = req.body
    let result = await atividade.atualizarAtividade(dados, id, contentType)

    res.status(result.status_code).json(result)
})

router.delete("/atividade/:id", async (req,res) =>{
    let id = req.params.id
    let result = await atividade.excluirAtividade(id)

    res.status(result.status_code).json(result)
})

module.exports = router