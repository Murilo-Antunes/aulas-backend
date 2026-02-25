/**************************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de calcular (somar, subtrair, multiplicar e dividir)
 * Data: 20/02/2026
 * Autor: Marcel
 * Versão: 1.0
***************************************************************************************************************/

//modelo de função anônima (porque ela não tem nome)
//calcular as quatro operações matemáticas
const calcular = function (n1, n2, operador){
    let valor1             = Number(n1)
    let valor2             = Number(n2)
    let operadorMatematico = String(operador)
    let resultado

    //a ausência de chaves na condicional é porque qualquer condicional que tenha apenas uma linha de processamento a chaves torna-se opcional
    // if(operadorMatematico == "somar")
    //     resultado = valor1 + valor2
    // else if (operadorMatematico == "subtrair")
    //     resultado = valor1 - valor2
    // else if (operadorMatematico == "multiplicar")
    //     resultado = valor1 * valor2
    // else if(operadorMatematico == "divisão")
    //     resultado = valor1 / valor2

    switch (operadorMatematico) {
        case "somar":
            resultado = somar(valor1, valor2)
            break
        case "subtrair":
            resultado = subtrair(valor1, valor2)
            break
        case "multiplicar":
            resultado = multiplicar(valor1, valor2)
            break
        case "dividir":
            resultado = dividir(valor1, valor2)
            break
        // default:
            
        //     break;
    }
    //saida
    if(resultado != undefined)
        return Number(resultado).toFixed(2)
    else
        return false
    
}

//exemplo de funções baseada em seta
//Funções para realizar as operações matemáticas 
const somar = (n1, n2) =>   Number(n1) + Number(n2) //arrow function
const subtrair = (n1, n2) =>   Number(n1) - Number(n2) //arrow function
const multiplicar = (n1, n2) =>   Number(n1) * Number(n2) //arrow function
const dividir = (n1, n2) =>   Number(n1) / Number(n2) //arrow function


module.exports = {
    calcular,
    somar,
    subtrair, 
    multiplicar,
    dividir
}