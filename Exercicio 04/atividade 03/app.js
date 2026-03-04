/***********************************************************************************************
 * Objetivo: Arquivo responsável pelas entradas e saídas de dados da aplicação
 * Data: 04/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const readline = require('readline') // importa o readline
const tabuada = require('./module/tabuada') // importa a classe tabuada

//função necessária para fundir todo o exercicio em um único app, evitando a criação repetida de interfaces para entrada de dados
const tabuadaApp = function(entrada){ //recebe de argumento uma entrada de dados que, neste caso, vem do main.js
    let entradaDeDados = entrada
    entradaDeDados.question("Digite a tabuada inicial a ser calculada: ", function(tIncial){
        let tabuadaIncial =  tIncial
        entradaDeDados.question("Digite a tabauda final a ser calculada: ", function(tFinal){
            let tabuadaFinal = tFinal
            entradaDeDados.question("Digite o número inicial do contador da tabuada: ", function(nInicial){
                let numeroIncial = nInicial
                entradaDeDados.question("Digite o número final do contador da tabuada: ", function(nFinal){
                    let numeroFinal = nFinal
                    tabuada.gerarTabuada(tabuadaIncial, tabuadaFinal, numeroIncial, numeroFinal) //chama a função de gerar tabuada passando seus argumentos
                    entradaDeDados.close()
                })
            })
        })
    })
}

//exporta a função
module.exports = {
    tabuadaApp
}