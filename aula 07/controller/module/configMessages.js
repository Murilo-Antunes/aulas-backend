/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pela configuração e padronização das mensagens da api 
 * Data: 17/04/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//Padronização de cabeçalho para retorno dos endpoints da api
const DEFAULT_MESSAGE = {
    api_description: 'API para gerenciar o controle de filmes',
    development: 'Murilo Antunes Campos',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}


//mensagens de erro da api
const ERROR_BAD_REQUEST= {
    status: false,
    status_code: 400,
    message: 'Os dados enviados na requisição não estão corretos'
}

const ERROR_INTERNAL_SERVER_MODEL= {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição por conta de erro da API {ERRO NA MODELAGEM DE DADOS}'
}

const ERROR_INTERNAL_SERVER_CONTROLLER= {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição por conta de erro da API {ERRO NA CONTROLLER}'
}

const ERROR_UNSUPORTED_MEDIA_TYPE= {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição pois o formato de dados aceito pela API é somente JSON'
}

const SUCESS_CREATED_ITEM ={
    status: true,
    status_code: 201,
    message: 'Registros inseridos com sucesso'
}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_UNSUPORTED_MEDIA_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER
}
