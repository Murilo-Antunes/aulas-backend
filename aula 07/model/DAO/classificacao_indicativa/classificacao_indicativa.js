/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela classificação indicativa
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//import do knex
const knex = require('knex')

//import da configuração do knex
const knexConfig = require('../../database_config_knex.js')

//variavel que permite a conexão ao banco de dados
const knexConex = knex(knexConfig.development)

//funcao de inserir uma nova classificação indicativa
const insertClassificacaoIndicativa = async (classificacao) =>{
    try {
        let sql = ` INSERT INTO tbl_classificacao_indicativa (classificacao)
                    VALUES(${classificacao.classificacao});`

        let result = await knexConex(sql)

        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateClassificacaoIndicativa = () =>{

}

const selectAllClassificacaoIndicativa = () => {

}

const selectByIdClassificacaoIndicativa = () =>{

}

const deleteClassificacaoIndicativa = () => {

}

module.exports = {
    insertClassificacaoIndicativa
}