const validacao = require('../../module/validacao.js')
const aluno = require('./Aluno.js')

const identificarSexoProfessor = function(sexo){
    let sexoRecebido = String(sexo).toLowerCase()
    let exibicaoFinal
    if (validacao.validarSexo(sexoRecebido)){
        if(sexoRecebido == "masculino")
            exibicaoFinal = "Professor"
        else
            exibicaoFinal = "Professora"

        return exibicaoFinal
    }else{
        return false
    }
}

const identificarSexoAluno = function(sexo){
    let sexoRecebido = String(sexo).toLowerCase()
    let exibicaoFinal
    if (validacao.validarSexo(sexoRecebido)){
        if(sexoRecebido == "masculino")
            exibicaoFinal = "O aluno"
        else
            exibicaoFinal = "A aluna"

        return exibicaoFinal
    }else{
        return false
    }
}


const exibirSaida = function(sexoAluno, nomeAluno, disciplina, curso, sexoProfessor, nomeProfessor, n1, n2, n3, n4){
    if(validacao.validarVazio(nomeAluno) && validacao.validarVazio(disciplina) && validacao.validarVazio(curso) && validacao.validarVazio(nomeProfessor)){
        let exbicaoSexoAluno = String(identificarSexoAluno(sexoAluno))
        let nomeAlunoRecebido = String(nomeAluno)
        let disciplinaRecebida = String(disciplina)
        let cursoRecebido = String(curso)
        let exibicaoSexoProf = String(identificarSexoProfessor(sexoProfessor))
        let nomeProfessorRecebido = String(nomeProfessor)
        let nota1 = String(n1)
        let nota2 = String(n2)
        let nota3 = String(n3)
        let nota4 = String(n4)
        let media = aluno.calcularMedia(n1, n2, n3, n4)
        let status = aluno.definirStatus(media)

        console.log(`
                        ${exbicaoSexoAluno} ${nomeAlunoRecebido} foi ${status} na disciplina ${disciplinaRecebida}.\n
                        Curso: ${cursoRecebido}\n
                        ${exibicaoSexoProf}: ${nomeProfessorRecebido}\n
                        Notas: ${nota1}, ${nota2}, ${nota3}, ${nota4}\n
                        Média Final: ${media}`)
    }else{
        return false
    }
}

const exibirSaidaRecuperacao = function(sexoAluno, nomeAluno, disciplina, curso, sexoProfessor, nomeProfessor, n1, n2, n3, n4, notaExame){
    if(validacao.validarVazio(nomeAluno) && validacao.validarVazio(disciplina) && validacao.validarVazio(curso) && validacao.validarVazio(nomeProfessor) && validacao.chamarValidacoes(notaExame)){
        let exbicaoSexoAluno = String(identificarSexoAluno(sexoAluno))
        let nomeAlunoRecebido = String(nomeAluno)
        let disciplinaRecebida = String(disciplina)
        let cursoRecebido = String(curso)
        let exibicaoSexoProf = String(identificarSexoProfessor(sexoProfessor))
        let nomeProfessorRecebido = String(nomeProfessor)
        let nota1 = String(n1)
        let nota2 = String(n2)
        let nota3 = String(n3)
        let nota4 = String(n4)
        let notaExameRecebida = String(notaExame)
        let media = aluno.calcularMedia(n1, n2, n3, n4)
        let mediaFinalExame = Number(media) + Number(notaExameRecebida)
        let status = aluno.definirStatus(mediaFinalExame)

        console.log(`
                        ${exbicaoSexoAluno} ${nomeAlunoRecebido} foi ${status} na disciplina ${disciplinaRecebida}.\n
                        Curso: ${cursoRecebido}\n
                        ${exibicaoSexoProf}: ${nomeProfessorRecebido}\n
                        Notas: ${nota1}, ${nota2}, ${nota3}, ${nota4}, ${notaExameRecebida}\n
                        Média Final: ${media}\n
                        Média final do Exame: ${mediaFinalExame}
                        `)
    }else{
        return false
    }
}

module.exports = {
    exibirSaida,
    exibirSaidaRecuperacao
}