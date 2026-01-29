// comentario em linha
/*
    comentario em bloco
*/

//imprime no terminal o conteúdo
console.log("Julio Madeira") 
console.log("Julio Madeira") 

//permite criar uma variável (espaço na memória)
var nome = "Murilo"
console.log(nome)

//formas de concatenar variáveis e strings
console.log("o nome do usuário é: " + nome)
console.log(`o nome do usuário é: ${nome}`)

//import da biblioteca para captar entrada de dados via terminal 
var readline = require("readline")

//cria a interface para entrada e saida de dados pelo terminal
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//função para retornar o nome difitado no terminal
    //o metodo question apos a difitalçao chama a sua função "call back"
    //para entregar o que foi digitado no terminal, atraves do argumento idadeUsuario
entradaDeDados.question("digite seu nome: ", function(nomeUsuario){
    //entrada de dados para o email
    entradaDeDados.question("digite seu email: ", function(emailUsuario) {
        console.log("o nome do usuário é: " + nomeUsuario)
        console.log("o email do usuário é: " + emailUsuario)

    })
})

