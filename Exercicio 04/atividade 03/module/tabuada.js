/***********************************************************************************************
 * Objetivo: calculo de tabuada
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const validacao = require('../../module/validacao.js')

const gerarTabuada = function(tIncial, tFinal, nInicial, nFinal){
    let tabuadaIncial = Number(tIncial)
    let tabuadaFinal = Number(tFinal)
    let numeroIncial = Number(nInicial)
    let numeroFinal = Number(nFinal)
    let cont = tabuadaIncial
    let numeroIncialOrigin = numeroIncial
    
    if(validacao.chamarValidacoes(tIncial) && validacao.chamarValidacoes(tFinal) && validacao.chamarValidacoes(nInicial) && validacao.chamarValidacoes(nFinal) && validacao.limitarValores(tIncial, 2, 100) &&  validacao.limitarValores(nFinal, 1, 50) && validacao.limitarValores(tFinal, 1, 50)){
        while (cont <= tabuadaFinal){
            console.log(`Tabuada do [${tabuadaIncial}]\n`)
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

gerarTabuada(2, 50, 0, 50)