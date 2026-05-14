/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela diretor
 * Data: 13/05/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knex/knexFile.js')

const knexConex = knex(knexConfig.development)


//função para inserir dados na tabela de diretor
const insertDiretor = async (diretor) =>{
    try {
        let sql = ` INSERT INTO tbl_diretor (nome, data_nascimento, data_inicio_carreira, data_termino_carreira, data_falecimento, biografia)
                VALUES (
                '${diretor.nome}',
                '${diretor.data_nascimento}',
                '${diretor.data_inicio_carreira}',
                if('${diretor.data_termino_carreira}' = '', null, '${diretor.data_termino_carreira}'),
                if('${diretor.data_falecimento}' = '', null, '${diretor.data_falecimento}'),
                if('${diretor.biografia}' = '', null, '${diretor.biografia}')
                );`

        //executar o script sql no banco de dados
        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId //retorna o id gerado no banco
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }

    
}

//função par aatualizar um diretor existente na tabela
const updateDiretor = async (diretor, id) =>{
    try{

        let sql = `UPDATE tbl_diretor set 
                nome                    = "${diretor.nome}",
                data_nascimento         = "${diretor.data_nascimento}",
                data_inicio_carreira    = "${diretor.data_inicio_carreira}",
                data_termino_carreira   = if("${diretor.data_termino_carreira}" = '', null, '${diretor.data_termino_carreira}'),
                data_falecimento        = if('${diretor.data_falecimento}' = '', null, '${diretor.data_falecimento}'),
                biografia               = if("${diretor.biografia}" = '', null, '${diretor.biografia}')
               WHERE id = ${id}`

        //execução do script no banco
        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    }catch(error){
        console.log(error)
        return false
    }
    

}

//Retorna todos dados da tabela de diretores
const selectAllDiretor = async () =>{
    try{
        //script sql para selecionar todos os diretores ordenando por id
        let sql = `SELECT * FROM tbl_diretor ORDER BY id DESC`

        let result = await knexConex.raw(sql)


        if(Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//função para retornar os dados do diretor filtrando pelo id
const selectByIdDiretor = async (id) => {

     try{
        //script sql para selecionar todos os diretors ordenando por id
        let sql = `SELECT * FROM tbl_diretor WHERE id = ${id} `

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//função que deleta um diretor da tabela
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