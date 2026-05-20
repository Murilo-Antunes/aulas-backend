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
        let sql = ` INSERT INTO tbl_filme_diretor (id_filme, id_diretor) VALUES (${filmediretor.id_filme + ',' + filmediretor.id_diretor});`
        
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
        console.log(filmeDiretor)
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
        console.log(error)
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

module.exports = {
    insertFilmeDiretor,
    updateFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    deleteFilmeDiretor
}