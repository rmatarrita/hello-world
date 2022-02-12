'use strict';

function ListNode() {
    this.previous = null;
    this.next = null;
    this.nodeValue = "";
}

function sum(a,b) {
    return a + b;
}
module.exports = { sum, ListNode };