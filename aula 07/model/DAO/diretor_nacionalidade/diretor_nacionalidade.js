/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela diretorNacionalidade
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
const insertDiretorNacionalidade = async (diretorNacionalidade) =>{
    try {
        let sql = ` INSERT INTO tbl_diretor_nacionalidade (id_nacionalidade, id_diretor) VALUES (${diretorNacionalidade.id_nacionalidade + ',' + diretorNacionalidade.id_diretor});`
        
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

const updateDiretorNacionalidade = async (diretorNacionalidade, id) =>{
    try {
        let sql = `UPDATE tbl_diretor_nacionalidade set 
                    id_nacionalidade = ${diretorNacionalidade.id_nacionalidade},
                    id_diretor = ${diretorNacionalidade.id_diretor}
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

const selectAllDiretorNacionalidade = async () => {
    try {
        let sql = `SELECT * FROM tbl_diretor_nacionalidade`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdDiretorNacionalidade = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_diretor_nacionalidade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectDiretoresByIdNacionalidade = async (idNacionalidade) =>{
    try {
        let sql = `SELECT tbl_diretor.* 
                    FROM tbl_diretor
                        INNER JOIN tbl_diretor_nacionalidade 
                            ON tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        INNER JOIN tbl_nacionalidade
                            ON tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
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

const selectNacionalidadesByIdDiretor = async (idDiretor) =>{
    try {
        let sql = `SELECT tbl_nacionalidade.* 
                    FROM tbl_diretor
                        INNER JOIN tbl_diretor_nacionalidade 
                            ON tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        INNER JOIN tbl_nacionalidade
                            ON tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
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

const deleteDiretorNacionalidade = async (id) => {
    try {
        let sql = `DELETE FROM tbl_diretor_nacionalidade WHERE id = ${id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteDiretorByIdNacionalidade = async (idNacionalidade) =>{
    try {
        let sql = `DELETE FROM tbl_diretor_nacionalidade WHERE id_nacionalidade = ${idNacionalidade}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteNacionalidadeByIdDiretor = async (idDiretor) => {
    try {
        let sql = `DELETE FROM tbl_diretor_nacionalidade WHERE id_diretor = ${idDiretor}`

        

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
    insertDiretorNacionalidade,
    updateDiretorNacionalidade,
    selectAllDiretorNacionalidade,
    selectByIdDiretorNacionalidade,
    selectNacionalidadesByIdDiretor,
    selectDiretoresByIdNacionalidade,
    deleteDiretorByIdNacionalidade,
    deleteDiretorNacionalidade,
    deleteNacionalidadeByIdDiretor
}