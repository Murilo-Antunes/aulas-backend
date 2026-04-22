const a = [1,2,3]


let teste = new Date(a)
console.log(a)





const json = {a : [1,2,3], b: null}
const jsonClone = JSON.parse(JSON.stringify(json))


console.log(jsonClone)