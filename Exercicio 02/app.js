/***********************************************************************************************
 * Objetivo: sistema de gestão integrado
 * Data: 04/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const { read } = require("fs")
const readline = require("readline")
const green = '\x1b[32m'; //cores para a saída final do app
const reset = '\x1b[0m'; //reset da cor para controlar quais palavras serão verdes

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function perguntarNomeUsuario(){ //criei as funçoes de "perguntar" para retornar a função da pergunta em questão quando o usuário não passar na validação
    entradaDeDados.question("Digite o seu nome: ", function(nome){
        let nomeUsuario = nome
        if(nomeUsuario == ""){ //vefica se a caixa está vazia
            console.log("O campo de nome de usuário está vazio")
            perguntarNomeUsuario() //retorna a pergunta
        }else if(!isNaN(nomeUsuario)){ //verifica se o nome do usuário é um número é um número
            console.log("Não é possível ter números na caixa de nome de usuário")
            perguntarNomeUsuario()
        }else{
            perguntarNomeProduto() //chama a pergunta de nome do produto
            function perguntarNomeProduto(){
                entradaDeDados.question("Digite o nome do produto comprado: ", function(produto){
                    let nomeProduto = produto
                    if(nomeProduto == ""){ //vefica se a caixa está vazia
                        console.log("O campo de nome do produto está vazio")
                        perguntarNomeProduto()
                    }else if(!isNaN(nomeProduto)){ //verifica se o nome do produto é um número 
                        console.log("o nome do produto não pode ser um número")
                        perguntarNomeProduto()
                    }else{
                        perguntarValorProduto() //chama a pergunta de valor de produto
                        function perguntarValorProduto(){
                            entradaDeDados.question("digite o valor da compra do produto " + nomeProduto + ": R$", function(valorCompra){
                                let valorCompraProduto = valorCompra
                                if(valorCompraProduto == ""){ //vefica se a caixa está vazia
                                    console.log("O campo de valor do produto está vazio ")
                                    perguntarValorProduto()
                                }else if(isNaN(valorCompraProduto)){ //verifica se o valor do produto não é um número
                                    console.log("O valor do produto deve ser um número")
                                    perguntarValorProduto()
                                }else if(valorCompraProduto < 0){ //verifica se o valor do produto é menor que zero
                                    console.log("O valor da compra deve ser maior do que 0")
                                    perguntarValorProduto()
                                }else {
                                    perguntarTaxaJuros() //chama a pergunta de taxa de juros
                                    function perguntarTaxaJuros(){
                                        entradaDeDados.question("digite a taxa de juros do produto(a.m %): ", function(taxaJuros){ 
                                            let taxaJurosUsuario = taxaJuros
                                            if(taxaJurosUsuario == ""){ //vefica se a caixa está vazia
                                                console.log("O campo de taxa de juros está vazio")
                                                perguntarTaxaJuros()
                                            }else if(isNaN(taxaJurosUsuario)){ //verifica se a taxa de juros não é um número
                                                console.log("A taxa de juros deve ser um número ")
                                                perguntarTaxaJuros()
                                            }else if(taxaJurosUsuario <= 0){    //verifica se a taxa de juros é menor ou igual a 1                                             
                                                console.log("A taxa de juros deve ser maior que 0")
                                                perguntarTaxaJuros()
                                            }else{
                                                perguntarTipoTempo()
                                                function perguntarTipoTempo(){
                                                    entradaDeDados.question("Você deseja inserir o tempo de pagamento em Anos (digite \"a\") ou em Meses (digite \"m\"): ", function(tipoTempo){
                                                        //verifica se o usuário colocou algo diferente das opções acima 
                                                        if(tipoTempo == "a" || tipoTempo == "A" || tipoTempo == "m" || tipoTempo == "M" ){   
                                                            let tempoPagamento = tipoTempo
                                                            //valida se a resposta foi mês e realiza o resto do código com base nisso 
                                                            if(tempoPagamento == "m" || tempoPagamento == "M"){
                                                                perguntarQuantidadeMeses() //chama a função de pergunta
                                                                function perguntarQuantidadeMeses(){
                                                                    entradaDeDados.question("Digite a quantidade de meses de pagamento: ", function(meses){
                                                                        let tempoMeses = meses
                                                                        if(tempoMeses == ""){ //verifica se a caixa está vazia
                                                                            console.log("O campo de quantidade de meses está vazio")
                                                                            perguntarQuantidadeMeses()
                                                                        }else if(isNaN(tempoMeses)){ //verifica se o tempo de meses não é um número
                                                                            console.log("O campo de quantidade de meses tem que ser um número")
                                                                            perguntarQuantidadeMeses()
                                                                        }else if(tempoMeses <= 1){ //verifica se o tempo de meses colocado é menor ou igual a 1
                                                                            console.log("A quantidade de meses deve ser maior que 1")
                                                                            perguntarQuantidadeMeses()
                                                                        }else{
                                                                            calcularJurosComposto(taxaJurosUsuario, tempoMeses, valorCompraProduto, nomeUsuario, nomeProduto);
                                                                            entradaDeDados.close()
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            //valida se a resposta foi ano e realiza o resto do código com base nisso 
                                                            if(tempoPagamento == "a" || tempoPagamento == "A"){
                                                                perguntarQuantidadeAnos() //chama a função de perguntar
                                                                function perguntarQuantidadeAnos(){
                                                                    entradaDeDados.question("Digite a quantidade de anos de pagamento: ", function(anos){
                                                                        let quantidadeAnos = anos
                                                                        if(quantidadeAnos == ""){ //verifica se a caixa está vazia
                                                                            console.log("O campo de quantidade de anos está vazio")
                                                                            perguntarQuantidadeAnos()
                                                                        }else if(isNaN(quantidadeAnos)){ //verifica se a quantidade de anos é um número
                                                                            console.log("O campo de quantidade de anos tem que ser um número")
                                                                            perguntarQuantidadeAnos()
                                                                        }else if(quantidadeAnos <= 0){ // verifica se a quantidade de anos é menor ou igual a 0
                                                                            console.log("A quantidade de anos deve ser maior que 0")
                                                                            perguntarQuantidadeAnos()
                                                                        }else{
                                                                            let tempoMeses = quantidadeAnos * 12
                                                                            //chama  a função para calcular o juros composto enviando os argumentos necessários 
                                                                            calcularJurosComposto(taxaJurosUsuario, tempoMeses, valorCompraProduto, nomeUsuario, nomeProduto); 
                                                                            entradaDeDados.close() //fecha a entrada de dados para possibilitar a escrita no console novamente
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
    let taxaJurosDecimal = Number(taxaJurosUsuario) / 100  //coloca a taxa escrita pelo usuário em número decimal para o cálculo

    //cálculo conforme a equação do montante em juros compostos
    let montante = Number(valorCompraProduto) * (1 + Number(taxaJurosDecimal)) ** Number(tempoMeses)
    //cálculo do valor adicionado ao capital inicial
    let jurosFinal =  Number(montante) - Number(valorCompraProduto)
    //chama uma função para mostrar o resultado, levando para ela todos os argumentos necessários
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

perguntarNomeUsuario() //chama a primeira função para começar a aplicação