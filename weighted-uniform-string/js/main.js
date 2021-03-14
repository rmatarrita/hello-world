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

// Complete the weightedUniformStrings function below.
function weightedUniformStrings(s, queries) {
    let stringOutput = "";
    const aCharValue = "a".charCodeAt(0);
    let results = new Object(); // let results = {}
    let currentCharValue = 0;
    let previousCharValue = s.charCodeAt(0); // |s| >= 1
    let currentCharWeight = previousCharValue - aCharValue + 1;
    let uniformWeight = currentCharWeight;
    results[uniformWeight] = "Yes";
    for (let i = 1; i < s.length; i++) {
        currentCharValue = s.charCodeAt(i);
        currentCharWeight = currentCharValue - aCharValue + 1
        if (previousCharValue != currentCharValue) {
            // new character 
            uniformWeight = currentCharWeight;
            results[uniformWeight] = "Yes";
        }
        else { // continuous sequence
            uniformWeight = uniformWeight + currentCharWeight;
            results[uniformWeight] = "Yes"
        }
        previousCharValue = currentCharValue;
    }
    for (let query of queries){
        if (results[query] === "Yes") {
            stringOutput += "Yes" + "\n";
        }
        else {
            stringOutput += "No" + "\n"
        }
    }
    return stringOutput;
}

function main() {
    const ws = process.stdout;
    
    const s = readLine();

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = weightedUniformStrings(s, queries);

    //ws.write(result.join("\n") + "\n");
    ws.write(result);

    ws.end();
}
