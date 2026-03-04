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
const transformarVirgula = function (dado, variacao){
    let dadoRecebido = String(dado)
    let variacaoRecebida = String(variacao)
    if (dadoRecebido == "" || variacaoRecebida == ""){ //verifica se o dado recebido está vazio
        console.log('ERRO: entrada de dados vazia')
        return false
    }else{
        //realoca TODAS as virgulas (representado pelo "g") por pontos
        let dadoRecebidoFormatado =  String(dadoRecebido.replace(/,/g, `${variacaoRecebida}`)) 
        return dadoRecebidoFormatado //retorna a string formatada 
    }
    
}

//verifica se o número tem mais de duas casas
const verificarDuasCasas = function(dado){
    let dadoRecebido = dado
    let dadoRecebidoPonto = transformarVirgula(dadoRecebido, ".") //chama a função para transformas as virgulas em ponto

    //divide a string a cada ponto, se tiver 3 ou mais conteúdos ao dividir, retorna falso
    if(dadoRecebidoPonto.split('.').length - 1 >=2){ 
        console.log('ERRO: entrada de dados inválida')
        return false
    }else{
        return true
    }
}

const limitarValores = function (dado, vIncial, Vfinal){
    let dadoRecebido = dado
    let valorIncial = vIncial
    let valorFinal = Vfinal
    if (chamarValidacoes(dadoRecebido) && chamarValidacoes(valorIncial) && chamarValidacoes(valorFinal)){
        if(dadoRecebido >= valorIncial && dadoRecebido <= valorFinal)
            return true
        else
            return false
    }else{
        console.log("ERRO: Entrada de dados inválida")
        return false
    }
        
}


const validarMaiorUm = function (dado){
    let dadoRecebido = dado
    if (chamarValidacoes(dadoRecebido)){
        if(dadoRecebido >= 1)
            return true
        else{
            console.log("O número deve ser maior do que um(1)")
            return false
        }
            
    }else{
        console.log("ERRO: Entrada de dados inválida")
        return false
    }
        
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
        console.log("ERRO: Entrada de dados inválida")
        return false
    }
}

const validarIncialMaior = function(vInicial, vFinal){
    let valorIncial = vInicial
    let valorFinal = vFinal

    if(chamarValidacoes(valorIncial) && chamarValidacoes(valorFinal)){
        if(valorIncial > valorFinal){
            console.log("ERRO: O valor inicial não pode ser maior que o valor final")
            return false
        }else{
            return true
        }
    }else{
        console.log("ERRO: Entrada de dados inválida")
        return false
    }
}

const validarNumerosIguais = function(v1, v2){
    let valor1 = v2
    let valor2 = v1

    if(chamarValidacoes(valor1) && chamarValidacoes(valor2)){
        if(valor1 == valor2){
            console.log("ERRO: O valor inicial não pode ser igual ao valor final")
            return false
        }else{
            return true
        }
    }else{
        console.log("ERRO: Entrada de dados inválida")
        return false
    }
}





module.exports = {
    validarNumero,
    validarVazio,
    transformarVirgula,
    verificarDuasCasas, 
    limitarValores, 
    chamarValidacoes,
    validarSexo,
    validarMaiorUm,
    validarIncialMaior,
    validarNumerosIguais
}

