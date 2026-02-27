/***********************************************************************************************
 * Objetivo: entrada e saida de aprovação do aluno
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const { duplexPair } = require('stream')
const formatacao = require('./module/formatacao')
const aluno = require('./module/Aluno.js')
const readline = require('readline')

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

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
                                        }else if(status == "aprovado" || status == "reprovado"){
                                            saida = formatacao.exibirSaida(sexoAlunoRecebido, nomeALunoRecebido, disciplinaRecebida, nomeCurso, sexoProfessorRecebido, nomeProfessorRecebido, nota1, nota2, nota3, nota4)

                                            if(saida == undefined){
                                                console.log('Erro')
                                                entradaDeDados.close()
                                            }else{
                                                console.log(saida)
                                            }
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
