/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretorNacionalidade
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model de diretorNacionalidade indicativa
const diretorNacionalidadeDAO = require('../../model/DAO/diretor_nacionalidade/diretor_nacionalidade.js')

const inserirNovoDiretorNacionalidade = async (diretorNacionalidade) =>{
    
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        // --------------- VALIDAÇÃO NACIONALIDADE_DIRETOR ---------------
        let validarDiretorNacionalidade = await validacao(diretorNacionalidade)
        
        if(validarDiretorNacionalidade)
            return validarDiretorNacionalidade //400

        let result = await diretorNacionalidadeDAO.insertDiretorNacionalidade(diretorNacionalidade)
        
        
        if(result){ //201
            diretorNacionalidade.id = result

            message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response = diretorNacionalidade

            return message.DEFAULT_MESSAGE
        }else{ //erro da model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) { //erro da controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarDiretorNacionalidade = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await diretorNacionalidadeDAO.selectAllDiretorNacionalidade()
        

        if(result){
            if(result.length > 0){ 

                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorNacionalidade : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarDiretorNacionalidade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorNacionalidade: result[0]}

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

const buscarNacionalidadeIdDiretor = async (idDiretor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idDiretor == undefined || idDiretor == "" || idDiretor == null || isNaN(idDiretor)){
            message.ERROR_BAD_REQUEST.field = "[ID_DIRETOR] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await diretorNacionalidadeDAO.selectNacionalidadesByIdDiretor(idDiretor)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorNacionalidade: result[0]}

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

const buscarDiretorIdNacionalidade = async (idNacionalidade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(idNacionalidade == undefined || idNacionalidade == "" || idNacionalidade == null || isNaN(idNacionalidade)){
            message.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await diretorNacionalidadeDAO.selectDiretoresByIdNacionalidade(idNacionalidade)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretorNacionalidade: result[0]}

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

const excluirDiretorNacionalidade = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarDiretorNacionalidade(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await diretorNacionalidadeDAO.deleteDiretorNacionalidade(id)

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

const excluirNacionalidadeByIdDiretor= async (idDiretor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorNacionalidadeDAO.deleteNacionalidadeByIdDiretor(idDiretor)

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

const atualizarDiretorNacionalidade = async (diretorNacionalidade, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            // --------------- VALIDAÇÃO NACIONALIDADE_Diretor ---------------
            let resultBuscarIdDiretorNacionalidade = await buscarDiretorNacionalidade(id)
            let validarDiretorNacionalidade = await validacao(diretorNacionalidade)

            if(!resultBuscarIdDiretorNacionalidade.status)
                return resultBuscarIdDiretorNacionalidade //400 ou 404 ou 500
            
            if(validarDiretorNacionalidade)
                return validarDiretorNacionalidade

            let result = await diretorNacionalidadeDAO.updateDiretorNacionalidade(diretorNacionalidade, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = diretorNacionalidade

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = async (diretorNacionalidade) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    if(diretorNacionalidade.id_nacionalidade == undefined || diretorNacionalidade.id_nacionalidade == "" || diretorNacionalidade.id_nacionalidade == null || isNaN(diretorNacionalidade.id_nacionalidade)|| diretorNacionalidade.id_nacionalidade <= 0){
        message.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] Inválido"
    }else if(diretorNacionalidade.id_diretor == undefined || diretorNacionalidade.id_diretor == "" || diretorNacionalidade.id_diretor == null || isNaN(diretorNacionalidade.id_diretor)|| diretorNacionalidade.id_diretor <= 0){
        message.ERROR_BAD_REQUEST.diretorNacionalidade = "[ID_DIRETOR] Inválido"
    }else
        return false

    return message.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoDiretorNacionalidade,
    listarDiretorNacionalidade,
    buscarDiretorNacionalidade,
    buscarNacionalidadeIdDiretor,
    buscarDiretorIdNacionalidade,
    atualizarDiretorNacionalidade,
    excluirDiretorNacionalidade,
    excluirNacionalidadeByIdDiretor
}