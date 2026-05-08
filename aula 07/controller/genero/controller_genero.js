/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de Genero
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model da classificação indicativa
const generoDAO = require('../../model/DAO/genero/genero.js')

const inserirNovoGenero = async (genero, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarGenero = validacao(genero)
            if(validarGenero)
                return validarGenero //400
            

            let result = await generoDAO.insertGenero(genero)
            

            if(result){ //201
                genero.id = result

                message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = genero

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

const listarClassificacaoIndicativa = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await classificacaoIndicativaDAO.selectAllClassificacaoIndicativa()
        

        if(result){
            if(result.length > 0){ 
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {classificacao : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarClassificacaoIndicativa = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await classificacaoIndicativaDAO.selectByIdClassificacaoIndicativa(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {classificacao: result[0]}

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

const excluirClassificacaoIndicativa = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarClassificacaoIndicativa(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await classificacaoIndicativaDAO.deleteClassificacaoIndicativa(id)

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

const atualizarClassificacaoIndicativa = async (classificacao, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            let resultBuscarId = await buscarClassificacaoIndicativa(id)
            let validarClassicacao = validacao(classificacao)

            if(!resultBuscarId.status)
                return resultBuscarId //400 ou 404 ou 500


            if(validarClassicacao)
                return validarClassicacao

            let result = await classificacaoIndicativaDAO.updateClassificacaoIndicativa(classificacao, id)
            console.log(result)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = classificacao

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = (classificacao) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    classificacao = classificacao.classificacao

    if(String(classificacao).toUpperCase() == "L" || String(classificacao) == "10" || String(classificacao) == "12" || String(classificacao) == "14" || String(classificacao) == "16" || String(classificacao) == "18")
        return false
    else
        message.ERROR_BAD_REQUEST.field = "[Gênero] Inválido"

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovaClassificacaoIndicativa,
    listarClassificacaoIndicativa,
    buscarClassificacaoIndicativa,
    excluirClassificacaoIndicativa,
    atualizarClassificacaoIndicativa
}