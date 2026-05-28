/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela atorNacionalidade
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

//funcao de inserir um novo ator nacionalidade
const insertAtorNacionalidade = async (atorNacionalidade) =>{
    try {
        let sql = ` INSERT INTO tbl_ator_nacionalidade (id_nacionalidade, id_ator) VALUES (${atorNacionalidade.id_nacionalidade + ',' + atorNacionalidade.id_ator});`
        
        let result = await knexConex.raw(sql)
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtorNacionalidade = async (atorNacionalidade, id) =>{
    try {
        let sql = `UPDATE tbl_ator_nacionalidade set 
                    id_nacionalidade = ${atorNacionalidade.id_nacionalidade},
                    id_ator = ${atorNacionalidade.id_ator}
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

const selectAllAtorNacionalidade = async () => {
    try {
        let sql = `SELECT * FROM tbl_ator_nacionalidade`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdAtorNacionalidade = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_ator_nacionalidade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectAtoresByIdNacionalidade = async (idNacionalidade) =>{
    try {
        let sql = `SELECT tbl_ator.* 
                    FROM tbl_ator
                        INNER JOIN tbl_ator_nacionalidade 
                            ON tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        INNER JOIN tbl_nacionalidade
                            ON tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
                    WHERE tbl_nacionalidade.id = ${idNacionalidade}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectNacionalidadesByIdAtor = async (idAtor) =>{
    try {
        let sql = `SELECT tbl_nacionalidade.* 
                    FROM tbl_ator
                        INNER JOIN tbl_ator_nacionalidade 
                            ON tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        INNER JOIN tbl_nacionalidade
                            ON tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
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

const deleteAtorNacionalidade = async (id) => {
    try {
        let sql = `DELETE FROM tbl_ator_nacionalidade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtorByIdNacionalidade = async (idNacionalidade) =>{
    try {
        let sql = `DELETE FROM tbl_ator_nacionalidade WHERE id_nacionalidade = ${idNacionalidade}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteNacionalidadeByIdAtor = async (idAtor) => {
    try {
        let sql = `DELETE FROM tbl_ator_nacionalidade WHERE id_ator = ${idAtor}`

        

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
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    selectAllAtorNacionalidade,
    selectByIdAtorNacionalidade,
    selectNacionalidadesByIdAtor,
    selectAtoresByIdNacionalidade,
    deleteAtorByIdNacionalidade,
    deleteAtorNacionalidade,
    deleteNacionalidadeByIdAtor
}