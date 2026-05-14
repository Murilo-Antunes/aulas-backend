/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela diretor
 * Data: 06/05/2026
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
const insertDiretor = async (diretor) =>{
    try {
        let sql = ` INSERT INTO tbl_classificacao_indicativa (nome, data_nascimento, data_inicio_carreira, data_falecimento, data_termino_carreira, biografia) VALUES (
        '${diretor.nome}',
        '${diretor.data_nascimento}',
        '${diretor.data_inicio_carreira}',
        '${diretor.data_falecimento}',
        '${diretor.data_termino_carreira}',
        '${diretor.biografia}'
        );`
        
        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateDiretor = async (diretor, id) =>{
    try {
        let sql = `UPDATE tbl_diretor set 
                    nome                    = '${diretor.nome}',
                    data_nascimento         = '${diretor.data_nascimento}',
                    data_inicio_carreira    = '${diretor.data_inicio_carreira}',
                    data_falecimento        = '${diretor.falecimento}',
                    data_termino_carreira   = '${diretor.data_termino_carreira}',
                    biografia               = '${diretor.biografia}'

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

const selectAllDiretor = async () => {
    try {
        let sql = `SELECT * FROM tbl_diretor`

        let result = await knexConex.raw(sql)
        console.log(result)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const selectByIdDiretor = async (id) =>{
    try {
        let sql = `SELECT * FROM tbl_classificacao_indicativa WHERE id = ${id}`

        let result = await knexConex.raw(sql)
        

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteDiretor = async (id) => {
    try {
        let sql = `DELETE FROM tbl_diretor WHERE id = ${id}`

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
    insertDiretor,
    updateDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    deleteDiretor
}