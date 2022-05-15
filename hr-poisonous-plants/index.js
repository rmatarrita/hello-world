'use strict';

const fs = require('fs');
const readline = require('readline');

// try {
//   const data = fs.readFileSync('./input27.txt', 'utf8')
//   console.log(data)
// } catch (err) {
//   console.error(err)
// }



let inputString = [];
let currentLine = 0;

const fileStream = fs.createReadStream('./input27.txt');

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

function main() {

    // just replace this line with this line 
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const ws = process.stdout;

    const n = parseInt(readLine().trim(), 10);

    const p = readLine().replace(/\s+$/g, '').split(' ').map(pTemp => parseInt(pTemp, 10));

    const result = poisonousPlants(p);

    ws.write(result + '\n');

    ws.end();
}


function poisonousPlants(p) {
    let days = 0;
    let subLists = new Array();
    let subList = new Array();
    subList.push(p[0]);
    subLists.push(subList);
    // divide the list in sublists of descending numbers
    for(let i = 1; i < p.length; i++) {
        //check if next number is greater than previous, if so create new sublist
        if (p[i] > p[i-1]) {
            subList = new Array();
            subList.push(p[i]);
            subLists.push(subList);
        }
        //else, add to current sublist
        else {
            subList.push(p[i]);
        }
    }
    while(subLists.length > 1) {
        for (let i = subLists.length-1; i > 0; i--) {
            // for all sublists except the first one, kill the first element
            subLists[i].shift();
            if (subLists[i].length == 0) {
                subLists.splice(i,1);
            }
            if (subLists.length > 1) {
                // merge any contiguous lists that are fully descending 
                if (subLists[i-1][subLists[i-1].length-1] >= subLists[i][0]) {
                    subLists[i-1] = subLists[i-1].concat(subLists[i]);
                    subLists.splice(i,1);
                }
            }
        }
        days++;
    } 
    return days;
}

//let d = poisonousPlants([6,5,8,4,7,10,9])
// let d = poisonousPlants([6,5,4,4,3,2,1])
// console.log(d);

main();
/*
4 3 7 5 6 4 2

4 3   5   4 2

4 3       4 2

4 3         2

4 3 7 5 6 4 2

4 3, 7 5, 6 4 2

4 3, 5 4 2 // one merge

4 3, 4 2

4 3 2 // another merge
*/

