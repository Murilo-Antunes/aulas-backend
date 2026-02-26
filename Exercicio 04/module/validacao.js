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

const validarZeroCem = function (dado){
    let dadoRecebido = dado
    if (chamarValidacoes(dadoRecebido)){
        if(dadoRecebido >= 0 && dadoRecebido <= 100)
            return true
        else
            return false
    }else
        return false
}

const chamarValidacoes = function (dado){
    let dadoRecebido = String(dado)

    if(validarNumero(dadoRecebido) && validarVazio(dadoRecebido) && verificarDuasCasas(dadoRecebido))
        return true
    else
        return false
}

const validarSexo = function(sexo){
    if(validarVazio(sexo)){
        let sexoRecebido = String(sexo).toLowerCase()

        if(sexoRecebido == "feminino" || sexoRecebido == "masculino")
            return true
        else 
            return false

    }else{
        return false
    }
}


module.exports = {
    validarNumero,
    validarVazio,
    transformarVirgulaEmPonto,
    verificarDuasCasas, 
    validarZeroCem, 
    chamarValidacoes,
    validarSexo
}

