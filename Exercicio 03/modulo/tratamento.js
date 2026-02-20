function tratarNumero(dado){ //tratamento de dados para números
    let dadoRecebido = String(dado)
    if(dadoRecebido == "" || isNaN(dadoRecebido)){ //verifica se a variável está vazia ou não é um número
        console.log('ERRO: entrada de dados não é um número ou está vazia')

        return false
    }else{
        return true
    }
}

//função que verifica se a opção escolhida pelo usuário é válida 
function verificarOperacao(dado){
    let dadoRecebido = String(dado)
    if(dadoRecebido == "soma" || dadoRecebido == "subtração" || dadoRecebido == "divisão" || dadoRecebido == "multiplicação"){
        return true
    }else{
        console.log('ERRO: entrada de tipo de operação matemática inválida')
        return false
    }
}

//função que transformas todas as virgulas em pontos
function transformarVirgulaEmPonto(dado){
    let dadoRecebido = String(dado)

    if (dadoRecebido == ""){ //verifica se o dado recebido está vazio
        console.log('ERRO: entrada de dados vazia')
        return false
    }else{
        //realoca TODAS as virgulas (representado pelo "g") por pontos
        let dadoRecebidoFormatado =  String(dadoRecebido.replace(/,/g, '.')) 
        return dadoRecebidoFormatado //retorna a string formatada 
    }
    
}

//verifica se o número tem mais de duas casas
function verificarDuasCasas(dado){
    let dadoRecebido = dado
    let dadoRecebidoPonto = transformarVirgulaEmPonto(dadoRecebido) //chama a função para transformas as virgulas em ponto

    //divide a string a cada ponto, se tiver 3 ou mais conteúdos ao dividir, retorna falso
    if(dadoRecebidoPonto.split('.').length - 1 >=2){ 
        console.log('ERRO: entrada de dados inválida')
        return false
    }else{
        return true
    }
}

//exporta todas as funções desse módulo
module.exports = {
    tratarNumero,
    verificarOperacao,
    verificarDuasCasas,
    transformarVirgulaEmPonto
}