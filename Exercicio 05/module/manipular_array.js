/* *********************************************************************
* Objetivo: manipular uma lista de estados
* Data: 16/03/2026  
* Autor: Murilo
* **********************************************************************/
/* 
Criar uma função (getListaDeEstados) que retorna a lista de todos os
estados do Brasil.

Criar uma função (getDadosEstado) que retorna as informações referente
a um estado do Brasil, onde a sigla do estado será o critério de filtro.

Criar uma função (getCapitalEstado) que retorna as informações referente
a capital de um estado do Brasil, onde a sigla do estado será o critério de
filtro.

Criar uma função (getEstadosRegiao) que retorna as informações
referente aos estados do Brasil conforme a sua região, onde a região será o
critério de filtro.

Criar uma função (getCapitalPais) que retorna as informações referente
aos estados que formam a capital do Brasil.


Criar uma função (getCidades) que retorna uma lista de cidades, filtrado
pela sigla do estado.

https://drive.google.com/drive/folders/16pVimM4AqFNkS74zX4QKlXvEFGVdQzHw
*/

const json = require('./estados_cidades')

const getListaDeEstados = function(){
    let sigla = []
    json.listaDeEstados.estados.forEach(function(estado){
        sigla.push(estado.sigla)
    })
    let estado = {
        'UF' : sigla,
        'Quantidade' : sigla.length
    } 

    return estado
}

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

console.log(getDadosEstado('al'))
