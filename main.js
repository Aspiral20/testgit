console.log('hello');

//========================================= Closure task =========================================//
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


//========================================= Cash task =========================================//
const memoize = (functions) => {
    const cash = {}
    const functsArr = Object.keys(functions)
    
    return function(funcName) {
        
        if(functsArr.includes(funcName)) {
            if (!cash[funcName]) {
                cash[funcName] = []
            }
            
            return function(...args) {
                const funcCall = functions[funcName]
                const result = funcCall(...args);
                
                
                if(!cash[funcName].includes(result)) {
                    cash[funcName].push(result)
                }
                return cash
            }
        } else {
            console.error(`Invalid function name: "${funcName}", permited functions: "${functsArr}"`)
        }
    }
}

const add = (a,b) => a + b
const dec = (a,b) => a - b
const div = (a,b) => a / b
const mul = (a,b) => a * b

const cachedFunctions = memoize({add, dec, div, mul})
const cachDec = cachedFunctions('dec')

console.log(cachedFunctions('add')(1,3), cachedFunctions('add')(1,3))
console.log(cachDec(1,2), cachDec(1,3))
console.log(cachDec(1,5))

// Output
// const cash = {
//     dec: [ -1, -2, -4 ],
//     add: [ 4 ]
// }

