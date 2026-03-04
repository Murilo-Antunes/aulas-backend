/***********************************************************************************************
 * Objetivo: calculo de fatorial
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const validacao = require('../../module/validacao.js')

//função que realiza o cálculo de fatorial
const calcularFatorial = function(fatorial){
    let fatorialRecebido = Number(fatorial)
    
    if(validacao.chamarValidacoes(fatorial) && fatorialRecebido > 1){ //valida os dados conforme os requisitos
        let resultado = fatorialRecebido
        //realiza o cálculo do fatorial
        for(cont = fatorialRecebido - 1; cont > 1; cont--){ //loop que diminui o contador até ele chegar a 1
            resultado *= cont //realiza o produto entre o valor contido em "resultado" e o valor contido em "cont"
        }
        return Number(resultado).toFixed(2)//retorna o resultado como um número fixado em no máximo duas casas 
    }else{
        return false
    }
}   

//formata a saída do fatorial conforme os requisitos
const formatarSaidaFatorial = function(fatorial){
    let fatorialRecebido = Number(fatorial)
    let fatorialRecebidoArray = [fatorialRecebido] //pega o fatoria recebido e o transforma em um array
    let cont = 0
    let fatoriaJoker = fatorialRecebido 
    let resultado = calcularFatorial(fatorialRecebido) //chama a função de calcular fatorial
    
    //valida os dados
    if(validacao.chamarValidacoes(fatorial) && fatorialRecebido > 1 && validacao.chamarValidacoes(resultado)){
        //guarda os valores do fatorial recebido até um em um array 
        while(cont < fatoriaJoker){
            fatorialRecebidoArray[cont] = fatorialRecebido

            fatorialRecebido--
            cont++
        }

        //guarda a impressão final em uma variavel saída
        let saida = console.log(`o fatorial de ${fatoriaJoker} é ${validacao.transformarVirgula(fatorialRecebidoArray, " x ")} = ${resultado}`)
        return saida //retorna variável saída
    }else
        return false
}

//exporta todas funções
module.exports = {
    calcularFatorial,
    formatarSaidaFatorial
}