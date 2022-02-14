// Object creation dummy test code

function Rectangle() {

}
Rectangle.prototype.height = 1;
Rectangle.prototype.width = 1;
Rectangle.prototype.perimeter = function() { 
    return this.height * 2 + this.width * 2; 
};
Rectangle.prototype.area = function() {
    return this.height * this.width;
}
var objRect = new Rectangle();
console.log(objRect.perimeter()); //4
console.log(objRect.area()); //1
let property = "width";
objRect[property] = 4;
objRect.height = 1;
console.log(objRect.perimeter()); //10
console.log(objRect.area()); //4
console.log("diameter" in objRect); //false
console.log("perimeter" in objRect); // true
console.log(objRect.hasOwnProperty("radius")); // false
objRect.radius = 1;
console.log(objRect.hasOwnProperty("radius")); // true
delete objRect.perimeter; //can't delete from the prototype
delete objRect.radius; // deleted
console.log(objRect.hasOwnProperty("radius")); // false
console.log(objRect.hasOwnProperty("perimeter")); //false. it's not own
console.log(objRect.perimeter()); // 10
for(var prop in objRect) {
    console.log(prop);
}
console.log("does obj have hasOwnProperty?: " + ("hasOwnProperty" in objRect)); // True

var mangoObj = { color: "yellow", shape: "round", sweetness:8,
displayTaste: function() { console.log("Delicious!")} }
var anotherMango = mangoObj;
mangoObj.color = "orange";
anotherMango.hasSalt = true;
console.log(JSON.stringify(mangoObj, null, 4)); // JSON
console.log(mangoObj); //curly brace array
console.log(anotherMango); //same curly brace array
mangoObj.displayTaste(); //Delicious!

let serialMango = JSON.stringify(mangoObj, null, 4);
console.log(serialMango); // JSON
let deserialMangoObj = JSON.parse(serialMango);

console.log(deserialMangoObj.sweetness); //8


//foreach test
let arraytest = [1,2,3,4];
arraytest.forEach(function(number) { console.log("I am "+ number)});