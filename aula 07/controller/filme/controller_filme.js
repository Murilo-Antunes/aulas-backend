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

//função para inserir um novo filme
const inserirNovoFilme = async (filme) =>{
    //realiza uma copia da estrutura do JSON de forma que não modifica para o original
        //Pars => transforma o JSON em uma string
        //Stringfy => converte os objeto para string 
    let message = JSON.parse(JSON.stringify(message_config))

    //validação de dados para os atributos do filme que retorna um 400
    if(filme.nome == "" || filme.nome.length > 80  || filme.nome == null || filme.nome == undefined){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'

        //return message.ERROR_BAD_REQUEST //erro 400
    }else if(filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA] INVÁLIDO'

    }else if(filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'

    }else if(filme.sinopse == "" || filme.sinopse == null || filme.sinopse == undefined){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'

    }else if(isNaN(filme.avalicao) || filme.avalicao.length > 3){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'

    }else if(filme.valor == '' || isNaN(filme.valor) || filme.valor == null || filme.valor == undefined || filme.valor.length > 5){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'

    }else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        
    }else{
        let result = await filmeDAO.insertFilme(filme)
        if(result){ //201
            message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message
        }else{ //400
            message.DEFAULT_MESSAGE.status      = message.ERROR_BAD_REQUEST.status
            message.DEFAULT_MESSAGE.status_code = message.ERROR_BAD_REQUEST.status_code
            message.DEFAULT_MESSAGE.message     = message.ERROR_BAD_REQUEST.message
        }

        return  message.DEFAULT_MESSAGE
    }
}

//função para atualizar um filme
const atualizarFIlme= async () =>{

}

//função para retornar todos os filmes
const listaFilme = async () =>{

}

//função para buscar um filme pelo id
const buscarFilme = async () =>{

}

//função para excluir um filme
const excluirFilme = async () =>{

}

module.exports = {
    inserirNovoFilme,
    atualizarFIlme,
    listaFilme,
    buscarFilme,
    excluirFilme
}