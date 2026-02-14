const tratamento = require('./tratamento')
const calculos = require('./calculo')

//testando se a verificação de 3 pontos/virgula está funcionando individualmente
const testeTresDecimais = "1.2.3"
const resultadoDecimal = tratamento.verificarDuasCasas(testeTresDecimais)
console.log(resultadoDecimal)

//testando se a verificação de uma entrada de dados é um número está funcionando individualmente
const testeTratarNumero = "a"
const resultadoTratarNum = tratamento.tratarNumero(testeTratarNumero)
console.log(resultadoTratarNum)

//testando se a verificação de transformar virgula em ponto está funcionando individualmente está funcionando individualmente
const testeTransformarVirgula = "palavra1,palavra2,palavra3"
const resultadoTransformarVirgula = tratamento.transformarVirgulaEmPonto(testeTransformarVirgula)
console.log(resultadoTransformarVirgula)

//testando se o calculo de somar está funcionando individualmente
const testeSomar1 = "20" 
const testeSomar2 = "10"
const resultadoSomar = calculos.calcularSoma(testeSomar1, testeSomar2)
console.log(resultadoSomar)

//testando se o calculo de subtração está funcionando individualmente
const testeSub1 = "20" 
const testeSub2 = "10"
const resultadoSub = calculos.calcularSubtracao(testeSub1, testeSub2)
console.log(resultadoSub)

//testando se o calculo de multiplicação está funcionando individualmente
const testeMulti1 = "20" 
const testeMulti2 = "10"
const resultadoMulti = calculos.calcularMultiplicacao(testeMulti1, testeMulti2)
console.log(resultadoMulti)

//testando se o calculo de divisão está funcionando individualmente
const testeDiv1 = "20" 
const testeDiv2 = "10"
const resultadoDiv = calculos.calcularDivisao(testeDiv1, testeDiv2)
console.log(resultadoDiv)
