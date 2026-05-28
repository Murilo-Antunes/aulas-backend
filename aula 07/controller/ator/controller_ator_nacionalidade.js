/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de atorNacionalidade
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de AtorNacionalidade indicativa
const atorNacionalidadeDAO = require('../../model/DAO/ator_Nacionalidade/ator_Nacionalidade.js')

const inserirNovoAtorNacionalidade = async (atorNacionalidade) =>{
    
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        // --------------- VALIDAÇÃO Nacionalidade_Ator ---------------
        let validarAtorNacionalidade = await validacao(atorNacionalidade)
        
        if(validarAtorNacionalidade)
            return validarAtorNacionalidade //400

        let result = await atorNacionalidadeDAO.insertAtorNacionalidade(atorNacionalidade)
        
        
        if(result){ //201
            atorNacionalidade.id = result

            message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response = atorNacionalidade

            return message.DEFAULT_MESSAGE
        }else{ //erro da model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) { //erro da controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarAtorNacionalidade = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await atorNacionalidadeDAO.selectAllAtorNacionalidade()
        

        if(result){
            if(result.length > 0){ 

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorNacionalidade : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarAtorNacionalidade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorNacionalidade: result[0]}

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

const buscarNacionalidadeIdAtor = async (idAtor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idAtor == undefined || idAtor == "" || idAtor == null || isNaN(idAtor)){
            message.ERROR_BAD_REQUEST.field = "[ID_ATOR] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await atorNacionalidadeDAO.selectNacionalidadesByIdAtor(idAtor)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorNacionalidade: result[0]}

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

const buscarAtorIdNacionalidade = async (idNacionalidade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idNacionalidade == undefined || idNacionalidade == "" || idNacionalidade == null || isNaN(idNacionalidade)){
            message.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await atorNacionalidadeDAO.selectAtoresByIdNacionalidade(idNacionalidade)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {atorNacionalidade: result[0]}

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

const excluirAtorNacionalidade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarAtorNacionalidade(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await atorNacionalidadeDAO.deleteAtorNacionalidade(id)

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

const excluirNacionalidadeByIdAtor= async (idAtor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorNacionalidadeDAO.deleteNacionalidadeByIdAtor(idAtor)

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

const atualizarAtorNacionalidade = async (atorNacionalidade, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            // --------------- VALIDAÇÃO Nacionalidade_Ator ---------------
            let resultBuscarIdAtorNacionalidade = await buscarAtorNacionalidade(id)
            let validarAtorNacionalidade = await validacao(atorNacionalidade)

            if(!resultBuscarIdAtorNacionalidade.status)
                return resultBuscarIdAtorNacionalidade //400 ou 404 ou 500
            
            if(validarAtorNacionalidade)
                return validarAtorNacionalidade

            let result = await atorNacionalidadeDAO.updateAtorNacionalidade(atorNacionalidade, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = atorNacionalidade

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (atorNacionalidade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    if(atorNacionalidade.id_nacionalidade == undefined || atorNacionalidade.id_nacionalidade == "" || atorNacionalidade.id_nacionalidade == null || isNaN(atorNacionalidade.id_nacionalidade)|| atorNacionalidade.id_nacionalidade <= 0){
        message.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] Inválido"
    }else if(atorNacionalidade.id_ator == undefined || atorNacionalidade.id_ator == "" || atorNacionalidade.id_ator == null || isNaN(atorNacionalidade.id_ator)|| atorNacionalidade.id_ator <= 0){
        message.ERROR_BAD_REQUEST.atorNacionalidade = "[ID_ATOR] Inválido"
    }else
        return false

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoAtorNacionalidade,
    listarAtorNacionalidade,
    buscarAtorNacionalidade,
    buscarNacionalidadeIdAtor,
    buscarAtorIdNacionalidade,
    atualizarAtorNacionalidade,
    excluirAtorNacionalidade,
    excluirNacionalidadeByIdAtor
}