/***********************************************************************************************
 * Objetivo: entrada e saida de dados do calculo de imc
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const imc = require('./module/Imc') //exporta a classe de calculo do imc
const readline = require('readline') //exporta o readline

//função necessária para fundir todo o exercicio em um único app, evitando a criação repetida de interfaces para entrada de dados
const imcApp = function(entrada){ //recebe de argumento uma entrada de dados que, neste caso, vem do main.js
    let entradaDeDados = entrada
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
                entradaDeDados.close()
            }
        })
    })
}


//exporta a função de entrada de dados
module.exports = {
    imcApp
}