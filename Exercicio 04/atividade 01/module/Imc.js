/***********************************************************************************************
 * Objetivo: calculo de IMC 
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const validacao = require('../../module/validacao.js') //exporta a classe de validação

const classificarImc = function(imc){
    imc = validacao.transformarVirgula(imc, ".") //chama a validação de transformar virgula em ponto

    if(validacao.chamarValidacoes(imc)){  //chama a validação de números
        let imcRecebido = Number(imc)
        let situacao

        //condicional que classifica o peso de acordo com o imc recebido
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
    peso = validacao.transformarVirgula(peso, ".")
    altura = validacao.transformarVirgula(altura, ".")

    //realiza o cálculo do imc
    if(validacao.chamarValidacoes(peso) && validacao.chamarValidacoes(altura)){
        let pesoRecebido = Number(peso)
        let alturaRecebida = Number(altura)
        let imc = pesoRecebido / (alturaRecebida**2)

        return Number(imc).toFixed(2) //retorna o imc como um número fixado em no máximo duas casas
    }else{
        return false
    }
}

//exporta as funções
module.exports = {
    calcularImc,
    classificarImc
}