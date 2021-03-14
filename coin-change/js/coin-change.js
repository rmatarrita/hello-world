'use strict';

const fs = require('fs');
const readline = require('readline');

let inputString = [];
let currentLine = 0;


const fileStream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    //console.log(`Line from file: ${line}`);
    inputString.push(line);
});

rl.on('close', () => {
    main();
})


function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'getWays' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. LONG_INTEGER_ARRAY c
 */

function getWaysRecursive(n, c) {
    // Write your code here
    let ways = 0;
    if (n == 0) {
        return 1;
    }
    // n is not zero and I ran out of coin options
    if (c.length <= 0) 
    {
        return 0;
    } 
    if (c.length == 1 && c[0] > n)
    {
        return 0;
    }      
    let coin = c[0];
    let i = 0;
    while (i*coin <= n)
    {
        ways += getWaysRecursive(n-(i*coin), c.slice(1,c.length));
        i++;
    }
    return ways;
}

function getWaysDynamic(n, c) {
    // initialize matrix
    var matrix = Array(c.length+1).fill(null).map(() => Array(n+1).fill(0));
    // set base cases of recursion 
    matrix[0].fill(0);
    for (var subArr of matrix) {
        subArr[0] = 1;
    }
    for (let ci = 1; ci <= c.length; ci++){
        let coin = c[ci-1];
        for (let ni = 1; ni <= n; ni++){
            let f = 0;
            let ways = 0;
            while (f*coin <= ni)
            {
                ways += matrix[ci-1][ni-(f*coin)];
                f++;
            }
            matrix[ci][ni] = ways;
        }        
    }
    return matrix[c.length][n];
}

function getWays(n,c){
    return getWaysDynamic(n,c)
}

function main() {
    const ws = process.stdout;
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const c = readLine().replace(/\s+$/g, '').split(' ').map(cTemp => parseInt(cTemp, 10));

    // Print the number of ways of making change for 'n' units using coins having the values given by 'c'

    const ways = getWays(n, c);

    ws.write(ways + '\n');
    ws.end();
}
