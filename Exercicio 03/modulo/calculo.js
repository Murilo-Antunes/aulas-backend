const tratamento = require('./tratamento') //importa a função de tratar dados

//essa função verifica qual operação matemática foi escolhida e envia os dois valores para operação em questão
function calcular(n1, n2, operacao){
    let operacaoRecebida = String(operacao) //guarda a operação matemática em uma string
    let n1Formatado = tratamento.transformarVirgulaEmPonto(n1) //guarda o valor do primeiro número chamando a formatação de virgula para ponto
    let n2Formatado = tratamento.transformarVirgulaEmPonto(n2) //guarda o valor do segundo número chamando a formatação de virgula para ponto


    if (tratamento.verificarOperacao(operacaoRecebida)){
        if(operacaoRecebida == "soma"){
            let resultado = calcularSoma(n1Formatado, n2Formatado)
            return resultado
        }else if(operacaoRecebida == "subtração"){
            let resultado = calcularSubtracao(n1Formatado, n2Formatado)
            return resultado
        }else if(operacaoRecebida == "divisão"){
            let resultado = calcularDivisao(n1Formatado, n2Formatado)
            return resultado
        }else if(operacaoRecebida == "multiplicação"){
            let resultado = calcularMultiplicacao(n1Formatado, n2Formatado)
            return resultado
        }
    }else{  
        return false //caso nenhuma das operações acima estiver na variavel de operacaoRecebida retorna falso
    }
}

function calcularSoma(n1, n2){ //função que calcula a soma entre dois números
    let primeiroNumero = n1
    let segundoNumero = n2

    //chama a verificação de números com mais de dois pontos/virgula e a verifcação se a variavel que carrega os números estão vazias ou NAN
    if( tratamento.verificarDuasCasas(primeiroNumero) && tratamento.verificarDuasCasas(segundoNumero) && tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero)){
        
        let soma = Number(primeiroNumero) + Number(segundoNumero) //realiza o cálculo

        return soma.toFixed(2) //retorna o resultado da soma com duas casas decimais
    }else{
        return false //caso não passe verificações retorna falso
    }
}

function calcularSubtracao(n1, n2){ //função que calcula a soma entre dois números

    let primeiroNumero = n1
    let segundoNumero = n2

    //chama a verificação de números com mais de dois pontos/virgula e a verifcação se a variavel que carrega os números estão vazias ou NAN
    if( tratamento.verificarDuasCasas(primeiroNumero) && tratamento.verificarDuasCasas(segundoNumero) && tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero) ){

        let soma = Number(primeiroNumero) - Number(segundoNumero)//realiza o cálculo

        return soma.toFixed(2) //retorna o resultado da soma com duas casas decimais
    }else{
        return false //caso não passe verificações retorna falso
    }
}

function calcularMultiplicacao(n1, n2){
    let primeiroNumero = n1
    let segundoNumero = n2

    //chama a verificação de números com mais de dois pontos/virgula e a verifcação se a variavel que carrega os números estão vazias ou NAN
    if( tratamento.verificarDuasCasas(primeiroNumero) && tratamento.verificarDuasCasas(segundoNumero) && tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero)){

        let soma = Number(primeiroNumero) * Number(segundoNumero)//realiza o cálculo

        return soma.toFixed(2)//retorna o resultado da soma com duas casas decimais
    }else{
        return false //caso não passe verificações retorna falso
    }
}

function calcularDivisao(n1, n2){

    let primeiroNumero = n1
    let segundoNumero = n2

    //chama a verificação de números com mais de dois pontos/virgula, a verificação se o divisor é zero e a verifcação se a variavel que carrega os números estão vazias ou NAN
    if( tratamento.verificarDuasCasas(primeiroNumero) && tratamento.verificarDuasCasas(segundoNumero) && tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero)  && segundoNumero !=0){
        let soma = Number(primeiroNumero) / Number(segundoNumero) //realiza o cálculo

        return soma.toFixed(2)//retorna o resultado da soma com duas casas decimais
    }else{
        return false //caso não passe verificações retorna falso
    }
}

//exporta todas as funções desse módulo
module.exports = {
    calcularSoma,
    calcularSubtracao,
    calcularMultiplicacao,
    calcularDivisao,
    calcular
}