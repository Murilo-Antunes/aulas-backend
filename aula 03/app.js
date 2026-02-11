/***********************************************************************************************
 * Objetivo: criar um sistema que permite cálculo de juros utilizando boas práticas com funções
 * Data: 11/02/2026
 * Autor: Marcel
 * Versão: 1.0
***********************************************************************************************/

const { log } = require('console')
const readline = require('readline') //import do readline

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


//entrada do nome do cliente
entradaDeDados.question("Digite o nome do cliente: ", function(nome){
    let nomeCliente = nome

    //entrada do nome do produto
    entradaDeDados.question('Digite o nome do produto: ', function(produto){
        let nomeProduto = produto

        //entrada de dados do valor da compra
        entradaDeDados.question('Digite o valor da compra: ', function(capital){
            let capitalProduto = capital

            //entrada de dados da taxa de juros
            entradaDeDados.question('Digite a taxa de juros à ser aplicada na compra: ', function(juros){
                let jurosCompra = juros

                //entrada de dados do tempo de pagamento
                entradaDeDados.question('Digite tempo para realizar pagamento: ', function(tempo){
                    let tempoPagamento = tempo
                    //import da biblioteca que contêm as funções de calculo
                    let calculos = require('./modulo/calculo.js')

                    let montante = calculos.calcularJurosComposto(capitalProduto, jurosCompra, tempoPagamento)

                    if(montante){
                        console.log('o montante final é: ' + montante)
                        entradaDeDados.close()
                    }else{
                        console.log('ERRO: teve um erro no calculo de juros, fechando programa......... ')
                        entradaDeDados.close()
                    }

                })
            })
        })
    })

})







