//aplicação que solicita o nome do usuario e 3 numeros, no final mostra o nome do usuario mais a soma dos tres numeros
var readline = require("readline")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("digite o seu nome: ", function(nomeUsuario){
    entradaDeDados.question("digite o primeiro número: ", function(numeroUsuario1){
        entradaDeDados.question("digite o segundo número: ", function(numeroUsuario2){
            entradaDeDados.question("digite o terceiro número: ", function(numeroUsuario3){

                var somaDosNumeros = Number(numeroUsuario1) + Number(numeroUsuario2) + Number(numeroUsuario3)

                console.log("O nome do usuário é: " + nomeUsuario)
                console.log("A soma dos três números é: " + somaDosNumeros)
            })
        })
    })
} )