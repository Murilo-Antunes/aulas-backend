const validarNumero = (numero) => !isNaN(numero)


const validarVazio = function (dado){
    let dadoRecebido = String(dado)
    
    if(dadoRecebido == ""){
        return false
    }else{
        return true
    }
}

//função que transformas todas as virgulas em pontos
const transformarVirgulaEmPonto = function (dado){
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
const verificarDuasCasas = function(dado){
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


module.exports = {
    validarNumero,
    validarVazio,
    transformarVirgulaEmPonto,
    verificarDuasCasas
}