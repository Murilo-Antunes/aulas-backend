/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de Genero
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de atividade
const atividadeDAO = require('../../model/DAO/atividade/atividade.js')

const inserirNovaAtividade = async (atividade, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarAtividade = await validacao(atividade)
            

            if(validarAtividade)
                return validarAtividade //400

            let result = await atividadeDAO.insertAtividade(atividade)
            
            
            if(result){ //201
                atividade.id = result

                message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = atividade

                return message.DEFAULT_MESSAGE
            }else{ //erro da model
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else
            return message.ERROR_UNSUPORTED_MEDIA_TYPE
    } catch (error) { //erro da controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarAtividade = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await atividadeDAO.selectAllAtividade()
        

        if(result){
            if(result.length > 0){ 
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atividade : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarAtividade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await atividadeDAO.selectByIdAtividade(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atividade: result[0]}

                return message.DEFAULT_MESSAGE
            }else
                return message.ERROR_NOT_FOUND //404
        }else{ //erro na mode
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) { //error na controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirAtividade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarAtividade(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await atividadeDAO.deleteAtividade(id)

        if(result){ //200
            message.DEFAULT_MESSAGE.status = message.SUCESS_DELETED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_DELETED_ITEM.message

            return message.DEFAULT_MESSAGE
        }else //error na model
            message.ERROR_INTERNAL_SERVER_MODEL // 500

    } catch (error) { //error na controle
        message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarAtividade = async (atividade, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            let resultBuscarId = await buscarAtividade(id)
            let validarAtividade = await validacao(atividade)

            if(!resultBuscarId.status)
                return resultBuscarId //400 ou 404 ou 500


            if(validarAtividade)
                return validarAtividade

            let result = await atividadeDAO.updateAtividade(atividade, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = atividade

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (atividade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    atividade = atividade.atividade
    
    let atividadesCadastradas = await atividadeDAO.selectAllAtividade()

    //verifica se a atividade é válida
    if(atividade == undefined || atividade == "" || atividade == null || atividade.trim().length > 45){
        message.ERROR_BAD_REQUEST.field = "[Atividade] Inválido"
        return message.ERROR_BAD_REQUEST
    }

    //identifica se a atividade já foi cadastrada anteriormente
    for(let i = 0; atividadesCadastradas[0].length > i; i++){
        if(String(atividadesCadastradas[0][i].atividade).toUpperCase() == String(atividade).toUpperCase()){
            message.ERROR_BAD_REQUEST.field = "[Atividade] Já cadastrada"
            return message.ERROR_BAD_REQUEST
        }
    }

    return false
}

module.exports = {
    inserirNovaAtividade,
    listarAtividade,
    buscarAtividade,
    atualizarAtividade,
    excluirAtividade
}