console.log('hello');

// Closure task
const useFunctions = (func) => {
    let map = new Map();
    
    Object.values(func).forEach((item, i) => {
        map.set(Object.keys({...func})[i], Object.values({...func})[i])
    })
    
    return function(nameFunction) {
        if(map.has(nameFunction)) {
            
            return function(...params) {
                console.log(arguments)
                return map.get(nameFunction)(...params)
            }
        } else {
            console.error(`Invalid function name: "${nameFunction}"`)
        }
        
    }
}

const add = (a,b) => a + b
const dec = (a,b) => a - b
const div = (a,b) => a / b
const mul = (a,b) => a * b

const useFunction = useFunctions({add, div, mul, dec})
const resultFunction = useFunction('dec')(1,5)

console.log(resultFunction)
