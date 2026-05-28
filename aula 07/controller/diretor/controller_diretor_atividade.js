/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretorAtividade
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de diretorAtividade indicativa
const diretorAtividadeDAO = require('../../model/DAO/diretor_Atividade/diretor_Atividade.js')

const inserirNovoDiretorAtividade = async (diretorAtividade) =>{
    
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        // --------------- VALIDAÇÃO Atividade_DIRETOR ---------------
        let validarDiretorAtividade = await validacao(diretorAtividade)
        
        if(validarDiretorAtividade)
            return validarDiretorAtividade //400

        let result = await diretorAtividadeDAO.insertDiretorAtividade(diretorAtividade)
        
        
        if(result){ //201
            diretorAtividade.id = result

            message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response = diretorAtividade

            return message.DEFAULT_MESSAGE
        }else{ //erro da model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) { //erro da controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarDiretorAtividade = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await diretorAtividadeDAO.selectAllDiretorAtividade()
        

        if(result){
            if(result.length > 0){ 

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorAtividade : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarDiretorAtividade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await diretorAtividadeDAO.selectByIdDiretorAtividade(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorAtividade: result[0]}

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

const buscarAtividadeIdDiretor = async (idDiretor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idDiretor == undefined || idDiretor == "" || idDiretor == null || isNaN(idDiretor)){
            message.ERROR_BAD_REQUEST.field = "[ID_DIRETOR] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await diretorAtividadeDAO.selectAtividadesByIdDiretor(idDiretor)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorAtividade: result[0]}

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

const buscarDiretorIdAtividade = async (idAtividade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idAtividade == undefined || idAtividade == "" || idAtividade == null || isNaN(idAtividade)){
            message.ERROR_BAD_REQUEST.field = "[ID_ATIVIDADE Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await diretorAtividadeDAO.selectDiretoresByIdAtividade(idAtividade)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorAtividade: result[0]}

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

const excluirDiretorAtividade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarDiretorAtividade(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await diretorAtividadeDAO.deleteDiretorAtividade(id)

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

const excluirAtividadeByIdDiretor= async (idDiretor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorAtividadeDAO.deleteAtividadeByIdDiretor(idDiretor)

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

const atualizarDiretorAtividade = async (diretorAtividade, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            // --------------- VALIDAÇÃO Atividade_Diretor ---------------
            let resultBuscarIdDiretorAtividade = await buscarDiretorAtividade(id)
            let validarDiretorAtividade = await validacao(diretorAtividade)

            if(!resultBuscarIdDiretorAtividade.status)
                return resultBuscarIdDiretorAtividade //400 ou 404 ou 500
            
            if(validarDiretorAtividade)
                return validarDiretorAtividade

            let result = await diretorAtividadeDAO.updateDiretorAtividade(diretorAtividade, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = diretorAtividade

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (diretorAtividade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    if(diretorAtividade.id_atividade == undefined || diretorAtividade.id_atividade == "" || diretorAtividade.id_atividade == null || isNaN(diretorAtividade.id_atividade)|| diretorAtividade.id_atividade <= 0){
        message.ERROR_BAD_REQUEST.field = "[ID_ATIVIDADE] Inválido"
    }else if(diretorAtividade.id_diretor == undefined || diretorAtividade.id_diretor == "" || diretorAtividade.id_diretor == null || isNaN(diretorAtividade.id_diretor)|| diretorAtividade.id_diretor <= 0){
        message.ERROR_BAD_REQUEST.diretorAtividade = "[ID_DIRETOR] Inválido"
    }else
        return false

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoDiretorAtividade,
    listarDiretorAtividade,
    buscarDiretorAtividade,
    buscarAtividadeIdDiretor,
    buscarDiretorIdAtividade,
    atualizarDiretorAtividade,
    excluirDiretorAtividade,
    excluirAtividadeByIdDiretor
}