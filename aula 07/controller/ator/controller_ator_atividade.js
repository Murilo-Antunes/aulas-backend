/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de atorAtividade
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de AtorAtividade indicativa
const atorAtividadeDAO = require('../../model/DAO/ator_atividade/ator_atividade.js')

const inserirNovoAtorAtividade = async (atorAtividade) =>{
    
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        // --------------- VALIDAÇÃO Atividade_Ator ---------------
        let validarAtorAtividade = await validacao(atorAtividade)
        
        if(validarAtorAtividade)
            return validarAtorAtividade //400

        let result = await atorAtividadeDAO.insertAtorAtividade(atorAtividade)
        
        
        if(result){ //201
            atorAtividade.id = result

            message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response = atorAtividade

            return message.DEFAULT_MESSAGE
        }else{ //erro da model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) { //erro da controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarAtorAtividade = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await atorAtividadeDAO.selectAllAtorAtividade()
        

        if(result){
            if(result.length > 0){ 

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorAtividade : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarAtorAtividade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await atorAtividadeDAO.selectByIdAtorAtividade(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorAtividade: result[0]}

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

const buscarAtividadeIdAtor = async (idAtor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idAtor == undefined || idAtor == "" || idAtor == null || isNaN(idAtor)){
            message.ERROR_BAD_REQUEST.field = "[ID_ATOR] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await atorAtividadeDAO.selectAtividadesByIdAtor(idAtor)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorAtividade: result[0]}

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

const buscarAtorIdAtividade = async (idAtividade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idAtividade == undefined || idAtividade == "" || idAtividade == null || isNaN(idAtividade)){
            message.ERROR_BAD_REQUEST.field = "[ID_ATIVIDADE Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await atorAtividadeDAO.selectAtoresByIdAtividade(idAtividade)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorAtividade: result[0]}

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

const excluirAtorAtividade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarAtorAtividade(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await atorAtividadeDAO.deleteAtorAtividade(id)

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

const excluirAtividadeByIdAtor= async (idAtor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorAtividadeDAO.deleteAtividadeByIdAtor(idAtor)

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

const atualizarAtorAtividade = async (atorAtividade, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            // --------------- VALIDAÇÃO Atividade_Ator ---------------
            let resultBuscarIdAtorAtividade = await buscarAtorAtividade(id)
            let validarAtorAtividade = await validacao(atorAtividade)

            if(!resultBuscarIdAtorAtividade.status)
                return resultBuscarIdAtorAtividade //400 ou 404 ou 500
            
            if(validarAtorAtividade)
                return validarAtorAtividade

            let result = await atorAtividadeDAO.updateAtorAtividade(atorAtividade, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = atorAtividade

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (atorAtividade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    if(atorAtividade.id_atividade == undefined || atorAtividade.id_atividade == "" || atorAtividade.id_atividade == null || isNaN(atorAtividade.id_atividade)|| atorAtividade.id_atividade <= 0){
        message.ERROR_BAD_REQUEST.field = "[ID_ATIVIDADE] Inválido"
    }else if(atorAtividade.id_ator == undefined || atorAtividade.id_ator == "" || atorAtividade.id_ator == null || isNaN(atorAtividade.id_ator)|| atorAtividade.id_ator <= 0){
        message.ERROR_BAD_REQUEST.atorAtividade = "[ID_ATOR] Inválido"
    }else
        return false

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoAtorAtividade,
    listarAtorAtividade,
    buscarAtorAtividade,
    buscarAtividadeIdAtor,
    buscarAtorIdAtividade,
    atualizarAtorAtividade,
    excluirAtorAtividade,
    excluirAtividadeByIdAtor
}