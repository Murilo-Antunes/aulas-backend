/* *********************************************************************
* Objetivo: manipular uma lista de estados
* Data: 16/03/2026  
* Autor: Murilo
* **********************************************************************/

const json = require('./estados_cidades')

//retorna a lista de todos os estados do Brasil.
const getListaDeEstados = function(){
    let sigla = []
    let estado = false
    json.listaDeEstados.estados.forEach(function(uf){
        sigla.push(uf.sigla)
    })
    estado = {
        'UF' : sigla,
        'Quantidade' : sigla.length
    } 

    return estado
}

//que retorna as informações referente a um estado do Brasil, onde a sigla do estado será o critério de filtro.
const getDadosEstado = function(sigla){
    let siglaRecebida = sigla
    let estado = false
    json.listaDeEstados.estados.forEach(function(uf){
        if(String(uf.sigla).toLowerCase() === String(siglaRecebida).toLowerCase()){
            estado = {
                "uf: " : uf.sigla,
                "descricao: " : uf.nome,
                "capital: ": uf.capital,
                "região: ": uf.regiao
            }
        }
    })
    return estado
}

//retorna as informações referente a capital de um estado do Brasil, onde a sigla do estado será o critério de filtro.
const getCapitalEstado = function(sigla){
    let siglaRecebida = sigla
    let capital = false
    json.listaDeEstados.estados.forEach(function(uf){
        if(String(uf.sigla).toLowerCase() === String(siglaRecebida).toLowerCase()){
            capital = {
                "uf: " : uf.sigla,
                "descricao: " : uf.nome,
                "capital: ": uf.capital
            }
        }
    })
    return capital
}

//retorna as informações referente aos estados do Brasil conforme a sua região, onde a região será o critério de filtro.
const getEstadosRegiao = function(regiao){
    let regiaoRecebida = regiao
    let informacoesRegiao = false
    let arrayEstados = []
    json.listaDeEstados.estados.forEach(function(uf){
        if(String(uf.regiao).toLowerCase() === String(regiaoRecebida).toLowerCase()){
            let informacoesEstado = {"uf: " : uf.sigla, "descrição: " : uf.nome }
            arrayEstados.push(informacoesEstado)
            informacoesRegiao = {
                "Região" : String(regiaoRecebida).toUpperCase(),
                "estados" : arrayEstados
            }

        }
    })
    return informacoesRegiao
}

//retorna as informações referente aos estados que formam a capital do Brasil.
const getCapitalPais = function(){
    let objeto = false
    let arrayEstados = []
    json.listaDeEstados.estados.forEach(function(objeto_callback){
        if(objeto_callback.capital_pais){
            let informacaoPais = {
                "capital_atual: ": objeto_callback.capital_pais.capital,
                "uf: " : objeto_callback.sigla,
                "descrição: " : objeto_callback.nome,
                "capital: " : objeto_callback.capital,
                "região: " : objeto_callback.regiao,
                "capital_pais_ano_incio: " : objeto_callback.capital_pais.ano_inicio,
                "capital_pais_ano_termino: " : objeto_callback.capital_pais.ano_fim
            }

            arrayEstados.push(informacaoPais)
            objeto = {"capitais: " : arrayEstados}
        }
    })
    return objeto
}

//retorna uma lista de cidades, filtrado pela sigla do estado.
const getCidades = function(sigla){
    let siglaRecebida = sigla
    let arrCidades = []
    let estado = false
    json.listaDeEstados.estados.forEach(function(uf){
        if(String(uf.sigla).toLowerCase() === String(siglaRecebida).toLowerCase()){
            uf.cidades.forEach(function(cidade){
                arrCidades.push(cidade.nome)
            })

            estado = {
                "uf: " : uf.sigla,
                "descricao: " : uf.nome,
                "quantidade_cidades: ": uf.cidades.length,
                "cidades: ": arrCidades
            }
        }
    })
    return estado
}

module.exports = {
    getCapitalEstado,
    getCapitalPais,
    getCidades,
    getDadosEstado,
    getEstadosRegiao,
    getListaDeEstados
}
