/***********************************************************************************************
 * Objetivo: gerenciador de números pares e ímpares
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const validacao = require('../../module/validacao.js')

const calcularPar = function(nInicial, nFInal){

    if(validacao.limitarValores(nInicial, 0, 500) && validacao.limitarValores(nFInal, 0, 500) && validacao.validarNumerosIguais(nInicial, nFInal) && validacao.validarIncialMaior(nInicial, nFInal)){
        let numeroIncial = Number(nInicial)
        let numeroFinal = Number(nFInal)
        let sobra = numeroIncial % 2
        let cont = 0

        console.log(`\nLista de números pares: \n`)

        if(sobra == 0){
            while(numeroIncial <= numeroFinal){
                console.log(`${numeroIncial}\n`)
                numeroIncial += 2
                cont++
            }
        }else{
            numeroIncial++
            while(numeroIncial <= numeroFinal){
                console.log(`${numeroIncial}\n`)
                numeroIncial += 2
                cont++
            }
        }
        console.log(` quantidade de números encontrados: ${cont}`)

    }else{
        return false
    }
}

const calcularImpar = function(nInicial, nFInal){

    if(validacao.limitarValores(nInicial, 0, 500) && validacao.limitarValores(nFInal, 0, 500) && validacao.validarNumerosIguais(nInicial, nFInal) && validacao.validarIncialMaior(nInicial, nFInal)){
        let numeroIncial = Number(nInicial)
        let numeroFinal = Number(nFInal)
        let sobra = numeroIncial % 2
        let cont = 0

        console.log(`\nLista de números ímpares: \n`)

        if(sobra == 0){
            numeroIncial++
            while(numeroIncial <= numeroFinal){
                console.log(`${numeroIncial}\n`)
                numeroIncial += 2
                cont++
            }
        }else{
            while(numeroIncial <= numeroFinal){
                console.log(`${numeroIncial}\n`)
                numeroIncial += 2
                cont++
            }
        }
        console.log(`quantidade de números encontrados: ${cont}`)

    }else{
        return false
    }
}

module.exports = {
    calcularPar,
    calcularImpar
}
