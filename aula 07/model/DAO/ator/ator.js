/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela ator
 * Data: 13/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knex/knexFile.js')

const knexConex = knex(knexConfig.development)


//função para inserir dados na tabela de ator
const insertAtor = async (ator) =>{
    try {
        let sql = ` INSERT INTO tbl_ator (nome, data_nascimento, data_inicio_carreira, data_termino_carreira, data_falecimento, biografia)
                VALUES (
                '${ator.nome}',
                '${ator.data_nascimento}',
                '${ator.data_inicio_carreira}',
                if('${ator.data_termino_carreira}' = '', null, '${ator.data_termino_carreira}'),
                if('${ator.data_falecimento}' = '', null, '${ator.data_falecimento}'),
                if('${ator.biografia}' = '', null, '${ator.biografia}')
                );`

        //executar o script sql no banco de dados
        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId //retorna o id gerado no banco
        else
            return false
    } catch (error) {
        return false
    }

    
}

//função par aatualizar um ator existente na tabela
const updateAtor = async (ator, id) =>{
    try{

        let sql = `UPDATE tbl_ator set 
                nome                    = "${ator.nome}",
                data_nascimento         = "${ator.data_nascimento}",
                data_inicio_carreira    = "${ator.data_inicio_carreira}",
                data_termino_carreira   = if("${ator.data_termino_carreira}" = '', null, '${ator.data_termino_carreira}'),
                data_falecimento        = if('${ator.data_falecimento}' = '', null, '${ator.data_falecimento}'),
                biografia               = if("${ator.biografia}" = '', null, '${ator.biografia}')
               WHERE id = ${id}`

        //execução do script no banco
        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    }catch(error){
        return false
    }
    

}

//Retorna todos dados da tabela de atores
const selectAllAtor = async () =>{
    try{
        //script sql para selecionar todos os atores ordenando por id
        let sql = `SELECT * FROM tbl_ator ORDER BY id DESC`

        let result = await knexConex.raw(sql)


        if(Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//função para retornar os dados do ator filtrando pelo id
const selectByIdAtor = async (id) => {

     try{
        //script sql para selecionar todos os ators ordenando por id
        let sql = `SELECT * FROM tbl_ator WHERE id = ${id} `

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//função que deleta um ator da tabela
const deleteAtor = async (id) => {
    try {
        let sql = `DELETE FROM tbl_ator WHERE id = ${id}`

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
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}