/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela gênero
 * Data: 08/05/2026
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
const insertNacionalidade = async (nacionalidade) =>{
    try {
        let sql = ` INSERT INTO tbl_nacionalidade (pais, sigla) VALUES (
        "${String(nacionalidade.pais).toUpperCase()}",
        "${String(nacionalidade.sigla).toUpperCase()}");`
        
        let result = await knexConex.raw(sql)
        
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateNacionalidade = async (nacionalidade, id) =>{
    try {
        
        let sql = `UPDATE tbl_nacionalidade set 
                    pais = "${nacionalidade.pais}",
                    sigla = "${nacionalidade.sigla}"
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

const selectAllNacionalidade = async () => {
    try {
        let sql = `SELECT * FROM tbl_nacionalidade`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdNacionalidade = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_nacionalidade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteNacionalidade = async (id) => {
    try {
        let sql = `DELETE FROM tbl_nacionalidade WHERE id = ${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}