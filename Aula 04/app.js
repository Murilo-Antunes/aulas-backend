/***********************************************************************************************
 * Objetivo: Arquivo responsável pelas entradas e saídas de dados da aplicação
 * Data: 20/02/2026
 * Autor: Marcel
 * Versão: 1.0
***********************************************************************************************/

const calculosMatematicos = require('./modulo/calcular.js')

let resposta = calculosMatematicos.calcular(50, 50, "somar")
console.log(resposta)

let respostaSoma = calculosMatematicos.somar(50, 50)
console.log(respostaSoma)