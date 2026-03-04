/***********************************************************************************************
 * Objetivo: gerenciador de números pares e ímpares
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const validacao = require('../../module/validacao.js') //importa a classe de validção

//função que calcula os números pares
const calcularPar = function(nInicial, nFInal){
    //valida todos dados conforme os requisitos
    if(validacao.limitarValores(nInicial, 0, 500) && validacao.limitarValores(nFInal, 100, 1000) && validacao.validarNumerosIguais(nInicial, nFInal) && validacao.validarIncialMaior(nInicial, nFInal)){
        let numeroIncial = Number(nInicial)
        let numeroFinal = Number(nFInal)
        let sobra = numeroIncial % 2 //calcula o a sobra da divisão entre o número incial e 2
        let cont = 0

        console.log(`\nLista de números pares: \n`)

        if(sobra == 0){
            //realiza o loop para encontrar os números pares caso o número incial seja par (sobra 0)
            while(numeroIncial <= numeroFinal){ //realiza o loop até o número incial ser maior que o número final
                console.log(`${numeroIncial}\n`) 
                numeroIncial += 2 //aumenta o número incial para ir para o próximo par
                cont++
            }
        }else{
            //realiza o loop para encontrar os números pares caso o número incial seja impar (sobra 1)
            numeroIncial++ //aumenta o valor do número incial em 1 para chegar no número par
            while(numeroIncial <= numeroFinal){ //realiza o número ate o número incial ser maior que o número final
                console.log(`${numeroIncial}\n`)
                numeroIncial += 2 //aumenta o número incial para ir para o próximo pars
                cont++
            }
        }
        console.log(` quantidade de números encontrados: ${cont}`) // a quantidade de números encontrados será igual a quantidade de vezes que o loop foi realizado

    }else{
        return false
    }
}

//função que calcula os números pares
const calcularImpar = function(nInicial, nFInal){
    //valida todos dados conforme os requisitos
    if(validacao.limitarValores(nInicial, 0, 500) && validacao.limitarValores(nFInal, 0, 500) && validacao.validarNumerosIguais(nInicial, nFInal) && validacao.validarIncialMaior(nInicial, nFInal)){
        let numeroIncial = Number(nInicial)
        let numeroFinal = Number(nFInal)
        let sobra = numeroIncial % 2 //calcula o a sobra da divisão entre o número incial e 2
        let cont = 0

        console.log(`\nLista de números ímpares: \n`)
        //realiza o loop para encontrar os números ímpares caso o número incial seja par (sobra 0)
        if(sobra == 0){
            numeroIncial++ //aumenta o valor do número incial em 1 para chegar no número impar
            while(numeroIncial <= numeroFinal){ //realiza o loop até o número incial ser maior que o número final
                console.log(`${numeroIncial}\n`)
                numeroIncial += 2//aumenta o número incial para ir para o próximo impar
                cont++
            }
        }else{
            //realiza o loop para encontrar os números ímpares caso o número incial seja impar (sobra 1)
            while(numeroIncial <= numeroFinal){
                console.log(`${numeroIncial}\n`)
                numeroIncial += 2//aumenta o valor do número incial em 1 para chegar no número impar
                cont++
            }
        }
        console.log(`quantidade de números encontrados: ${cont}`)// a quantidade de números encontrados será igual a quantidade de vezes que o loop foi realizado

    }else{
        return false 
    }
}

//exporta as funções
module.exports = {
    calcularPar,
    calcularImpar
}
