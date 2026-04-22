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
            return true
        else
            return false
    } catch (error) {

        // console.log(error)
        return false
    }

    
}

//função par aatualizar um filme existente na tabela
const updateFilme = async (filme) =>{

}

//Retorna todos dados da tabela de filmes
const selectAllFilme = async () =>{

}

//função para retornar os dados do filme filtrando pelo id
const selectByIdFilme = async (id) => {

}

//função que deleta um filme da tabela
const deleteFilme = async (id) => {

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}