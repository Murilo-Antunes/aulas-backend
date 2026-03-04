/***********************************************************************************************
 * Objetivo: calculo de fatorial
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const validacao = require('../../module/validacao.js')

const calcularFatorial = function(fatorial){
    let fatorialRecebido = Number(fatorial)
    
    if(validacao.chamarValidacoes(fatorial) && fatorialRecebido > 1){
        let resultado = fatorialRecebido
        for(cont = fatorialRecebido - 1; cont > 1; cont--){
            resultado *= cont
        }
        return resultado
    }else{
        return false
    }
}   

const formatarSaidaFatorial = function(resultado, fatorial){
    let fatorialRecebido = Number(fatorial)
    let fatorialRecebidoArray = [fatorialRecebido]
    let cont = 0
    let fatoriaJoker = fatorialRecebido
    
    if(validacao.chamarValidacoes(fatorial) && fatorialRecebido > 1 && validacao.chamarValidacoes(resultado)){
        while(cont < fatoriaJoker){
            fatorialRecebidoArray[cont] = fatorialRecebido

            fatorialRecebido--
            cont++
        }


        let saida = console.log(`o fatorial de ${fatoriaJoker} é ${validacao.transformarVirgula(fatorialRecebidoArray, " x ")} = ${resultado}`)
        return saida
    }else
        return false
}

let resultado = calcularFatorial(6)

formatarSaidaFatorial(resultado,6)