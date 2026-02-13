const tratamento = require('./tratamento')

function calcular(n1, n2, operacao){
    let operacaoRecebida = String(operacao)
    let n1Formatado = String(n1.replace(',', '.'))
    let n2Formatado = String(n2.replace(',', '.'))


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
        return false
    }
}

function calcularSoma(n1, n2){
    let primeiroNumero = n1
    let segundoNumero = n2

    if( tratamento.verificarDuasCasas(primeiroNumero) && tratamento.verificarDuasCasas(segundoNumero) && tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero)){
        
        let soma = Number(primeiroNumero) + Number(segundoNumero)

        return soma.toFixed(2)
    }else{
        return false
    }
}

function calcularSubtracao(n1, n2){

    let primeiroNumero = n1
    let segundoNumero = n2

    if( tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero) ){
        let soma = Number(primeiroNumero) - Number(segundoNumero)

        return soma.toFixed(2)
    }else{
        return false
    }
}

function calcularMultiplicacao(n1, n2){
    let primeiroNumero = n1
    let segundoNumero = n2

    if( tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero)){
        let soma = Number(primeiroNumero) * Number(segundoNumero)

        return soma.toFixed(2)
    }else{
        return false
    }
}

function calcularDivisao(n1, n2){

    let primeiroNumero = n1
    let segundoNumero = n2

    if( tratamento.tratarNumero(primeiroNumero) && tratamento.tratarNumero(segundoNumero)  && segundoNumero !=0){
        let soma = Number(primeiroNumero) / Number(segundoNumero)

        return soma.toFixed(2)
    }else{
        return false
    }
}

module.exports = {
    calcularSoma,
    calcularSubtracao,
    calcularMultiplicacao,
    calcularDivisao,
    calcular
}