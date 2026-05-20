/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmes
 * Data: 17/04/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/
//import do arquivo de padronização de mensagens
const message_config = require('../module/configMessages.js')

//import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')
//import de arquivos de controller
const classifcacaoController = require('../classificacao_indicativa/controller_classificacao_indicativa.js')

//função para inserir um novo filme
const inserirNovoFilme = async (filme, contentType) =>{

    //realiza uma copia da estrutura do JSON de forma que não modifica para o original
    //Pars => transforma o JSON em uma string
    //Stringfy => converte os objeto para string 
    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //se o validar retornar um json de erro, iremos retornar ao app uma mesagem de erro (400)
            let validar = await validarDados(filme)
            if(validar){
                return validar
            }else{
                //encaminha os dados do filme para o DAO
                let result = await filmeDAO.insertFilme(filme)
                if(result){ //201
                    filme.id = result

                    message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = filme 
                }else{ //500
                    message.DEFAULT_MESSAGE.status      = message.ERROR_INTERNAL_SERVER_MODEL.status
                    message.DEFAULT_MESSAGE.status_code = message.ERROR_INTERNAL_SERVER_MODEL.status_code
                    message.DEFAULT_MESSAGE.message     = message.ERROR_INTERNAL_SERVER_MODEL.message
                }

                return  message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_UNSUPORTED_MEDIA_TYPE
        }

    } catch (error) {
        return  message.ERROR_INTERNAL_SERVER_CONTROLLER
    }

   
}

//função para atualizar um filme
const atualizarFIlme= async (filme, id, contentType) =>{
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //se o validar retornar um json de erro, iremos retornar ao app uma mesagem de erro (400)

            let resultBuscarId = await buscarFilme(id)

            //se a funçao buscar não encontrar o filme o atributo status no json será falso 
                // isso siginifica que o filme não existe na base
            if(!resultBuscarId.status)
                return resultBuscarId //400 ou //404 ou //500

            let validar = await validarDados(filme)
            if(validar){
                return validar //status code 400
            }else{
                //adiciona o atributo id do filme no json para ser enviado ao DAO
                filme.id = id

                //encaminha os dados do filme para o DAO
                let result = await filmeDAO.updateFilme(filme)
                if(result){ //200
                    message.DEFAULT_MESSAGE.status      = message.SUCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code //status code 200
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = filme
                }else{ //500
                    message.DEFAULT_MESSAGE.status      = message.ERROR_INTERNAL_SERVER_MODEL.status
                    message.DEFAULT_MESSAGE.status_code = message.ERROR_INTERNAL_SERVER_MODEL.status_code //status code 500
                    message.DEFAULT_MESSAGE.message     = message.ERROR_INTERNAL_SERVER_MODEL.message
                }

                return  message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_UNSUPORTED_MEDIA_TYPE //status code 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //status code 500
    }
}

//função para retornar todos os filmes
const listarFilme = async () =>{
    //outra maneira de clonar um objeto sem ter que transformar em string
    let message = JSON.parse(JSON.stringify(message_config))

    try{
        //executa a função que retorna todos os filmes
        let result = await filmeDAO.selectAllFilme()

        if(result){
            if(result.length > 0){
                //percorre o array de filmes para identificar os dados da classificação
                for (filme of result[0]){
                    let resultClassificacao = await classifcacaoController.buscarClassificacaoIndicativa(filme.id_classificacao)
                    


                    if(resultClassificacao.status){
                        filme.classifcacao = resultClassificacao.response.classificacao
                        delete filme.id_classificacao
                    }
                }


                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filme : result[0]}

                return message.DEFAULT_MESSAGE //status code 200
            }

            return message.ERROR_NOT_FOUND //status code 404
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //status code 500
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //status code 500
    }
}

//função para buscar um filme pelo id
const buscarFilme = async (id) =>{
    let message = JSON.parse(JSON.stringify(message_config))
    try{
        if( id == undefined || isNaN(id) || String(id) == ''  || id == null){
            //validação para id incorreto
            message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_REQUEST
        }

        let result = await filmeDAO.selectByIdFilme(id)

        if(result){
            if(result[0].length > 0){
                //percorre o array de filmes para identificar os dados da classificação
                for (filme of result[0]){
                    let resultClassificacao = await classifcacaoController.buscarClassificacaoIndicativa(filme.id_classificacao)
                    


                    if(resultClassificacao.status){
                        filme.classifcacao = resultClassificacao.response.classificacao
                        delete filme.id_classificacao
                    }
                }
                
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response = {filme : result[0]}

                return message.DEFAULT_MESSAGE //status code 200
            }
           return message.ERROR_NOT_FOUND //status 404
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //status 500
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //status 500
    }
}

//função para excluir um filme
const excluirFilme = async (id) =>{
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        let resultBuscarId = await buscarFilme(id)
        if(!resultBuscarId.status)
            return resultBuscarId //400 ou //404 ou //500

        let result = filmeDAO.deleteFilme(id)

        if(result){ //200
            message.DEFAULT_MESSAGE.status      = message.SUCESS_DELETED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCESS_DELETED_ITEM.message
        }else{ //500
            message.DEFAULT_MESSAGE.status      = message.ERROR_INTERNAL_SERVER_MODEL.status
            message.DEFAULT_MESSAGE.status_code = message.ERROR_INTERNAL_SERVER_MODEL.status_code
            message.DEFAULT_MESSAGE.message     = message.ERROR_INTERNAL_SERVER_MODEL.message
        }
        return  message.DEFAULT_MESSAGE
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para validar todos os dados de filme (obrigatórios, quantidade de caracteres, etc...)
const validarDados = async (filme) =>{
    let message = JSON.parse(JSON.stringify(message_config))

    //validação de dados para os atributos do filme que retorna um 400
    if(filme.nome == undefined || filme.nome == "" || filme.nome.length > 80  || filme.nome == null){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'

        //return message.ERROR_BAD_REQUEST //erro 400
    }else if(filme.data_lancamento == undefined || filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA] INVÁLIDO'
    }else if(filme.duracao == undefined || filme.duracao == "" || filme.duracao == null || filme.duracao.length > 8){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
    }else if(filme.sinopse == undefined || filme.sinopse == "" || filme.sinopse == null){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
    }else if(isNaN(filme.avaliacao) || parseFloat(filme.avaliacao).toFixed(2).length > 5 || parseFloat(filme.avaliacao) > 10){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
    }else if( filme.valor == undefined || filme.valor == '' || isNaN(filme.valor) || filme.valor == null || parseFloat(filme.valor).toFixed(2).length > 6){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    }else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'

    //Validação para a FK da classificação
    }else if(filme.id_classificacao == undefined || filme.id_classificacao == "" || filme.id_classificacao == null || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0){
        message.ERROR_BAD_REQUEST.field = '[ID_CLASSIFICAÇÃO] INVÁLIDO'
    }else{
        return false
    }
    return message.ERROR_BAD_REQUEST //status code 400
}

module.exports = {
    inserirNovoFilme,
    atualizarFIlme,
    listarFilme,
    buscarFilme,
    excluirFilme
}