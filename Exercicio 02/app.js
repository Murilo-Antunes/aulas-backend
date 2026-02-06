/***********************************************************************************************
 * Objetivo: sistema de gestão integrado
 * Data: 04/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const { read } = require("fs")
const readline = require("readline")
const green = '\x1b[32m';
const reset = '\x1b[0m';

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function perguntarNomeUsuario(){
    entradaDeDados.question("Digite o seu nome: ", function(nome){
        let nomeUsuario = nome
        if(nomeUsuario == ""){
            console.log("O campo de nome de usuário está vazio")
            perguntarNomeUsuario()
        }else if(!isNaN(nomeUsuario)){
            console.log("Não é possível ter números na caixa de nome de usuário")
            perguntarNomeUsuario()
        }else{
            perguntarNomeProduto()
            function perguntarNomeProduto(){
                entradaDeDados.question("Digite o nome do produto comprado: ", function(produto){
                    let nomeProduto = produto
                    if(nomeProduto == ""){
                        console.log("O campo de nome do produto está vazio")
                        perguntarNomeProduto()
                    }else if(!isNaN(nomeProduto)){
                        console.log("o nome do produto não pode ser um número")
                        perguntarNomeProduto()
                    }else{
                        perguntarValorProduto()
                        function perguntarValorProduto(){
                            entradaDeDados.question("digite o valor da compra do produto " + nomeProduto + ": R$", function(valorCompra){
                                let valorCompraProduto = valorCompra
                                if(valorCompraProduto == ""){
                                    console.log("O campo de valor do produto está vazio ")
                                    perguntarValorProduto()
                                }else if(isNaN(valorCompraProduto)){
                                    console.log("O valor do produto deve ser um número")
                                    perguntarValorProduto()
                                }else if(valorCompraProduto <= 0){
                                    console.log("O valor da compra deve ser maior do que 0")
                                    perguntarValorProduto()
                                }else {
                                    perguntarTaxaJuros()
                                    function perguntarTaxaJuros(){
                                        entradaDeDados.question("digite a taxa de juros do produto(a.m %): ", function(taxaJuros){
                                            let taxaJurosUsuario = taxaJuros
                                            if(taxaJurosUsuario == ""){
                                                console.log("O campo de taxa de juros está vazio")
                                                perguntarTaxaJuros()
                                            }else if(isNaN(taxaJurosUsuario)){
                                                console.log("A taxa de juros deve ser um número ")
                                                perguntarTaxaJuros()
                                            }else if(taxaJurosUsuario <= 0){                                                
                                                console.log("A taxa de juros deve ser maior que 0")
                                                perguntarTaxaJuros()
                                            }else{
                                                perguntarTipoTempo()
                                                function perguntarTipoTempo(){
                                                    entradaDeDados.question("Você deseja inserir o tempo de pagamento em Anos (digite \"a\") ou em Meses (digite \"m\"): ", function(tipoTempo){
                                                        if(tipoTempo == "a" || tipoTempo == "A" || tipoTempo == "m" || tipoTempo == "M" ){   
                                                            let tempoPagamento = tipoTempo
                    
                                                            if(tempoPagamento == "m" || tempoPagamento == "M"){
                                                                perguntarQuantidadeMeses()
                                                                function perguntarQuantidadeMeses(){
                                                                    entradaDeDados.question("Digite a quantidade de meses de pagamento: ", function(meses){
                                                                        let tempoMeses = meses
                                                                        if(tempoMeses == ""){
                                                                            console.log("O campo de quantidade de meses está vazio")
                                                                            perguntarQuantidadeMeses()
                                                                        }else if(isNaN(tempoMeses)){
                                                                            console.log("O campo de quantidade de meses tem que ser um número")
                                                                            perguntarQuantidadeMeses()
                                                                        }else if(tempoMeses <= 1){
                                                                            console.log("A quantidade de meses deve ser maior que 1")
                                                                            perguntarQuantidadeMeses()
                                                                        }else{
                                                                            calcularJurosComposto(taxaJurosUsuario, tempoMeses, valorCompraProduto, nomeUsuario, nomeProduto);
                                                                            entradaDeDados.close()
                                                                        }
                                                                    })
                                                                }
                                                            }
                    
                                                            if(tempoPagamento == "a" || tempoPagamento == "A"){
                                                                perguntarQuantidadeAnos()
                                                                function perguntarQuantidadeAnos(){
                                                                    entradaDeDados.question("Digite a quantidade de anos de pagamento: ", function(anos){
                                                                        let quantidadeAnos = anos
                                                                        if(quantidadeAnos == ""){
                                                                            console.log("O campo de quantidade de anos está vazio")
                                                                            perguntarQuantidadeAnos()
                                                                        }else if(isNaN(quantidadeAnos)){
                                                                            console.log("O campo de quantidade de anos tem que ser um número")
                                                                            perguntarQuantidadeAnos()
                                                                        }else if(quantidadeAnos <= 0){
                                                                            console.log("A quantidade de anos deve ser maior que 0")
                                                                            perguntarQuantidadeAnos()
                                                                        }else{
                                                                            let tempoMeses = quantidadeAnos * 12
                                                                            calcularJurosComposto(taxaJurosUsuario, tempoMeses, valorCompraProduto, nomeUsuario, nomeProduto);
                                                                            entradaDeDados.close()
                                                                        }                                            
                                                                    })
                                                                }
                                                            }
                                                        }else{
                                                            console.log("Entrada de dados invalida")
                                                            perguntarTipoTempo()
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}


function calcularJurosComposto(taxaJurosUsuario, tempoMeses, valorCompraProduto, nomeUsuario, nomeProduto){
    let taxaJurosDecimal = Number(taxaJurosUsuario) / 100 
    console.log(tempoMeses)

    let montante = Number(valorCompraProduto) * (1 + Number(taxaJurosDecimal)) ** Number(tempoMeses)
    let jurosFinal =  Number(montante) - Number(valorCompraProduto)

    mostrarResultado(nomeUsuario, nomeProduto, valorCompraProduto, tempoMeses, montante, jurosFinal)

}

function mostrarResultado(nomeUsuario, nomeProduto, valorCompraProduto, tempoMeses, montante, jurosFinal){
    console.log(`
        ************************************************ [Viva Moda] ************************************************\n
        Muito obrigado por realizar a sua compra conosco Sr(a) ${nomeUsuario}.\n
        A compra do produto ${nomeProduto}, tem um valor de: ${green}R$${Number(valorCompraProduto).toFixed(2) + reset}.\n
        A sua compra será parcelada em ${tempoMeses} vezes e o Sr(a) pagará: ${green}R$${Number(montante).toFixed(2) + reset}.\n
        O acréscimo realizado ao valor de: ${green}R$${Number(valorCompraProduto).toFixed(2) + reset} será de ${green}R$${Number(jurosFinal).toFixed(2) + reset}.\n                       
        Muito obrigado por escolher a Viva Moda.\n
        *************************************************************************************************************\n 
                `)
        
}

perguntarNomeUsuario()