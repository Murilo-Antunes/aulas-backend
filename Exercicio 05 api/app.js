const express = require('express') //importa o express (uma cadeia de middlewares executadas em ordem)
const app = express() //cria a variavel que vai receber a função express
const porta = 3000 //cria a variavel que vai carregar a porta do server

//variavel que importa todas as funções do modulo manipular_array
const {getCapitalEstado,getCapitalPais, getCidades, getDadosEstado, getEstadosRegiao, getListaDeEstados } = require('./module/manipular_array.js')

//começa a "usar" o express, aplica um middleware que processa o JSON
    //middleware: um software que atua como ponte entre diferentes aplicações, permitindo que eles se comuniquem
app.use(express.json())

//vai exibir a mensagem do root padrão
app.get('/', (req, res) => {
    res.json({message: 'Api funcionando'})
})

//vai servir de middleware que trata a rota /capital.pais
app.get('/capital.pais', (req, res) => {
    let resposta = getCapitalPais() //guarda o retorno da função
    if(!resposta)
        return res.status(404).json({message: 'Não encontrado'}) //se a função retornar false retorna a mensagem de erro e o codigo

    //carrega a resposta e o codigo 200 de requisição concluida com sucesso
    res.status(200).json(resposta)
})

//vai servir de middleware que trata a rota /cidades/:sigla, onde o /:sigla permite que a sigla escrita seja guardada como paramentro
app.get('/cidades/:sigla', (req, res) => {
    const sigla = req.params.sigla // guarda a sigla escrita como paramentro
    let resposta = getCidades(sigla) //guarda o retorno da função 
    if(!resposta)
        return res.status(404).json({message: 'Não encontrado'}) //se a função retornar false retorna a mensagem de erro e o codigo

    //carrega a resposta e o codigo 200 de requisição concluida com sucesso
    res.status(200).json(resposta)
})

//vai servir de middleware que trata a rota /cidades/:sigla, onde o /:sigla permite que a sigla escrita seja guardada como paramentro
app.get('/dados.estado/:sigla', (req, res) => {
    const sigla = req.params.sigla // guarda a sigla escrita como paramentro
    let resposta = getDadosEstado(sigla) //guarda o retorno da função 
    if(!resposta)
        return res.status(404).json({message: 'Não encontrado'}) //se a função retornar false retorna a mensagem de erro e o codigo

    //carrega a resposta e o codigo 200 de requisição concluida com sucesso
    res.status(200).json(resposta)
})

//vai servir de middleware que trata a rota /cidades/:regiao, onde o /:regiao permite que a regiao escrita seja guardada como paramentro
app.get('/estados.regiao/:regiao', (req, res) =>{
    const regiao = req.params.regiao //guarda a regiao escrita como paramentro
    let resposta = getEstadosRegiao(regiao) //guarda o retorno da função 
    if(!resposta)
        return res.status(404).json({message: 'Não encontrado'}) //se a função retornar false retorna a mensagem de erro e o codigo

    //carrega a resposta e o codigo 200 de requisição concluida com sucesso
    res.status(200).json(resposta)
})

//vai servir de middleware que trata a rota /cidades/:regiao
app.get('/lista.estados', (req, res) => {
    let resposta = getListaDeEstados() //guarda o retorno da função 
    if(!resposta)
        return res.status(404).json({message: 'Não encontrado'}) //se a função retornar false retorna a mensagem de erro e o codigo

    //carrega a resposta e o codigo 200 de requisição concluida com sucesso
    res.status(200).json(resposta)
})

//vai servir de middleware que trata a rota /cidades/:regiao, onde o /:regiao permite que a regiao escrita seja guardada como paramentro
app.get('/capital.estados/:sigla', (req, res) => {
    const sigla = req.params.sigla //guarda a regiao escrita como paramentro
    let resposta = getCapitalEstado(sigla) //guarda o retorno da função 
    if(!resposta)
        return res.status(404).json({message: 'Não encontrado'}) //se a função retornar false retorna a mensagem de erro e o codigo

    //carrega a resposta e o codigo 200 de requisição concluida com sucesso
    res.status(200).json(resposta)
})

//ao entrar no primeiro app.use e nenhuma rota válida for identificada, ele entra neste app.use para mostrar uma mensagem de erro padrão
app.use((req, res) => {
    res.status(404).json({message: 'Rota não encontrada'})
})

//inicia o servidor
app.listen(porta, () => {
    console.log("servidor rodando em http://localhost:" + porta)
})

