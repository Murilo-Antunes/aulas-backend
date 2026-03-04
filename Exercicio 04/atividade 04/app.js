/***********************************************************************************************
 * Objetivo: Arquivo responsável pelas entradas e saídas de dados da aplicação
 * Data: 04/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const readline = require('readline') //importa readline
const fatorial = require('./module/fatorial')  //importa classe fatorial

//função necessária para fundir todo o exercicio em um único app, evitando a criação repetida de interfaces para entrada de dados
const fatorialApp = function(entrada){ //recebe de argumento uma entrada de dados que, neste caso, vem do main.js
    let entradaDeDados = entrada
    entradaDeDados.question("Digite o número para o cálculo de fatorial: ", function(n){
        let numero = n
        fatorial.formatarSaidaFatorial(numero) //chama o calculo do fatorial enviando o número digitado pelo usuário 
    
        entradaDeDados.close()
    })
}

//exporta a funçãoss
module.exports = {
    fatorialApp
}