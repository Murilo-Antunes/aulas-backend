/***********************************************************************************************
 * Objetivo: entrada e saidad de dados do calculo de imc
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const imc = require('./module/Imc')
const readline = require('readline')

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question('Digite o seu peso: ', function(peso){
    let pesoRecebido = peso
    entradaDeDados.question('Digite a sua altura(m): ', function(altura){
        let alturaRecebida = altura
        let resultadoImc = imc.calcularImc(pesoRecebido, alturaRecebida)
        let situacao = imc.classificarImc(resultadoImc)

        if (resultadoImc || situacao){
            console.log(`IMC        Classificação\n${resultadoImc}      ${situacao}`)

            entradaDeDados.close()
        }else{
            console.log('ERRO')
            entradaDeDados.close()
        }
    })
})