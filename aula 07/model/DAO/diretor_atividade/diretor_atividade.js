/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela diretorAtividade
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
const insertDiretorAtividade = async (diretorAtividade) =>{
    try {
        let sql = ` INSERT INTO tbl_diretor_atividade (id_atividade, id_diretor) VALUES (${diretorAtividade.id_atividade + ',' + diretorAtividade.id_diretor});`
        
        let result = await knexConex.raw(sql)
        
        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateDiretorAtividade = async (diretorAtividade, id) =>{
    try {
        let sql = `UPDATE tbl_diretor_atividade set 
                    id_atividade = ${diretorAtividade.id_atividade},
                    id_diretor = ${diretorAtividade.id_diretor}
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

const selectAllDiretorAtividade = async () => {
    try {
        let sql = `SELECT * FROM tbl_diretor_atividade`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdDiretorAtividade = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_diretor_atividade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectDiretoresByIdAtividade = async (idAtividade) =>{
    try {
        let sql = `SELECT tbl_diretor.* 
                    FROM tbl_diretor
                        INNER JOIN tbl_diretor_atividade 
                            ON tbl_diretor.id = tbl_diretor_atividade.id_diretor
                        INNER JOIN tbl_atividade
                            ON tbl_atividade.id = tbl_diretor_atividade.id_atividade
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

const selectAtividadesByIdDiretor = async (idDiretor) =>{
    try {
        let sql = `SELECT tbl_atividade.* 
                    FROM tbl_diretor
                        INNER JOIN tbl_diretor_atividade 
                            ON tbl_diretor.id = tbl_diretor_atividade.id_diretor
                        INNER JOIN tbl_atividade
                            ON tbl_atividade.id = tbl_diretor_atividade.id_atividade
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

const deleteDiretorAtividade = async (id) => {
    try {
        let sql = `DELETE FROM tbl_diretor_atividade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteDiretorByIdAtividade = async (idAtividade) =>{
    try {
        let sql = `DELETE FROM tbl_diretor_atividade WHERE id_atividade = ${idAtividade}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtividadeByIdDiretor = async (idDiretor) => {
    try {
        let sql = `DELETE FROM tbl_diretor_atividade WHERE id_diretor = ${idDiretor}`

        

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
    insertDiretorAtividade,
    updateDiretorAtividade,
    selectAllDiretorAtividade,
    selectByIdDiretorAtividade,
    selectAtividadesByIdDiretor,
    selectDiretoresByIdAtividade,
    deleteDiretorByIdAtividade,
    deleteDiretorAtividade,
    deleteAtividadeByIdDiretor
}