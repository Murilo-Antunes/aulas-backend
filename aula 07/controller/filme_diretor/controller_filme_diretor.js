/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmeDiretor
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de filmeDiretor indicativa
const filmeDiretorDAO = require('../../model/DAO/filme_diretor/filme_diretor.js')

//import das controllers
const filmeController = require('../filme/controller_filme.js')
const diretorController = require('../diretor/controller_diretor.js')

const inserirNovoFilmeDiretor = async (filmeDiretor, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            // --------------- VALIDAÇÃO DIRETOR ---------------
            let resultBuscarIdDiretor = await diretorController.buscarDiretor(filmeDiretor.id_diretor)
            

            if(!resultBuscarIdDiretor.status)
                return resultBuscarIdDiretor //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME ---------------
            let resultBuscarIdFilme = await filmeController.buscarFilme(filmeDiretor.id_filme)

            if(!resultBuscarIdFilme.status)
                return resultBuscarIdFilme //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME_DIRETOR ---------------
            let validarFilmeDiretor = await validacao(filmeDiretor)
            
            if(validarFilmeDiretor)
                return validarFilmeDiretor //400

            let result = await filmeDiretorDAO.insertFilmeDiretor(filmeDiretor)
            
            
            if(result){ //201
                filmeDiretor.id = result

                message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = filmeDiretor

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

const listarFilmeDiretor = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await filmeDiretorDAO.selectAllFilmeDiretor()
        

        if(result){
            if(result.length > 0){ 

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeDiretor : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarFilmeDiretor = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await filmeDiretorDAO.selectByIdFilmeDiretor(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filmeDiretor: result[0]}

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

const excluirFilmeDiretor = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarFilmeDiretor(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await filmeDiretorDAO.deleteFilmeDiretor(id)

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

const atualizarFilmeDiretor = async (filmeDiretor, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            // --------------- VALIDAÇÃO DIRETOR ---------------
            let resultBuscarIdDiretor = await diretorController.buscarDiretor(filmeDiretor.id_diretor)
            

            if(!resultBuscarIdDiretor.status)
                return resultBuscarIdDiretor //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME ---------------
            let resultBuscarIdFilme = await filmeController.buscarFilme(filmeDiretor.id_filme)

            if(!resultBuscarIdFilme.status)
                return resultBuscarIdFilme //400 ou 404 ou 500

            // --------------- VALIDAÇÃO FILME_Diretor ---------------
            let resultBuscarIdFilmeDiretor = await buscarFilmeDiretor(id)
            let validarFilmeDiretor = await validacao(filmeDiretor)

            if(!resultBuscarIdFilmeDiretor.status)
                return resultBuscarIdFilmeDiretor //400 ou 404 ou 500
            
            if(validarFilmeDiretor)
                return validarFilmeDiretor

            let result = await filmeDiretorDAO.updateFilmeDiretor(filmeDiretor, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = filmeDiretor

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (filmeDiretor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    if(filmeDiretor.id_filme == undefined || filmeDiretor.id_filme == "" || filmeDiretor.id_filme == null || isNaN(filmeDiretor.id_filme)|| filmeDiretor.id_filme <= 0){
        message.ERROR_BAD_REQUEST.field = "[ID_FILME] Inválido"
    }else if(filmeDiretor.id_diretor == undefined || filmeDiretor.id_diretor == "" || filmeDiretor.id_diretor == null || isNaN(filmeDiretor.id_diretor)|| filmeDiretor.id_diretor <= 0){
        message.ERROR_BAD_REQUEST.filmeDiretor = "[ID_DIRETOR] Inválido"
    }else
        return false

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoFilmeDiretor,
    listarFilmeDiretor,
    buscarFilmeDiretor,
    atualizarFilmeDiretor,
    excluirFilmeDiretor
}