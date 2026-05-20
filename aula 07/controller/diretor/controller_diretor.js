/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretor
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//importa o arquivo de configurações de mensagens
const configMessages = require('../module/configMessages.js')

//importa o model da classificação indicativa
const diretorDAO = require('../../model/DAO/diretor/diretor.js')

const inserirNovoDiretor = async (diretor, contentType) =>{
    // let message = JSON.parse(JSON.stringify(configMessages))
    let message = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDiretor = validacao(diretor)
            if(validarDiretor)
                return validarDiretor //400
            

            let result = await diretorDAO.insertDiretor(diretor)
            

            if(result){ //201
                diretor.id = result

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

const listarDiretor = async () =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await diretorDAO.selectAllDiretor()
        

        if(result){
            if(result.length > 0){ 
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretor : result[0]}
                
                return message.DEFAULT_MESSAGE //200
            }

            return message.ERROR_NOT_FOUND //404
        }else //erro na model
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
    } catch (error) { //error na controller 
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarDiretor = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        //verifica se o id é válido
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] Inválido"
            return message.ERROR_BAD_REQUEST //400
        }

        let result = await diretorDAO.selectByIdDiretor(id)

        if(result){
            if(result[0].length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {diretor: result[0]}

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

const excluirDiretor = async (id) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarId = await buscarDiretor(id) 

        if(!resultBuscarId.status)
            return resultBuscarId //400 ou 500 ou 404

        let result = await diretorDAO.deleteDiretor(id)

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

const atualizarDiretor = async (diretor, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            let resultBuscarId = await buscarDiretor(id)
            let validarClassicacao = validacao(diretor)

            if(!resultBuscarId.status)
                return resultBuscarId //400 ou 404 ou 500


            if(validarClassicacao)
                return validarClassicacao


            let result = await diretorDAO.updateDiretor(diretor, id)

            if(result){
                message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = diretor

                return message.DEFAULT_MESSAGE
            }else //error na model
                return message.ERROR_INTERNAL_SERVER_MODEL //500

        }else //erro no content type
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //415
    } catch (error) { //error na controle
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validacao = (diretor) =>{
    let message = JSON.parse(JSON.stringify(configMessages))
    

    const data_nascimento = new Date(diretor.data_nascimento)
    const data_inicio_carreira = new Date(diretor.data_inicio_carreira)
    const data_falecimento = diretor.data_falecimento ? new Date(diretor.data_falecimento) : null
    const data_termino_carreia = diretor.data_termino_carreia ? new Date(diretor.data_termino_carreia) : null


    

    //validação de dados para os atributos do diretor que retorna um 400
    if(diretor.nome == undefined || diretor.nome == "" || diretor.nome.length > 80  || diretor.nome == null){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        //return message.ERROR_BAD_REQUEST //erro 400
    }else if(data_nascimento == undefined || data_nascimento == "" || data_nascimento == null || isNaN(data_nascimento.getTime())){
        message.ERROR_BAD_REQUEST.field = '[DATA NASCIMENTO] INVÁLIDO'
    }else if(data_inicio_carreira == undefined || data_inicio_carreira == "" || data_inicio_carreira == null || isNaN(data_inicio_carreira.getTime())){
        message.ERROR_BAD_REQUEST.field = '[DATA INICIO CARREIRA] INVÁLIDA'
    }else if(data_falecimento != undefined && data_falecimento != null && data_falecimento != "" && isNaN(data_falecimento.getTime())){
        message.ERROR_BAD_REQUEST.field = '[DATA FALECIMENTO] INVÁLIDA'
    }else if(data_termino_carreia != undefined && data_termino_carreia != null && data_termino_carreia != "" && isNaN(data_termino_carreia.getTime())){
        message.ERROR_BAD_REQUEST.field = '[DATA TERMINO CARREIRA] INVÁLIDO'
    }else{
        return false
    }
    return message.ERROR_BAD_REQUEST //status code 400
}

module.exports = {
    inserirNovoDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor,
    atualizarDiretor
}