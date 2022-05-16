function Node(val) {
    this.value = val;
    this.next = null;
}

function List() {
    this.head = null;
    this.size = 0;
}

List.prototype.add = function(element) {
    //create the node
    newNode = new Node(element);
    if (this.head == null) {
        this.head = newNode;
    }
    else {
        let currentNode = this.head;
        while (currentNode.next != null) {
            currentNode = currentNode.next;
        }
        currentNode.next = newNode;
    }
    this.size++;
}

List.prototype.print = function(separator = ",") {
    let currentNode = this.head;
    let result = "";
    while (currentNode != null) {
        result += currentNode.value;
        if (currentNode.next != null) {
            result += separator;
        }
        currentNode = currentNode.next;
    }
    console.log(result);
}

List.prototype.insertAt = function(element, location) {
    if (location >= this.size) {
        location = this.size;
    }
    if (location < 0) {
        //takes it backwards from the end
        location = this.size + location;
    }
    let newNode = new Node(element);
    if (location === 0) {
        newNode.next = this.head;
        this.head = newNode;
    }
    else {
        let curPos = 1;
        let currentNode = this.head;
        while (curPos < location) {
            currentNode = currentNode.next;
            curPos++;
        }

         if (curPos === location) {
            newNode.next = currentNode.next;
            currentNode.next = newNode;
         }
    }
    this.size++;
}

List.prototype.removeFrom = function(location) {
    if (this.size === 0) {
        return null;
    }
    if (location >= this.size - 1) {
        location = this.size - 1; // can't remove non-existent elements
    }
    if (location < 0) {
        //takes it backwards from the end
        location = this.size + location;
    }
    let returnNode = this.head;
    if (location === 0) {
        this.head = this.head.next;
    }
    else {
        let curPos = 1;
        let currentNode = this.head;
        while (curPos < location) {
            currentNode = currentNode.next;
            curPos++;
        }
        if (curPos === location) {
            returnNode = currentNode.next;
            currentNode.next = currentNode.next.next;
         }
    }
    this.size--;
    return returnNode;
}

List.prototype.removeElement = function(element) {
    if (this.size === 0) {
        return null;
    }
    else {
        let returnNode = this.head;
        if (this.head.value === element) {
            this.head = this.head.next;
            this.size--;
        }
        else {
            let currentNode = this.head;
            while(currentNode.next != null) {
                if (currentNode.next.value === element) {
                    returnNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                    this.size--;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        return returnNode;
    }
}
    // Helper Methods
    // isEmpty
    // size_Of_List

// Test code
let myList = new List();
myList.add("Rolando");
myList.print();
myList.add("Anthony");
myList.print("|");
myList.add("Aider");
myList.add("Aider");
myList.add("Aider");
myList.print(" ");
myList.insertAt("Jeannette", 5);
myList.print(" ");
myList.insertAt("Diana", 5);
myList.print(" ");
myList.insertAt("Sharon", 0);
myList.print(" ");
myList.insertAt("Papi", 1);
myList.print(" ");
myList.removeElement("Aider");
myList.print(";")
myList.removeElement("Sharon")
myList.print(";")
myList.removeFrom(3);
myList.print(" ");
myList.removeFrom(10);
myList.print(" ");
myList.removeFrom(0);
myList.print(" ");
myList.removeFrom(1);
myList.print(" ");
let breakpoint = 1;