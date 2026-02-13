/***********************************************************************************************
 * Objetivo: calculos matematicos básicos 
 * Data: 04/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const readline = require('readline')
const calculo = require('./modulo/calculo')
const entradaDeDados = readline.Interface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question('Digite o primeiro número: ', function(n1){
    let primeiroNumero = n1
        
        entradaDeDados.question('Digite o segundo número: ', function(n2){
            let segundoNumero = n2

                entradaDeDados.question('Selecione o cálculo desejado de acordo com as opções: ("soma" "subtração" "divisão" "multiplicação"): ', function(operacao){
                    let operacaoMatematica = operacao

                    let resultado = calculo.calcular(primeiroNumero, segundoNumero, operacaoMatematica)

                    if(resultado){
                        console.log(resultado)
                        entradaDeDados.close()
                    }else{
                        console.log("não foi possível realizar a operação")
                        entradaDeDados.close()
                    }
                })
        })
})