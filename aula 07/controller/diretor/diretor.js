/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de Gênero
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de genero indicativa
const diretorDAO = require('../../model/DAO/diretor')

const inserirNovoDiretor = async (diretor, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDiretor = await validacao(diretor)

            if(validarGenero)
                return validarGenero //400

            let result = await diretorDAO
            
            if(result){ //201
                genero.id = result

                message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = diretor

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

const listarGenero = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await generoDAO.selectAllGenero()

        if(result){
            if(result.length > 0){ 
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {genero : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarGenero = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await generoDAO.selectByIdGenero(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {genero: result[0]}

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

const excluirGenero = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarGenero(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await generoDAO.deleteGenero(id)

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

const atualizarGenero = async (genero, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            let resultBuscarId = await buscarGenero(id)
            let validarGenero = await validacao(genero)

            if(!resultBuscarId.status)
                return resultBuscarId //400 ou 404 ou 500


            if(validarGenero)
                return validarGenero

            let result = await generoDAO.updateGenero(genero, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = genero

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (genero) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    let contador = 0
    genero = genero.genero
    
    let generosCadastrados = await generoDAO.selectAllGenero()

    if(genero == undefined || genero == "" || genero == null || genero.trim().length > 25){
        message.ERROR_BAD_REQUEST.field = "[Gênero] Inválido"
        return message.ERROR_BAD_REQUEST
    }

    for(let i = 0; generosCadastrados[0].length > i; i++){
        if(generosCadastrados[0][i].genero == String(genero).toUpperCase()){
            message.ERROR_BAD_REQUEST.field = "[Gênero] Já cadastrado"
            return message.ERROR_BAD_REQUEST
        }
    }

    return false
}

module.exports = {
    inserirNovoGenero,
    listarGenero,
    buscarGenero,
    atualizarGenero,
    excluirGenero
}