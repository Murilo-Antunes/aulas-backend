/*******************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela filme
 * Data: 15/04/2026
 * Autor: Murilo
 * Versão: 1.0
 *******************************************************************************************************************************/
//import da biblioteca para gerenciar banco de dados no nodeJs
const knex = require('knex')
//import do arquivo de configuração para conexão com banco de dados mySQL
const knexConfig = require('../../database_config_knex/knexFile.js')
//criar a conexão com o banco de dados mySQL
const knexConex = knex(knexConfig.development)


//função para inserir dados na tabela de filme
const insertFilme = async (filme) =>{
    try {
        let sql = ` INSERT INTO tbl_filme (nome, data_lancamento, duracao, sinopse, avaliacao, valor, capa)
                VALUES (
                '${filme.nome}',
		        '${filme.data_lancamento}',
		        '${filme.duracao}',
                '${filme.sinopse}',
                if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                '${filme.valor}',
                '${filme.capa}'
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

//função par aatualizar um filme existente na tabela
const updateFilme = async (filme) =>{
    try{
        //script para atualizar dados do banco

        let sql = `UPDATE tbl_filme set 
	            nome            = "${filme.nome}",
                data_lancamento = "${filme.data_lancamento}",
                duracao         = "${filme.duracao}",
                sinopse         = "${filme.sinopse}",
                avaliacao       = if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                valor           = "${filme.valor}",
                capa            = "${filme.capa}"
               WHERE id = ${filme.id}`

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

//Retorna todos dados da tabela de filmes
const selectAllFilme = async () =>{
    try{
        //script sql para selecionar todos os filmes ordenando por id
        let sql = `SELECT * FROM tbl_filme ORDER BY id DESC`

        let result = await knexConex.raw(sql)


        if(Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//função para retornar os dados do filme filtrando pelo id
const selectByIdFilme = async (id) => {

     try{
        //script sql para selecionar todos os filmes ordenando por id
        let sql = `SELECT * FROM tbl_filme WHERE id = ${id} `

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//função que deleta um filme da tabela
const deleteFilme = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme WHERE id = ${id}`

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
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}