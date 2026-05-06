/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de classificção indicativa
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model da classificação indicativa
const classificacaoIndicativaDAO = require('../../model/DAO/classificacao_indicativa/classificacao_indicativa.js')

const inserirNovaClassificacaoIndicativa = async (classicacao, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = structuredClone(configMessages)
    
    try {
        
    } catch (error) { //erro da controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}