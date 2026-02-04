/***********************************************************************************************
 * Objetivo: sistema de gestão integrado
 * Data: 04/02/2026
 * Autor: Marcel
 * Versão: 1.0
***********************************************************************************************/

/*
Requisito 01: A empresa solicita que seja desenvolvido um sistema
para calcular os juros compostos de uma venda parcelada.

O cálculo de juros compostos é utilizado para determinar o
montante final de um investimento ou empréstimo quando os juros
são calculados sobre o capital inicial e também sobre os juros
acumulados ao longo do tempo.

A fórmula para calcular o montante final M com juros compostos é:

M = C*(1+i)^n

C é o capital inicial.
i é a taxa de juros.
n é o tempo para pagamento que sempre deverá ser em meses.
*/ 

/*
Requisito 02: A saída de dados da sua aplicação deverá seguir a
seguinte estrutura:

******************* [Nome da Empresa] *******************
Muito obrigado por realizar a sua compra conosco Sr(a) xxxxxxxxx.
A compra do produto xxxxxxxxx, tem um valor de: xxxxxxxxx.
A sua compra será parcelada em xx vezes e o Sr(a) pagará: xxxxxx.
O acréscimo realizado ao valor de: xxxxxxxx será de xxxxxxxxxx.

Muito obrigado por escolher a [Nome da Empresa].
*******************************************************
*/

/* 
● Solicite a digitação do nome do cliente e o nome do produto
que está sendo comprado.
● Solicite ao usuário que insira o valor da compra.
● Solicite ao usuário que insira a taxa de juros (o sistema deverá
calcular o percentual).
● Solicite ao usuário que insira o tempo de pagamento.
● Calcule o montante final utilizando a fórmula acima.
● Exiba o montante final ao usuário.
● É fundamental que todas as entradas de dados sejam validadas
e convertidas conforme a necessidade.
*/

const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Digite o seu nome: ", function(nome){
    let nomeUsuario = nome
    if(!isNaN(nomeUsuario)){
        console.log("Não é possível ter números na caixa de nome de usuário")
    }else if(nomeUsuario == ""){
        console.log("O campo de nome de usuário esta vazio")
    }else{
        entradaDeDados.question("Digite o nome do produto comprado: ", function(produto){
            let nomeProduto = produto
            if(nomeProduto == ""){
                console.log("O campo de nome do produto esta vazio")
            }else{
                entradaDeDados.question("digite o valor da compra do produto " + nomeProduto + ": R$", function(valorCompra){
                    let valorCompraProduto = valorCompra
                    if(isNaN(valorCompraProduto)){
                        console.log("O valor do produto deve ser um número")
                    }else if(valorCompraProduto == ""){
                        console.log("O campo de valor do produto esta vazio")
                    }else {
                        entradaDeDados.question("digite a taxa de juros do produto: ", function(taxaJuros){
                            let taxaJurosUsuario = taxaJuros
                            if(isNaN(taxaJurosUsuario)){
                                console.log("A taxa de juros deve ser um número")
                            }else if(taxaJurosUsuario == ""){
                                console.log("O campo de taxa de juros esta vazio")
                            }else{
                                entradaDeDados.question("Você deseja inserir o tempo de pagamento em Anos(digite \"a\") ou em Meses(digite \"m\")", function(tipoTempo){
                                    if(tipoTempo != "a" || tipoTempo != "A" || tipoTempo != "m" || tipotempo != "M" ){
                                        console.log("Entrada de dados invalida")
                                    }else{
                                        let tempoPagamento = tempo
                                    
                                        if(tempoPagamento == "a" || tempoPagamento == "A"){
                                            entradaDeDados.question("Digite a quantidade de anos de pagamento: ", function(anos){
                                                let quantidadeAnos = anos
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    
})