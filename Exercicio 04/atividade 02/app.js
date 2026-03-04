/***********************************************************************************************
 * Objetivo: entrada e saida de aprovação do aluno
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const formatacao = require('./module/formatacao') //importa a classe de formatação
const aluno = require('./module/Aluno.js') //importa a classe que realiza as ações necessárias referentes ao aluno
const readline = require('readline') //importa o readline

//função necessária para fundir todo o exercicio em um único app, evitando a criação repetida de interfaces para entrada de dados
const alunoApp = function(entrada){ //recebe de argumento uma entrada de dados que, neste caso, vem do main.js
    let entradaDeDados = entrada
    entradaDeDados.question('Digite o sexo do aluno: ', function(sexoALuno){
        let sexoAlunoRecebido = sexoALuno
        entradaDeDados.question('Digite o nome do(a) aluno(a): ', function(nomeAluno) {
            let nomeALunoRecebido = nomeAluno
            entradaDeDados.question('Digite o nome da disciplina: ', function(disciplina){
                let disciplinaRecebida = disciplina
                entradaDeDados.question('Digite o nome do curso: ', function(curso){
                    let nomeCurso = curso
                    entradaDeDados.question('Digite o sexo do(a) professor(a): ', function(sexoProfessor){
                        let sexoProfessorRecebido = sexoProfessor
                        entradaDeDados.question('Digite o nome do professor: ', function(nomeProfessor){
                            let nomeProfessorRecebido = nomeProfessor
                            entradaDeDados.question('Digite a primeira nota: ', function(n1){
                                let nota1 = n1
                                entradaDeDados.question('Digite a segunda nota: ', function(n2){
                                    let nota2 = n2
                                    entradaDeDados.question('Digite a teceira nota: ', function(n3){
                                        let nota3 = n3
                                        entradaDeDados.question('Digite a quarta nota: ', function(n4){
                                            let nota4 = n4
    
                                            let media = aluno.calcularMedia(nota1, nota2, nota3, nota4)
                                            let status = String(aluno.definirStatus(media)).toLowerCase()
                                            let saida
                                            //verifica se o status do aluno é recuperação e chama a saída condizente a esse status
                                            if(status == "recuperação"){ 
                                                entradaDeDados.question('Digite a nota do exame: ', function(exame){
                                                    let notaExame = exame
                                                    saida = formatacao.exibirSaidaRecuperacao(sexoAlunoRecebido, nomeALunoRecebido, disciplinaRecebida, nomeCurso, sexoProfessorRecebido, nomeProfessorRecebido, nota1, nota2, nota3, nota4, notaExame)
    
                                                    if(saida == undefined){
                                                        console.log('Erro')
                                                        entradaDeDados.close()
                                                    }else{
                                                        console.log(saida)
                                                    }
                                                }) 
                                            //verifica se o status do aluno é aprovado ou reprovado e chama a saída condizente a esse status    
                                            }else if(status == "aprovado" || status == "reprovado"){ 
                                                saida = formatacao.exibirSaida(sexoAlunoRecebido, nomeALunoRecebido, disciplinaRecebida, nomeCurso, sexoProfessorRecebido, nomeProfessorRecebido, nota1, nota2, nota3, nota4)

                                            entradaDeDados.close()
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

//exporta a função 
module.exports = {
    alunoApp
}