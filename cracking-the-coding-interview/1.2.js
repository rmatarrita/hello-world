function isPermutation(strPerm,strSearch) {
    let dict = {};
    let allZeros = false;
    for (let c of strPerm) {
        dict[c] = (dict[c] || 0) + 1;
    }
    for (let c of strSearch) {
        dict[c] = (dict[c] || 0) - 1;
        if (dict[c] < 0) {
            return allZeros; // OPTIMIZATION BECAUSE THIS IS THE SECOND 
                              // STRING, SO THIS CHARACTER WAS NOT IN THE FIRST ONE
        }
    }
    let zeroChecker = (element) => element === 0;
    let valuesArray = Object.values(dict);
    allZeros = valuesArray.every(zeroChecker);
    return allZeros;
}

let test = isPermutation("abc", "bda");