/***********************************************************************************************
 * Objetivo: Manipular dadaos utilizando array e JSON
 * Data: 05/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
/* 
    [ ] -> Objeto do tipo ARRAY
    { } -> Objeto do tipo JSON

    Array - É um objeto na memória que permite trabalhar com vários valores em um único objeto

        let nome1 = 'Jose'
        let nome2 = 'Maria'
        let nome3 = 'João'
        
        | 
        |
        | 
                      0        1       2  
        let nome = ['Jose', 'Maria', 'Jõao']
    
    JSON - É um objeto na memoria que permite trabalhar com chave e valor
        let nome        = 'Jose'
        let telefone    = '123423534'
        let email       = 'jose123@gmail.com'

        |
        |
        |

        let nome = {
                     "nome": "Jose", 
                     "telefone": "123423534", 
                     "email": "jose123@gmail.com"  
                    }
*/

//formas de criar um array
const listaDeNomes      = ['José', 'Maria',  'João', 'Pedro', 'Andre']
const listaDeClientes   = []

const exibirDados = function(){
    //Exibe o objeto array e seu conteudo
    console.log(listaDeNomes)

    //Exibe o objeto array em formato de tabela com seus indices
    console.table(listaDeNomes)

    //retorna o tipo de dado do valor de um determindado indice do array
    console.log(typeof(listaDeNomes[1]))

    //imprime os 4 primeiros conteudos do indice 
    console.log(`O nome do cliente é: ${listaDeNomes[0]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[1]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[2]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[3]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[4]}`)

    //imprime todos os conteudos do indice com for
    console.log('*************** FOR ***************')
    for(cont = 0; cont < listaDeNomes.length; cont++){
        console.log(`O nome do cliente é: ${listaDeNomes[cont]}`)
    }
 
    //imprime todos os conteudos do indice com while
    console.log('*************** WHILE ***************')
    let contW = 0
    while(contW < listaDeNomes.length){
        console.log(`O nome do cliente é: ${listaDeNomes[contW]}`)
        contW++
    }

    console.log('*************** FOR EACH ***************')
    //for each é um metodo de array que devolve os ELEMNTOS de um array por meio da função de callback
    listaDeNomes.forEach(function(cliente){
        console.log(`O nome do cliente é: ${cliente}`)
    })

    //for in é um método que devolve ÍNDICE de um array
    console.log('*************** FOR IN ***************')
    for(cliente in listaDeNomes){
        console.log(`O nome do cliente é: ${listaDeNomes[cliente]}`)
    }

    //for in é um método que devolve ELEMENTO de um array
    console.log('*************** FOR OF ***************')
    for(cliente of listaDeNomes){
        console.log(`O nome do cliente é: ${cliente}`)
    }

    //identifica quantos itens tem em um array
    console.log(listaDeNomes.le)
}


//Manipula dados em um array
const manipularDados = function(){
    //Adiconando elementos no array pelo indice
    listaDeClientes[0]      = 'Silva'
    listaDeClientes[1]      = 'Carlos'
    listaDeClientes[2]      = 'Marcia'
    listaDeClientes[20]     = 'Lucas'
    listaDeClientes.forEach(cliente => console.log(cliente))

    const listaDeForncedores = []

    //O push permite adicionar elementos dentro do array sempre no final da lista
    listaDeForncedores.push('Reutechzar', 'Hellmans', "Lai")
    listaDeForncedores.forEach(cliente => console.log(cliente))
}
manipularDados()