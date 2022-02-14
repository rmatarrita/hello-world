'use strict';

const { runCLI } = require("jest");

function ListNode() {
}

function ListNode(nValue) {
    this.previous = null;
    this.next = null;
    this.nodeValue = nValue;
}

function SimpleHashtable() {
    this.arraySize = 100
    this.bucketList = new Array(this.arraySize);
}

SimpleHashtable.prototype.getHashCode = function(value) {
    let result = null;
    if ((value != null) && (value != "") && (value.toString().trim() != "")) {
        result = Math.abs(value.toString().charCodeAt(0) % this.arraySize);
    }
    else {
        throw "Invalid key!";
    }
    return result;    
};

SimpleHashtable.prototype.add = function(key,value) {
    //GetHashCode for the value
    let hashCode = this.getHashCode(key);
    //Find the bucket for the value
    //Check if the key exists in the bucket
    if (this.bucketList[hashCode] == null) {
        this.bucketList[hashCode] = new ListNode();
        this.bucketList[hashCode].nodeValue = { k: key, v: value };
    }
    else {
        let currentNode = this.bucketList[hashCode];
        while (currentNode != null) {
            if (currentNode.nodeValue.k === key) {
                // replace existing value with new one
                currentNode.nodeValue = { k: key, v: value };
                break;
            }
            if (currentNode.next == null) {
                currentNode.next = new ListNode();
                currentNode.next.previous = currentNode;
                currentNode.next.nodeValue = { k: key, v: value };
                break;
            }
            else {
                currentNode = currentNode.next;
            }
        }        
    }
};

SimpleHashtable.prototype.getNodeByKey = function(key){
    let hashCode = this.getHashCode(key);
    let currentNode = this.bucketList[hashCode]
    if (currentNode != null) {        
        while (currentNode != null) {
            if (currentNode.nodeValue.k === key){
                break;
            }
            currentNode = currentNode.next;
        }
    }
    else
    {
        let message = "Node with key " + key + "not found"
        throw message; 
    }
    return currentNode;
};

SimpleHashtable.prototype.get = function(key) {
    let result = null
    let currentNode = this.getNodeByKey(key);
    if (currentNode != null) {        
        result = currentNode.nodeValue.v;
    }
    return result;
};

SimpleHashtable.prototype.remove = function(key) {
    let hashCode = this.getHashCode(key);
    let currentNode = this.getNodeByKey(key);
    if (currentNode != null) {        
        let currentPrevious = currentNode.previous;
        let currentNext = currentNode.next;
        if (currentPrevious != null) {
            currentPrevious.next = currentNext;
        }
        if (currentNext != null) {
            currentNext.previous = currentPrevious;            
        }
        if (currentPrevious == null) {
            // we're deleting the first element so we have to update 
            // the reference to head in the bucket
            this.bucketList[hashCode] = currentNext;
        }
    }
};

SimpleHashtable.prototype.containsKey = function(key) {
    let currentNode = this.getNodeByKey(key);
    return (currentNode != null);
}

var testObj = new SimpleHashtable();
testObj.add("fantastic", 1);
testObj.add("fabulous", 2);
testObj.add("formidable",3);
testObj.add("freaky",3);
testObj.remove("formidable");
testObj.remove("freaky");
testObj.remove("fantastic");
testObj.remove("fabulous");



module.exports = { ListNode, SimpleHashtable };