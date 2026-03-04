/***********************************************************************************************
 * Objetivo: calculo de tabuada
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const validacao = require('../../module/validacao.js')

//função que imprime, recebendo de argumento uma tabuada inicial, uma tabuada final, um número incial e um número final
const gerarTabuada = function(tIncial, tFinal, nInicial, nFinal){
    let tabuadaIncial = Number(tIncial)
    let tabuadaFinal = Number(tFinal)
    let numeroIncial = Number(nInicial)
    let numeroFinal = Number(nFinal)
    let cont = tabuadaIncial
    let numeroIncialOrigin = numeroIncial
    
    //valida todos os dados conforme os requisitos
    if(validacao.chamarValidacoes(tIncial) && validacao.chamarValidacoes(tFinal) && validacao.chamarValidacoes(nInicial) && validacao.chamarValidacoes(nFinal) && validacao.limitarValores(tIncial, 2, 100) &&  validacao.limitarValores(nFinal, 1, 50) && validacao.limitarValores(tFinal, 1, 50)){
        //reseta o numero incial e adiciona o título conforme a tabuada que está sendo realizada naquele loop
        while (cont <= tabuadaFinal){
            console.log(`Tabuada do [${tabuadaIncial}]\n`)
                //realiza a impressão da tabuada por meio de um loop
                while(numeroIncial <= numeroFinal){
                    let resultado = tabuadaIncial * numeroIncial
                    console.log(`${tabuadaIncial} X ${numeroIncial} = ${resultado}\n`)
                    numeroIncial++
                }
            numeroIncial = numeroIncialOrigin
            tabuadaIncial++
            cont++
        }
    }else{
        return false
    }
}

//exporta a função
module.exports = {
    gerarTabuada
}