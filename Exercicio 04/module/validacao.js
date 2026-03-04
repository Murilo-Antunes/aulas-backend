const validarNumero = (numero) => !isNaN(numero, console.log('ERRO: A entrada de dados não é um número'))  //valida se um dado é um número

//valida uma entrada vazia
const validarVazio = function (dado){
    let dadoRecebido = String(dado)
    
    if(dadoRecebido.trim() == ""){
        console.log("ERRO: Entrada de dados vazia")
        return false
    }else{
        return true
    }
}

//função que transformas todas as virgulas em pontos
const transformarVirgula = function (dado, variacao){
    let dadoRecebido = String(dado)
    let variacaoRecebida = String(variacao)
    if (validarVazio(dadoRecebido) && validarVazio(variacaoRecebida)){ //verifica se o dado recebido está vazio
        //realoca TODAS as virgulas (representado pelo "g") por pontos
        let dadoRecebidoFormatado =  String(dadoRecebido.replace(/,/g, `${variacaoRecebida}`)) 
        return String(dadoRecebidoFormatado) //retorna a string formatada 
    }else{
        
        return false
    }
    
}

//verifica se o número tem mais de duas casas
const verificarDuasCasas = function(dado){
    let dadoRecebido = dado
    let dadoRecebidoPonto = transformarVirgula(dadoRecebido, ".") //chama a função para transformas as virgulas em ponto

    //divide a string a cada ponto, se tiver 3 ou mais conteúdos ao dividir, retorna falso
    if(dadoRecebidoPonto.split('.').length - 1 >=2){ 
        console.log('ERRO: entrada de dados tem mais que um ponto')
        return false
    }else{
        return true
    }
}

//limita um valor entre um valor x e valor y
const limitarValores = function (dado, vIncial, Vfinal){
    let dadoRecebido = dado
    let valorIncial = vIncial
    let valorFinal = Vfinal
    if (chamarValidacoes(dadoRecebido) && validarIncialMaior(valorIncial, valorFinal)){ //valida os dados
        if(dadoRecebido >= valorIncial && dadoRecebido <= valorFinal)
            return true
        else{
            console.log('ERRO: O valor selecionado não está dentro dos limites estabelecidos')
            return false
        }
            
    }else{
        return false
    }
        
}

//valida se um número é maior que um
const validarMaiorUm = function (dado){
    let dadoRecebido = dado
    if (chamarValidacoes(dadoRecebido)){ //valida o dado recebido
        if(dadoRecebido >= 1)
            return true
        else{
            console.log("O número deve ser maior do que um(1)")
            return false
        }
            
    }else{
        return false
    }
        
}

//chama as principais validações para um número
const chamarValidacoes = function (dado){
    let dadoRecebido = String(dado)

    if(validarNumero(dadoRecebido) && validarVazio(dadoRecebido) && verificarDuasCasas(dadoRecebido)) 
        return true
    else
        return false
}

//valida se uma entrada de dado está escrita como "masculino" ou "feminino"
const validarSexo = function(sexo){
    if(validarVazio(sexo)){ //valida o dado
        let sexoRecebido = String(sexo).toLowerCase()

        if(sexoRecebido == "feminino" || sexoRecebido == "masculino")
            return true
        else{
            console.log("ERRO: Entrada de dados não condiz com as opções \"masculino\" ou \"feminino\"")
            return false
        } 

    }else{
        return false
    }
}

//valida se o número incial é maior que o número final
const validarIncialMaior = function(vInicial, vFinal){
    let valorIncial = vInicial
    let valorFinal = vFinal

    if(chamarValidacoes(valorIncial) && chamarValidacoes(valorFinal)){ //valida os dados recebidos
        if(valorIncial > valorFinal){
            console.log("ERRO: O valor inicial não pode ser maior que o valor final")
            return false
        }else{
            return true
        }
    }else{
        return false
    }
}

//valida se dois números são iguais
const validarNumerosIguais = function(v1, v2){ 
    let valor1 = v2
    let valor2 = v1

    if(chamarValidacoes(valor1) && chamarValidacoes(valor2)){ //valida os dados recebidos
        if(valor1 == valor2){
            console.log("ERRO: O valor inicial não pode ser igual ao valor final")
            return false
        }else{
            return true
        }
    }else{
        return false
    }
}

//valida a escolha do objeto main da aplicação
const validarEscolhaMain = function(escolha){
    let escolhaUsuario = escolha
    console.log(escolhaUsuario)
    if(escolhaUsuario == "1" || escolhaUsuario == "2" || escolhaUsuario == "3" || escolhaUsuario == "4" || escolhaUsuario == "5"){
        return true
    }else{
        console.log("ERRO: A escolha não condiz com as opções acima!!!")
        return false
    }
    
        
}



//exporta todas funções
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
    validarNumerosIguais,
    validarEscolhaMain
}
