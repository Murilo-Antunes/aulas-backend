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
const insertGenero = async (genero) =>{
    try {
        let sql = ` INSERT INTO tbl_genero (genero) VALUES ('${genero.genero}');`
        
        let result = await knexConex.raw(sql)
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateGenero = async (genero, id) =>{
    try {
        let sql = `UPDATE tbl_genero set 
                    genero = ${genero.genero}
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

const selectAllGenero = async () => {
    try {
        let sql = `SELECT * FROM tbl_genero`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdGenero = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_genero WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteGenero = async (id) => {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${id}`

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
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}