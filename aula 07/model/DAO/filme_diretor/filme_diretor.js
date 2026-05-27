/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela filme_diretor
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
const insertFilmeDiretor = async (filmeDiretor) =>{
    try {
        let sql = ` INSERT INTO tbl_filme_diretor (id_filme, id_diretor) VALUES (${filmeDiretor.id_filme + ',' + filmeDiretor.id_diretor});`
        
        let result = await knexConex.raw(sql)
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateFilmeDiretor = async (filmeDiretor, id) =>{
    try {
        let sql = `UPDATE tbl_filme_diretor set 
                    id_filme = ${filmeDiretor.id_filme},
                    id_diretor = ${filmeDiretor.id_diretor}
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

const selectAllFilmeDiretor = async () => {
    try {
        let sql = `SELECT * FROM tbl_filme_diretor`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdFilmeDiretor = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_filme_diretor WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectFilmesByIdDiretor = async (idDiretor) =>{
    try {
        let sql = `SELECT tbl_filme.* 
                    FROM tbl_filme
                        INNER JOIN tbl_filme_diretor
                            ON tbl_filme.id = tbl_filme_diretor.id_filme
                        INNER JOIN tbl_diretor
                            ON tbl_diretor.id = tbl_filme_diretor.id_diretor
                    WHERE tbl_diretor.id = ${idDiretor}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectDiretoresByIdFilme = async (idFilme) =>{
    try {
        let sql = `SELECT tbl_diretor.* 
                    FROM tbl_filme
                        INNER JOIN tbl_filme_diretor 
                            ON tbl_filme.id = tbl_filme_diretor.id_filme
                        INNER JOIN tbl_diretor
                            ON tbl_diretor.id = tbl_filme_diretor.id_diretor
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

const deleteFilmeDiretor = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteDiretorByIdFilme = async (idFilme) =>{
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id_filme = ${idFilme}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteFilmeByIdDiretor = async (idDiretor) => {
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id_diretor = ${idDiretor}`

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
    insertFilmeDiretor,
    updateFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    selectFilmesByIdDiretor,
    selectDiretoresByIdFilme,
    deleteFilmeDiretor,
    deleteDiretorByIdFilme,
    deleteFilmeByIdDiretor
}