/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela atorAtividade
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
const insertAtorAtividade = async (atorAtividade) =>{
    try {
        let sql = ` INSERT INTO tbl_ator_atividade (id_atividade, id_ator) VALUES (${atorAtividade.id_atividade + ',' + atorAtividade.id_ator});`
        
        let result = await knexConex.raw(sql)
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtorAtividade = async (atorAtividade, id) =>{
    try {
        let sql = `UPDATE tbl_ator_atividade set 
                    id_atividade = ${atorAtividade.id_atividade},
                    id_ator = ${atorAtividade.id_ator}
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

const selectAllAtorAtividade = async () => {
    try {
        let sql = `SELECT * FROM tbl_ator_atividade`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdAtorAtividade = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_ator_atividade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectAtoresByIdAtividade = async (idAtividade) =>{
    try {
        let sql = `SELECT tbl_ator.* 
                    FROM tbl_ator
                        INNER JOIN tbl_ator_atividade 
                            ON tbl_ator.id = tbl_ator_atividade.id_ator
                        INNER JOIN tbl_atividade
                            ON tbl_atividade.id = tbl_ator_atividade.id_atividade
                    WHERE tbl_atividade.id = ${idAtividade}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectAtividadesByIdAtor = async (idAtor) =>{
    try {
        let sql = `SELECT tbl_atividade.* 
                    FROM tbl_ator
                        INNER JOIN tbl_ator_atividade 
                            ON tbl_ator.id = tbl_ator_atividade.id_ator
                        INNER JOIN tbl_atividade
                            ON tbl_atividade.id = tbl_ator_atividade.id_atividade
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

const deleteAtorAtividade = async (id) => {
    try {
        let sql = `DELETE FROM tbl_ator_atividade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtorByIdAtividade = async (idAtividade) =>{
    try {
        let sql = `DELETE FROM tbl_ator_atividade WHERE id_atividade = ${idAtividade}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtividadeByIdAtor = async (idAtor) => {
    try {
        let sql = `DELETE FROM tbl_ator_atividade WHERE id_ator = ${idAtor}`

        

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
    insertAtorAtividade,
    updateAtorAtividade,
    selectAllAtorAtividade,
    selectByIdAtorAtividade,
    selectAtividadesByIdAtor,
    selectAtoresByIdAtividade,
    deleteAtorByIdAtividade,
    deleteAtorAtividade,
    deleteAtividadeByIdAtor
}