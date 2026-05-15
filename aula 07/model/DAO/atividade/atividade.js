/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela atividade
 * Data: 15/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

//import da biblioteca para gerenciar banco de dados no nodeJs
const knex = require('knex')
//import do arquivo de configuração para conexão com banco de dados mySQL
const knexConfig = require('../../database_config_knex/knexFile.js')
//criar a conexão com o banco de dados mySQL
const knexConex = knex(knexConfig.development)

//funcao de inserir uma nova atividade
const insertAtividade = async (atividade) =>{
    try {
        let sql = ` INSERT INTO tbl_atividade (atividade) VALUES ('${String(atividade.atividade).toUpperCase()}');`
        
        let result = await knexConex.raw(sql)
        
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtividade = async (atividade, id) =>{
    try {
        
        let sql = `UPDATE tbl_atividade set 
                    atividade = "${atividade.atividade}"
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

const selectAllAtividade = async () => {
    try {
        let sql = `SELECT * FROM tbl_atividade`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdAtividade = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_atividade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteAtividade = async (id) => {
    try {
        let sql = `DELETE FROM tbl_atividade WHERE id = ${id}`

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
    insertAtividade,
    updateAtividade,
    selectAllAtividade,
    selectByIdAtividade,
    deleteAtividade
}