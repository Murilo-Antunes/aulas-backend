/***********************************************************************************************
 * Objetivo: calculo de IMC 
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const validacao = require('../../module/validacao.js')

const classificarImc = function(imc){
    imc = validacao.transformarVirgulaEmPonto(imc)

    if(validacao.validarNumero(imc) && validacao.validarVazio(imc) && validacao.verificarDuasCasas(imc)){
        let imcRecebido = Number(imc)
        let situacao

        if(imcRecebido < 18.5)
            situacao = "Abaixo do peso"
        else if (imcRecebido >= 18.5 && imc <= 24.9)
            situacao = "Peso normal"
        else if (imcRecebido >= 25 && imc <= 29.9)
            situacao = "Acima do peso (sobrepeso)"
        else if (imcRecebido >= 30 && imc <= 34.9)
            situacao = "Obesidade I"
        else if (imcRecebido >= 35 && imc <= 39.9)
            situacao = "Obesidade II"
        else if (imcRecebido >= 40)
            situacao = "Obesidade III"

        if (situacao != undefined){
            return String(situacao)
        }
    }else{
       return false
    }


}

const calcularImc = function(peso, altura){
    peso = validacao.transformarVirgulaEmPonto(peso)
    altura = validacao.transformarVirgulaEmPonto(altura)

    if(validacao.validarNumero(peso) && validacao.validarNumero(altura) && validacao.validarVazio(peso) && validacao.validarVazio(altura) && validacao.verificarDuasCasas(peso) && validacao.verificarDuasCasas(altura)){
        let pesoRecebido = Number(peso)
        let alturaRecebida = Number(altura)
        let imc = pesoRecebido / (alturaRecebida**2)

        return Number(imc).toFixed(2)
    }else{
        return false
    }
}

module.exports = {
    calcularImc,
    classificarImc
}