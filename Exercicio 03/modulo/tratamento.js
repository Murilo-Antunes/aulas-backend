function tratarNumero(dado){ //tratamento de dados para números
    let dadoRecebido = String(dado)
    if(dadoRecebido == "" || isNaN(dadoRecebido)){
        console.log('ERRO: entrada de dados não é um número ou está vazia')

        return false
    }else{
        return true
    }
}

function verificarOperacao(dado){
    let dadoRecebido = String(dado)
    if(dadoRecebido == "soma" || dadoRecebido == "subtração" || dadoRecebido == "divisão" || dadoRecebido == "multiplicação"){
        return true
    }else{
        console.log('ERRO: entrada de dado inválida')
        return false
    }
}

function transformarVirgulaEmPonto(dado){
    let dadoRecebido = String(dado)

    if (dadoRecebido == ""){
        console.log('entrada de dados vazia')
        return false
    }else{
        let dadoRecebidoFormatado =  String(dadoRecebido.replace(/,/g, '.'))
        return dadoRecebidoFormatado
    }
    
}

function verificarDuasCasas(dado){
    let dadoRecebido = dado
    let dadoRecebidoPonto = transformarVirgulaEmPonto(dadoRecebido)

    if(dadoRecebidoPonto.split('.').length - 1 >=2){
        console.log('ERRO: entrada de dados inválida')
        return false
    }else{
        return true
    }
}

module.exports = {
    tratarNumero,
    verificarOperacao,
    verificarDuasCasas,
    transformarVirgulaEmPonto
}