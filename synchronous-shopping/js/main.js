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
    
    let centersArray = [];
    centersArray = centers.map(centerString => centerString.split(' ').slice(1).map(integerString => parseInt(integerString, 10)));
    // centersArray[i] = [x, y, z]

    let missingFishList = new Array(k).fill(0).map((val, index) => index + 1); 

    let positionB = 1;
    let positionL = 1;
    let totalCost = Number.MAX_SAFE_INTEGER;
    let newMissingFishList = Object.assign(missingFishList);

    let pastCentersB = {};
    let pastCentersL = {};

    pastCentersB[positionB] = positionB;
    let totalCostB = 32423423432;
    pastCentersL[positionL] = positionL;
    let totalCostL = 32423423432;
    


    // count the fish that I already found in this location
    for(let fishType of centersArray[positionB-1]) {
        delete newMissingFishList[fishType-1];
    }

    for(let fishType of centersArray[positionL-1]) {
        delete newMissingFishList[fishType-1];
    }

    // search ends
    //- when I have all the fish types and both have arrived to n
    if (Object.keys(newMissingFishList).length === 0)
    {
        //move B and L to the exit and add that cost to the totalCost so far
        //totalCost += shortestPath(positionB, n) + shortestPath(positionL, n); 
        return totalCost;
    }

    // in each location
    // get the list of possible next locations
    // get all the potential next destinations from where B and L are
    let nextCenters = {};
    for (let road of roads) {
        if ((road[0] === positionB) || (road[0] === positionL)) {
            nextCenters[road[1]] = road[1];
        }
    }

    // now let's check if those centers are worth visiting (if I have been there already)

    


/*
    add the cost of visiting B to the total cost B
    add the cost of visiting L to the total cost L
    pass on the parameters to the next step
    get the minimum of all the options 
    
    start in 1
    B stays and L goes to 2
    B stays and L goes to 3
    B and L go to all the combination of paths
    
    get a list of all the connecting stores
    take out first store
    combine will all remainings
    take away second store
    combine with all remainings
    until we only have 1 left (nothing to combine)



    */
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