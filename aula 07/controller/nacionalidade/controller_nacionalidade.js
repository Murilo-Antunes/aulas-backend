/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de Nacionalidade
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model da nacionalidade indicativa
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const inserirNovaNacionalidade = async (nacionalidade, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarNacionalidade = await validacao(nacionalidade)
            
            if(validarNacionalidade)
                return validarNacionalidade //400

            let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)
            
            
            if(result){ //201
                nacionalidade.id = result

                message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = nacionalidade

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

const listarNacionalidade = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()
        

        if(result){
            if(result.length > 0){ 
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {nacionalidade : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarNacionalidade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {nacionalidade: result[0]}

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

const excluirNacionalidade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarNacionalidade(id)

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await nacionalidadeDAO.deleteNacionalidade(id)

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

const atualizarNacionalidade = async (nacionalidade, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            let resultBuscarId = await buscarNacionalidade(id)
            let validarNacionalidade = await validacao(nacionalidade)

            if(!resultBuscarId.status)
                return resultBuscarId //400 ou 404 ou 500


            if(validarNacionalidade)
                return validarNacionalidade //400

            let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade,id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = nacionalidade

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (nacionalidade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    let contador = 0
    
    let nacionalidadeCadastradas = await nacionalidadeDAO.selectAllNacionalidade()

    if(nacionalidade.pais == undefined || nacionalidade.pais == "" || nacionalidade.pais == null || nacionalidade.pais.trim().length > 40){
        message.ERROR_BAD_REQUEST.field = "[País] Inválido"
        return message.ERROR_BAD_REQUEST
    }else if(nacionalidade.sigla == undefined || nacionalidade.sigla == "" || nacionalidade.sigla == null || nacionalidade.sigla.trim().length > 5){
        message.ERROR_BAD_REQUEST.field = "[Sigla] Inválido"
        return message.ERROR_BAD_REQUEST
    }

    for(let i = 0; nacionalidadeCadastradas[0].length > i; i++){
        if(nacionalidadeCadastradas[0][i].pais == String(nacionalidade.pais).toUpperCase() || nacionalidadeCadastradas[0][i].sigla == String(nacionalidade.sigla).toUpperCase()){
            message.ERROR_BAD_REQUEST.field = "[Nacionalidade] Já cadastrado"
            return message.ERROR_BAD_REQUEST
        }
    }

    return false
}

module.exports = {
    inserirNovaNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade,
    atualizarNacionalidade
}