/***********************************************************************************************
 * Objetivo: calculos matemáticos básicos 
 * Data: 04/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const readline = require('readline') //importando readline
const calculo = require('./modulo/calculo') //importando módulo de calculo
const green = '\x1b[32m'; //cor verde para saída 
const red = '\x1b[31m'; //cor vermelha para saída
const reset = '\x1b[0m'; //reset da cor das palavras

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
                    let operacaoMatematica = String(operacao).toLowerCase()

                    let resultado = calculo.calcular(primeiroNumero, segundoNumero, operacaoMatematica) //variável que chama a função de calcular

                    //mensagem de erro caso resultado não volte True
                    if(resultado){
                        console.log('----------------------------------------------')
                        console.log('----------------- Calculadora ----------------') 
                        console.log('----------------------------------------------')
                        if(resultado >= 0){
                            console.log(`O resultadado da ${operacaoMatematica} entre ${primeiroNumero} e ${segundoNumero} é ${green} ${resultado} ${reset}`)
                        }else{
                            console.log(`O resultadado da ${operacaoMatematica} entre ${primeiroNumero} e ${segundoNumero} é ${red} ${resultado} ${reset}`)

                        }
                        entradaDeDados.close()
                    }else{
                        console.log("não foi possível realizar a operação")
                        entradaDeDados.close()
                    }
                })
        })
})