a = {a: 2}
b = structuredClone(a)

b.a = 5

console.log(b)