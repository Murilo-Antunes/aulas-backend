const validarNumero = (numero) => isNaN(numero)

const validarVazio = function (dado){
    let dadoRecebido = String(dado)
    
    if(dadoRecebido == ""){
        return false
    }else{
        return true
    }
}

module.exports = {
    validarNumero,
    validarVazio
}