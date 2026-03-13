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
const listaDeNomes      = ['José', 'Maria',  'João', 'Pedro', 'Jake', 'Jake da silva', 'Andre', 'Carlos', 'Ana', 'Bruna', 'Jake', 'Jake']
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
    //for each é um metodo de array que devolve os ELEMENTOS de um array por meio da função de callback
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
    console.log(listaDeNomes.length)
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
    listaDeForncedores.push('Reutechzar', 'Hellmans', "Lai", 'paulo', 'julio',  'carlos', 'marcos')
    listaDeForncedores.forEach(cliente => console.log(cliente))
    console.table(listaDeForncedores)

    //adicionar um elemento no começo da lista por meio do unshift
    listaDeForncedores.unshift('Ana Carolina')
    console.table(listaDeForncedores)

    //removendo o ultimo elemento de um array
    listaDeForncedores.pop()
    console.table(listaDeForncedores)
    
    //removendo o primeiro elemento de um array
    listaDeForncedores.shift()
    console.table(listaDeForncedores)

    //apagar um elemento a partir de um indice especifico, neste caso esta pegando o indice 2 e apagando 1 elemento a partir dele, 
        //que seria o proprio elemento 2  
    listaDeForncedores.splice(2,1)
    console.table(listaDeForncedores)

    //permite adicionar um novo elemento em um lugar determinado no array
    listaDeForncedores.splice(4,0,'Carlos da Silva')
    console.table(listaDeForncedores)
}

const removerElemento = function(nome){
    console.table(listaDeNomes)

   

    //Apagando utilizando for in
    //for(indice in listaDeNomes){
        //if(nome == listaDeNomes[indice]){
            //listaDeNomes.slice(indice,1)
        //}
    //}

    //apagando utilizando filter, ainda é O(n) em quesito temporal mas gasta mais espaço
    //const lista2 = listaDeNomes.filter(n => n !== nome) //cria uma lista nova de acordo com a condicional 


    //apagando um elemento modificando o array para um Set O(1), permitindo outros comandos pois o Set 
        //armazena valores únicos e usa hash internamente para localizar elementos 
        /*
            Internamente o `Set` funciona como uma **tabela hash**:
            ```
            "Ana"    →  hash(Ana)    →  posição 42
            "Bruno"  →  hash(Bruno)  →  posição 17
            "Carlos" →  hash(Carlos) →  posição 95
        */ 

    //O set so deve ser usado quando não há necessidade de uma lista ordenada ou elementos de mesmo nome
    //Sua vantagem está no fato de que se  você chama set.delete("Ana"), 
        // o JS calcula o hash de "Ana" e vai direto para a posição 42, sem percorrer nada. 
        // Independente de ter 10 ou 1 milhão de elementos, o custo é o mesmo.
    //const set = new Set(listaDeNomes)
    //set.delete(nome)
    //console.table(set)

    let indice = listaDeNomes.indexOf(nome)
    //Apagando utilizando indexOf, caso o indexOf não ache o elemento argumentado ele retorna -1
    if(indice != -1){
        listaDeNomes.splice(indice,1)
        return listaDeNomes
    }else{
        return false
    }
}



const verificarELemento = function(nome){

    //verifica se um elemento existe dentro de um array utilizando include, retornando um booleano
    let resposta = listaDeNomes.includes(nome)
    console.log(resposta)

    //retorna se um elemento existe dentro de um Set utilizando has O(1)
    let respota2 = new Set(listaDeNomes)
    console.log(respota2.has(nome))
} 

const quantidadeItens = function(nome){

    //verificando a quantidade que um elemento aparece em um array por meio de forEach
    let cont = 0
    listaDeNomes.forEach(function(item){
        if(String(item).trim().toUpperCase() == String(nome).trim().toUpperCase())
            cont++
    })

    //verificando a quantidade que um elemento aparece em um array por meio de um filter
    let quantidade = listaDeNomes.filter(n => String(n).trim().toUpperCase() == String(nome).trim().toUpperCase()).length

    console.log(cont)
    console.log(quantidade)
}

const criarDadosJSON = function(){
    let aluno = {
        "nome"      : 'Jose',
        "ra"        :  123,
        "telefone"  : '19023791',
        "email"     : 'jose@gmail.com'
    }

    //exibindo o objeto JSON inteiro
    console.log(aluno)
    //exibindo apenas um objeto do JSON
    console.log(aluno.nome)

    //adicionando atributo ao objeto (so escrever um atributo que ainda não existe)
    aluno.sexo = 'masculino'
    console.log(aluno)

    //deleta um atributo do objeto JSON
    delete aluno.telefone
    console.log(aluno)
}

const cadastrarProduto = function(){
    let cores = [ 
        {"id":1, "cor":'branco'},      //indice 0
        {"id":2, "cor": 'verde'},      //indice 1
        {"id":3, "cor": 'vermelho'},   //indice 2
        {"id":4, "cor": 'azul'},       //indice 3
        {"id":5, "cor": 'preto'}       //indice 4
    ]

    // console.table(cores)
    // console.log(cores[4].nome)

    let modelos = [
        {   
            "id"        : 1, 
            "marca"     : "LG", 
            "telefone"  : '00-1234567890', 
            "email"     : 'lg@gmail.com'
        },
        {
            "id"        : 2, 
            "marca"     : "Dell", 
            "telefone"  : '11-213876322', 
            "email"     : 'dell@gmail.com'
        },
        {
            "id"        : 3, 
            "marca"     : "Lenovo", 
            "telefone"  : '22-4198674', 
            "email"     : 'lenovo@gmail.com'
        },
        {
            "id"        : 4, 
            "marca"     : "Apple", 
            "telefone"  : '33-321322512', 
            "email"     : 'apple@gmail.com'
        },
        {
            "id"        : 5, 
            "marca"     : "Rayzer", 
            "telefone"  : '44-321521512', 
            "email"     : 'rayzer@gmail.com'
        },
        {
            "id"        : 6, 
            "marca"     : "Logitec", 
            "telefone"  : '55-321321512', 
            "email"     : 'logitec@gmail.com' 
        }
    ]

    let produtos = [
        {
            "id"        : 1,
            "nome"      : 'monitor',
            "descricao" : 'monitor oled 27 polegadas',
            "marca"     : [modelos[1].marca],
            "quantidade": 20,
            "cor"       : [cores[0], cores[4]],
            "valor"     : 800.50
        },

        {
            "id"        : 2,
            "nome"      : 'teclado',
            "descricao" : 'teclado mecanico rgba',
            "marca"     : [modelos[5].marca],
            "quantidade": 40,
            "cor"       : cores,
            "valor"     : 150
        },

        {
            "id"        : 3,
            "nome"      : 'mouse',
            "descricao" : 'mouse sem fio',
            "marca"     : [modelos[0].marca, modelos[1].marca, modelos[5].marca],
            "quantidade": 500,
            "cor"       : [cores[0], cores[4], cores[1]],
            "valor"     : 80.00
        }
    ]

    // console.log(produtos)
    // console.log(produtos[0].cor)
    // console.log(produtos[0].cor[1].cor)
    // console.table(produtos)

    // //loop para printar todas as cores que um produto tem
    // produtos[0].cor.forEach(function(nomeCor){
    //     console.log("A cor do produto é: " + nomeCor.cor)
    // })

    /*
    Produto: XXXXXXXX
    Quantidade: xx
    Valor: XXX
    cores: XXX 
    marcas: xxxx
    */

    produtos.forEach(function(objeto){
        console.log('Produto: ' + objeto.nome)
        console.log('Quantidade: ' + objeto.quantidade)
        console.log('Valor: ' + objeto.valor)
        console.log(
                    'Cores: ' + objeto.cor.forEach(function(cores){
                        console.log(cores.cor)
                    })
                )
        console.log('Marcas: ' + objeto.marca + "\n")
        
    })
}



// let resultado = removerElemento('Maria')
// if (resultado) {
//     console.table(listaDeNomes)
//     console.log('Deu certo :)')
// }else{
//     console.log('Deu errado :(')
// }

// verificarELemento('dasdsad')
//quantidadeItens('JAke ')
cadastrarProduto()