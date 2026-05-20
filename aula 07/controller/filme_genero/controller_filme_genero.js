/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmeGenero
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de filmeGenero indicativa
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

//import das controllers
const filmeController = require('../filme/controller_filme.js')
const generoController = require('../genero/controller_genero.js')

const inserirNovoFilmeGenero = async (filmeGenero, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            // --------------- VALIDAÇÃO GENERO ---------------
            let resultBuscarIdGenero = await generoController.buscarGenero(filmeGenero.id_genero)
            

            if(!resultBuscarIdGenero.status)
                return resultBuscarIdGenero //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME ---------------
            let resultBuscarIdFilme = await filmeController.buscarFilme(filmeGenero.id_filme)

            if(!resultBuscarIdFilme.status)
                return resultBuscarIdFilme //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME_GENERO ---------------
            let validarFilmeGenero = await validacao(filmeGenero)
            
            if(validarFilmeGenero)
                return validarFilmeGenero //400

            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)
            
            
            if(result){ //201
                filmeGenero.id = result

                message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = filmeGenero

                return message.DEFAULT_MESSAGE
            }else{ //erro da model
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else
            return message.ERROR_UNSUPORTED_MEDIA_TYPE
    } catch (error) { //erro da controller
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarFilmeGenero = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()
        

        if(result){
            if(result.length > 0){ 

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeGenero : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarFilmeGenero = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeGenero: result[0]}

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

const excluirFilmeGenero = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarFilmeGenero(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await filmeGeneroDAO.deleteFilmeGenero(id)

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

const atualizarFilmeGenero = async (filmeGenero, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            // --------------- VALIDAÇÃO GENERO ---------------
            let resultBuscarIdGenero = await generoController.buscarGenero(filmeGenero.id_genero)
            

            if(!resultBuscarIdGenero.status)
                return resultBuscarIdGenero //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME ---------------
            let resultBuscarIdFilme = await filmeController.buscarFilme(filmeGenero.id_filme)

            if(!resultBuscarIdFilme.status)
                return resultBuscarIdFilme //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME_GENERO ---------------
            let resultBuscarIdFilmeGenero = await buscarFilmeGenero(id)
            let validarFilmeGenero = await validacao(filmeGenero)

            if(!resultBuscarIdFilmeGenero.status)
                return resultBuscarIdFilmeGenero //400 ou 404 ou 500
            
            if(validarFilmeGenero)
                return validarFilmeGenero

            let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = filmeGenero

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (filmeGenero) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == "" || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme)|| filmeGenero.id_filme <= 0){
        message.ERROR_BAD_REQUEST.field = "[ID_FILME] Inválido"
    }else if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == "" || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero)|| filmeGenero.id_genero <= 0){
        message.ERROR_BAD_REQUEST.filmeGenero = "[ID_GENERO] Inválido"
    }else
        return false

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero
}