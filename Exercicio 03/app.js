/***********************************************************************************************
 * Objetivo: calculos matemáticos básicos 
 * Data: 04/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const readline = require('readline') //importando readline
const calculo = require('./modulo/calculo') //importando módulo de calculo

const entradaDeDados = readline.Interface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question('Digite o primeiro número: ', function(n1){ //entrada de dados do primeiro número
    let primeiroNumero = n1
        
        entradaDeDados.question('Digite o segundo número: ', function(n2){ //entrada de dados do segundo número
            let segundoNumero = n2

                //entrada de dados do tipo de operação
                entradaDeDados.question('Selecione o cálculo desejado de acordo com as opções: ("soma" "subtração" "divisão" "multiplicação"): ', function(operacao){
                    let operacaoMatematica = operacao

                    let resultado = calculo.calcular(primeiroNumero, segundoNumero, operacaoMatematica) //variável que chama a função de calcular

                    //mensagem de erro caso resultado não volte True
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