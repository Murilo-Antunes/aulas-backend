/***********************************************************************************************
 * Objetivo: Arquivo responsável pelas entradas e saídas de dados da aplicação
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const readline = require('readline')
const imparPar = require('./module/ImparPar') 

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Digite o número incial: ", function(nInicial){
    let numeroIncial = nInicial
    entradaDeDados.question("Digite o número final: ", function(nFinal){
        let numeroFinal = nFinal
        entradaDeDados.question("Deseja calcular apenas os Pares(p), apenas os Ímpares(i), ou Ambos(a): ", function(escolha){
            let escolhaUsuario = escolha
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