/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela filme_gênero
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
const insertFilmeGenero = async (filmeGenero) =>{
    try {
        let sql = ` INSERT INTO tbl_filme_genero (id_filme, id_genero) VALUES (${filmeGenero.id_filme}, ${filmeGenero.id_genero});`
        
        let result = await knexConex.raw(sql)
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateFilmeGenero = async (filmeGenero, id) =>{
    try {
        let sql = `UPDATE tbl_filme_genero set 
                    id_filme = ${filmeGenero.id_filme},
                    id_genero = ${filmeGenero.id_genero}
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

const selectAllFilmeGenero = async () => {
    try {
        let sql = `SELECT * FROM tbl_filme_genero`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdFilmeGenero = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_filme_genero WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectFilmesByIdGenero = async (idGenero) =>{
    try {
        let sql = `SELECT tbl_filme.* 
                    FROM tbl_filme
                        INNER JOIN tbl_filme_genero 
                            ON tbl_filme.id = tbl_filme_genero.id_filme
                        INNER JOIN tbl_genero
                            ON tbl_genero.id = tbl_filme_genero.id_genero
                    WHERE tbl_genero.id = ${idGenero}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectGenerosByIdFilme = async (idFilme) =>{
    try {
        let sql = `SELECT tbl_filme.* 
                    FROM tbl_filme
                        INNER JOIN tbl_filme_genero 
                            ON tbl_filme.id = tbl_filme_genero.id_filme
                        INNER JOIN tbl_genero
                            ON tbl_genero.id = tbl_filme_genero.id_genero
                    WHERE tbl_filme.id = ${idFilme}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteFilmeGenero = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme_genero WHERE id = ${id}`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectFilmesByIdGenero,
    selectGenerosByIdFilme
}