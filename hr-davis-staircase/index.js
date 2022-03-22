const { memoryUsage } = require("process");

// THIS FUNCTION IS VERY INEFFICIENT AS IT DOESN'T USE RECURSION IN FIBONACCI STYLE.
// SEE EXAMPLE BELOW OF THE PATTERN stairs(n) = stairs(n-1)+stairs(n-2)+stairs(n-3)
function stepPerms(n) {
    let options = [1,2,3];
    let possibilities = getCombinations(n, options);
    let totalCount = possibilities.reduce(getPermutationCount,0);
    return totalCount;
}

function getCombinations(n, options) {
    // setup table for memoization. Later could optimize to hashtable
    let memo = new Array(n+1);
    for (let i = 0; i <= n; i++) {
        memo[i] = new Array(); // array of solutions
        memo[i].push(new Array()) // empty solution
    }
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        for (let j = 1; j <= n; j++) {
            if (option <= j) {
                // add the new coin to the previous results
                // add the coin to the results in memo[j-option]
                let biggerArray = JSON.parse(JSON.stringify(memo[j-option]));
                // combines the new value to add with all previous results
                biggerArray.forEach(element => {
                    element.push(option);
                });
                if (memo[j][0].length > 0) {
                    biggerArray = biggerArray.concat(memo[j]);
                }
                memo[j] = biggerArray;
            }
        }
    }
    return memo[n];
}

function getPermutationCount(previousValue, newValue, index, array) {
    let higherFreq = 0;
    let higherFreqNumber = 0;
    let currentSolution = array[index];
    let denominators = {};
    for (let i = 0; i < currentSolution.length; i++) {
        let opt = currentSolution[i]
        denominators[opt] = (denominators[opt] || 0) + 1;
        if (denominators[opt] >= higherFreq) {
            higherFreq = denominators[opt];
            higherFreqNumber = opt;
        }
    }
    //cancels out the call of the bigger frequency number with the numerator
    denominators[higherFreqNumber] = denominators[higherFreqNumber] - higherFreq;
    let denominator = 1;
    for (let den of Object.keys(denominators)) {
        denominator *= factorial(denominators[den]);
    }
    let numerator = smartFactorial(currentSolution.length,higherFreq);
    return previousValue + numerator/denominator;
}

function factorial(n) {
    return smartFactorial(n,1);
}

function smartFactorial(upperBound, lowerBound) {
    let res = 1;
    if (upperBound != 0 && upperBound != 1) {        
        while (upperBound > lowerBound) {
            res *= upperBound;
            upperBound--;
        }
    }
    return res;
}

let res = stepPerms(5);
console.log(res);

/**
// Explanation of the recursive solution stairs(n) = stairs(n-1)+stairs(n-2)+stairs(n-3)
1
1 -- 1

11
2
2 -- 2

111
21
12
3
3 -- 4

1+111
1+12
1+21
1+3
2+11
2+2
3+1
4 -- 7

1+1111
1+112
1+121
1+13
1+211
1+22
1+31
2+111
2+12
2+21
2+3
3+11
3+2
5 -- 13

 */
