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

// const modifiers = [1,2,5];

// function areAllEqual(arr){
//     let areAllEqual = true;
//     let firstElement = arr[0];
//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] != firstElement)
//         {
//             areAllEqual = false;
//             break;
//         }
//     }
//     return areAllEqual;
// }

function equalByDivisor(arr, min, i) {
    let target = min - i;
    let colleagueChocoCount = 0;
    let operations = 0;
    for (colleagueChocoCount of arr) {
        let distanceFromColleagueToMin = colleagueChocoCount - target;
        operations += Math.trunc(distanceFromColleagueToMin / 5);
        operations += Math.trunc(Math.trunc(distanceFromColleagueToMin % 5) / 2);
        operations += Math.trunc(Math.trunc(distanceFromColleagueToMin % 5) % 2);
    }
    return operations;
}

function equal(arr) {

    let numberOfOperations = Number.MAX_SAFE_INTEGER;

    let min = Math.min.apply(Math, arr);

    for (let i = 0; i < 5; i++) {
        let result = equalByDivisor(arr.slice(), min, i);
        numberOfOperations = Math.min(numberOfOperations, result);
    }
    /*
    let reducerFunction = function (accumulator, element, index, arr) {
        return accumulator && (element === firstElement);
    } 
    let areAllEqual = arr.reduce(reducerFunction, true);
    */
    return numberOfOperations;
}


function main() {
    const ws = process.stdout;

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);
        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = equal(arr);

        ws.write(result + "\n");
    }
    ws.end();
}
