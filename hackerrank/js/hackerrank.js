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
 * Complete the 'shop' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. STRING_ARRAY centers
 *  4. 2D_INTEGER_ARRAY roads
 */

function shop(n, k, centers, roads) {
    // Write your code here

}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const ws = process.stdout;
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const k = parseInt(firstMultipleInput[2], 10);

    let centers = [];
    for (let i = 0; i < n; i++) {
        const centersItem = readLine();
        centers.push(centersItem);
    }

    let roads = Array(m);
    for (let i = 0; i < m; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    const res = shop(n, k, centers, roads);
    ws.write(res + '\n');
    ws.end();
}

function main() {

    // just replace this line with this line 
    
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const ws = process.stdout;

}