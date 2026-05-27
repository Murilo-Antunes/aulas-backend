/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela filme_ator
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

//funcao de inserir um novo filme_ator
const insertFilmeAtor = async (filmeAtor) =>{
    try {
        let sql = ` INSERT INTO tbl_filme_ator (id_filme, id_ator) VALUES (${filmeAtor.id_filme + ',' + filmeAtor.id_ator});`
        
        let result = await knexConex.raw(sql)
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateFilmeAtor = async (filmeAtor, id) =>{
    try {
        let sql = `UPDATE tbl_filme_ator set 
                    id_filme = ${filmeAtor.id_filme},
                    id_ator = ${filmeAtor.id_ator}
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

const selectAllFilmeAtor = async () => {
    try {
        let sql = `SELECT * FROM tbl_filme_ator`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdFilmeAtor = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_filme_ator WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectFilmesByIdAtor = async (idAtor) =>{
    try {
        let sql = `SELECT tbl_filme.* 
                    FROM tbl_filme
                        INNER JOIN tbl_filme_ator 
                            ON tbl_filme.id = tbl_filme_ator.id_filme
                        INNER JOIN tbl_ator
                            ON tbl_ator.id = tbl_filme_ator.id_ator
                    WHERE tbl_ator.id = ${idAtor}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectAtoresByIdFilme = async (idFilme) =>{
    try {
        let sql = `SELECT tbl_ator.* 
                    FROM tbl_filme
                        INNER JOIN tbl_filme_ator 
                            ON tbl_filme.id = tbl_filme_ator.id_filme
                        INNER JOIN tbl_ator
                            ON tbl_ator.id = tbl_filme_ator.id_ator
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

const deleteFilmeAtor = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme_ator WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtorByIdFilme = async (idFilme) =>{
    try {
        let sql = `DELETE FROM tbl_filme_ator WHERE id_filme = ${idFilme}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteFilmeByIdAtor = async (idAtor) => {
    try {
        let sql = `DELETE FROM tbl_filme_ator WHERE id_ator = ${idAtor}`

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
    insertFilmeAtor,
    updateFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    selectFilmesByIdAtor,
    selectAtoresByIdFilme,
    deleteFilmeAtor,
    deleteAtorByIdFilme,
    deleteFilmeByIdAtor
}