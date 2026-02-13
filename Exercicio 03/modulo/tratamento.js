function tratarNumero(dado){ //tratamento de dados para números
    let dadoRecebido = String(dado)
    if(dadoRecebido == "" || isNaN(dadoRecebido)){
        console.log('ERRO')

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

function verificarDuasCasas(dado){
    let dadoRecebido = dado
    if(dadoRecebido.split(',').length - 1 >=2){
        return false
    }else{
        return true
    }
}

module.exports = {
    tratarNumero,
    verificarOperacao,
    verificarDuasCasas
}