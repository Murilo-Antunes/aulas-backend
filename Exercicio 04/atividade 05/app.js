/***********************************************************************************************
 * Objetivo: Arquivo responsável pelas entradas e saídas de dados da aplicação
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const readline = require('readline')
const imparPar = require('./module/ImparPar') 

//função necessária para fundir todo o exercicio em um único app, evitando a criação repetida de interfaces para entrada de dados
const imparParApp = function(entrada){ //recebe de argumento uma entrada de dados que, neste caso, vem do main.js
    let entradaDeDados = entrada
    entradaDeDados.question("Digite o número incial: ", function(nInicial){
        let numeroIncial = nInicial
        entradaDeDados.question("Digite o número final: ", function(nFinal){
            let numeroFinal = nFinal
            entradaDeDados.question("Deseja calcular apenas os Pares(p), apenas os Ímpares(i), ou Ambos(a): ", (escolha) =>{
                let escolhaUsuario = String(escolha).toLowerCase()
                //valida a escolha do usuário
                if(escolhaUsuario == "p"){
                    imparPar.calcularPar(numeroIncial, numeroFinal)
                    entradaDeDados.close()
                }else if(escolhaUsuario == "i"){
                    imparPar.calcularImpar(numeroIncial, numeroFinal)
                    entradaDeDados.close()
                }else if(escolhaUsuario == "a"){
                    imparPar.calcularPar(numeroIncial, numeroFinal)
                    imparPar.calcularImpar(numeroIncial, numeroFinal)
                    entradaDeDados.close()
                }else{
                    console.log("ERRO: escolha inválida!!!")
                    entradaDeDados.close()
                }
            })
        })
    })
}

//exporta a função
module.exports = {
    imparParApp
}