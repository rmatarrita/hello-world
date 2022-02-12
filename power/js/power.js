'use strict';

function power(x,y) {
    let result = 1;
    while (y >= 1) {
        result = result * x;
        y--;
    }
    return result;
}

function powerLogN(x,y) {
    if (y==1) {
        return x;
    }
    if (y==0) {
        return 1;
    }
    let result = 1;
    let oddExponent = y % 2;
    if (oddExponent) {
        y--;
    }
    let halfResult = powerLogN(x, y/2);
    result = halfResult * halfResult;
    if (oddExponent) {
        result = result * x;
    } 
    return result;
}

// function main() {
//     let test = powerLogN(2,8);
//     console.log(test);
// }

//main();

module.exports = { power, powerLogN };

//export { powerLogN };