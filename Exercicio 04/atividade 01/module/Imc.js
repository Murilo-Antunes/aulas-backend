/***********************************************************************************************
 * Objetivo: calculo de IMC 
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const validacao = require('./validacao')

const classificarImc = function(imc){
    let imcRecebido = Number(imc)
}

const calcularImc = function(peso, altura){
    if(validacao.validarNumero(peso) && validacao.validarNumero(altura) && validacao.validarVazio(peso) && validacao.validarVazio(altura)){
        let pesoRecebido = Number(peso)
        let alturaRecebida = Number(altura)

        let imc = pesoRecebido / (alturaRecebida**2)

        return Number(imc)
    }else{
        return false
    }
}