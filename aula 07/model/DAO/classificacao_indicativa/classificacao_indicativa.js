/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela classificação indicativa
 * Data: 06/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//import da biblioteca para gerenciar banco de dados no nodeJs
const knex = require('knex')
//import do arquivo de configuração para conexão com banco de dados mySQL
const knexConfig = require('../../database_config_knex/knexFile.js')
//criar a conexão com o banco de dados mySQL
const knexConex = knex(knexConfig.development)

//funcao de inserir uma nova classificação indicativa
const insertClassificacaoIndicativa = async (classificacao) =>{
    try {
        let sql = ` INSERT INTO tbl_classificacao_indicativa (classificacao) VALUES ('${classificacao.classificacao}');`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateClassificacaoIndicativa = async (classificacao, id) =>{
    try {
        let sql = `UPDATE tbl_classificacao_indicativa set 
                    classificacao = ${classificacao.classificacao}
                   WHERE id = ${id}`
        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        
        return false
    }
}

const selectAllClassificacaoIndicativa = async () => {
    try {
        let sql = `SELECT * FROM tbl_classificacao_indicativa`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdClassificacaoIndicativa = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_classificacao_indicativa WHERE id = ${id}`

        let result = await knexConex.raw(sql)
        

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteClassificacaoIndicativa = async (id) => {
    try {
        let sql = `DELETE FROM tbl_classificacao_indicativa WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertClassificacaoIndicativa,
    updateClassificacaoIndicativa,
    selectAllClassificacaoIndicativa,
    selectByIdClassificacaoIndicativa,
    deleteClassificacaoIndicativa
}