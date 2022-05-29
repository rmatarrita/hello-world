//4.2 Minimal Tree: Given a sorted (increasing order) array with unique integer elements, 
//write an algorithm to create a binary search tree with minimal height. 

function BSTNode(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

const PRINT_INDENT = 2;

BSTNode.prototype.print = function(indent = 0) {
    console.log(this.value.toString().padStart(indent));
    if (this.left != null) {
        this.left.print(indent+PRINT_INDENT);
    }
    if (this.right != null) {
        this.right.print(indent+PRINT_INDENT);
    }
}

function createBST(numbers) {
    if (numbers.length == 0) {
        return null;
    }
    // create a node, taking the center of the array as the value
    let centerIndex = Math.floor(numbers.length / 2);
    let rootNode = new BSTNode(numbers[centerIndex]);
    // create a BST with the elements of the left side of the array, attach it to the left child
    let leftArray = numbers.slice(0,centerIndex);
    rootNode.left = createBST(leftArray);
    // create a BST with the elements of the right side of the array, attach it to the right side 
    let rightArray = numbers.slice(centerIndex+1, numbers.length);
    rootNode.right = createBST(rightArray);
    // return the root node 
    return rootNode;
}

// TEST Code
let testArray = [];
let bstTree = createBST(testArray);
if (bstTree != null) {
    bstTree.print();
}
