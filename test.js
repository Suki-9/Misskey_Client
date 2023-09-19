//180 ~ 190 ms
function test(n) { return n + n }


//180 ~ 190 ms
//const test = (n) => { return n + n }



const start = performance.now();

for (let i = 0; i < 100000; i++) { 
    test(100)
}

const end = performance.now();


console.log(`${(end - start)*100}ms!`);