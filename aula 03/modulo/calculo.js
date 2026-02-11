/***********************************************************************************************
 * Objetivo: arquivo responsável pelas funçoes de calculos para este projeto
 * Data: 11/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

//criando uma função para calcular o valor da compra parcelada
function calcularJurosComposto(valorCompra, taxaJuros, tempoPago){
    //recebe os argumentos da função em variaveis locais
    //as variaveis valor, taxa e tempo são numericas graças a conversão, porém os argumentos ainda será Strings
    let valorCompraProduto = Number(valorCompra)
    let taxa = Number(taxaJuros)
    let tempo = Number(tempoPago)


    //validação para entradas vazias ou de caracteres inválidos
    if (valorCompraProduto == "" || isNaN(valorCompraProduto) || tempo == "" || isNaN(tempo)){
        return false
    }else{
        //chama a função para converter um número em percentual
        let percentual = calcularPercentual(taxa)

        //validação para o erro do percentual na função calcularPercentual
        if (percentual){
            let montante = valorCompraProduto * ((1 + percentual) ** tempo)
            return Number(montante.toFixed(2))
        }else{
            return false
        }
    }
}

//calcula percentual de um numero
function calcularPercentual(taxa){
    let numeroPercentual = Number(taxa)

    if(isNaN(taxa) || taxa <= 0 || taxa == ""){ //validando entrada
        return false //retorna que não pode calcular
    }else{
        //processamento do cálculo 
        let taxaJuros = numeroPercentual / 100 
        return Number(taxaJuros.toFixed(2))
    }
}

//tornando as duaa funções públicas para este projeto
module.exports = {
    calcularJurosComposto,
    calcularPercentual
}