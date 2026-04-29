a = {a: 2}
b = structuredClone(a)

b.a = 5

console.log(b)

let teste = new Date(a)
console.log(a)





const json = {a : [1,2,3], b: null}
const jsonClone = JSON.parse(JSON.stringify(json))


console.log(jsonClone)
