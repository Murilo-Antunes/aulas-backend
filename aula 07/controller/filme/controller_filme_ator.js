/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmeator
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de filmeator indicativa
const filmeAtorDAO = require('../../model/DAO/filme_ator/filme_ator.js')

const inserirNovoFilmeAtor = async (filmeAtor) =>{
    
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        // --------------- VALIDAÇÃO FILME_ator ---------------
        let validarFilmeAtor = await validacao(filmeAtor)
        
        if(validarFilmeAtor)
            return validarFilmeAtor //400

        let result = await filmeAtorDAO.insertFilmeAtor(filmeAtor)
        
        
        if(result){ //201
            filmeAtor.id = result

            message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response = filmeAtor

            return message.DEFAULT_MESSAGE
        }else{ //erro da model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) { //erro da controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarFilmeAtor = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await filmeAtorDAO.selectAllFilmeAtor()
        

        if(result){
            if(result.length > 0){ 

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeAtor : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarFilmeAtor = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await filmeAtorDAO.selectByIdFilmeAtor(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeAtor: result[0]}

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

const buscarFilmeIdAtor = async (idAtor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idAtor == undefined || idAtor == "" || idAtor == null || isNaN(idAtor)){
            message.ERROR_BAD_REQUEST.field = "[ID_ATOR] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await filmeAtorDAO.selectFilmesByIdAtor(idAtor)
        

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeAtor: result[0]}

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

const buscarAtorIdFilme = async (idFilme) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idFilme == undefined || idFilme == "" || idFilme == null || isNaN(idFilme)){
            message.ERROR_BAD_REQUEST.field = "[ID_FILME] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await filmeAtorDAO.selectAtoresByIdFilme(idFilme)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeAtor: result[0]}

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

const excluirFilmeAtor = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarFilmeAtor(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await filmeAtorDAO.deleteFilmeAtor(id)

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

const excluirAtorByIdFilme = async (idFilme) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeAtorDAO.deleteAtorByIdFilme(idFilme)

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

const atualizarFilmeAtor = async (filmeAtor, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            // --------------- VALIDAÇÃO FILME_ATOR ---------------
            let resultBuscarIdFilmeAtor = await buscarFilmeAtor(id)
            let validarFilmeAtor = await validacao(filmeAtor)

            if(!resultBuscarIdFilmeAtor.status)
                return resultBuscarIdFilmeAtor //400 ou 404 ou 500
            
            if(validarFilmeAtor)
                return validarFilmeAtor

            let result = await filmeAtorDAO.updateFilmeAtor(filmeAtor, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = filmeAtor

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (filmeAtor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    if(filmeAtor.id_filme == undefined || filmeAtor.id_filme == "" || filmeAtor.id_filme == null || isNaN(filmeAtor.id_filme)|| filmeAtor.id_filme <= 0){
        message.ERROR_BAD_REQUEST.field = "[ID_FILME] Inválido"
    }else if(filmeAtor.id_ator == undefined || filmeAtor.id_ator == "" || filmeAtor.id_ator == null || isNaN(filmeAtor.id_ator)|| filmeAtor.id_ator <= 0){
        message.ERROR_BAD_REQUEST.filmeator = "[ID_ATOR] Inválido"
    }else
        return false

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoFilmeAtor,
    listarFilmeAtor,
    buscarFilmeAtor,
    buscarFilmeIdAtor,
    buscarAtorIdFilme,
    atualizarFilmeAtor,
    excluirFilmeAtor,
    excluirAtorByIdFilme
}