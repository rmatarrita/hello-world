function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Animal(animalType, animalName) {
    this.type = animalType;
    this.name = animalName;
    this.animalNumber = 0;
}

Animal.prototype.CAT = 0;
Animal.prototype.DOG = 1;

function AnimalShelter() {
    this.animalNumber = 0;
    this.dogs = new Array();
    this.cats = new Array();
}

AnimalShelter.prototype.enqueue = function(animal) {
    animal.animalNumber = ++this.animalNumber;
    if (animal.type === Animal.prototype.CAT) {    
        this.cats.push(animal);
    }
    if (animal.type === Animal.prototype.DOG) {
        this.dogs.push(animal);
    }
};

AnimalShelter.prototype.dequeueAny = function() {
    let selectedQueue = null;
    let newPet = null;
    // if both are empty, there are no animals to rescue
    if (this.dogs.length == 0 && this.cats.length == 0) {
        return newPet;
    }
    // if one queue is empty, force to choose the other one
    if (this.dogs.length == 0 || this.cats.length == 0) {
        if (this.dogs.length == 0) {
            selectedQueue = this.cats;
        }
        if (this.cats.length == 0) {
            selectedQueue = this.dogs;
        }
    }
    else {
        let oldestCat = this.cats[0].animalNumber;
        let oldestDog = this.dogs[0].animalNumber;
        if (oldestCat < oldestDog) {
            selectedQueue = this.cats;
        }
        else {
            selectedQueue = this.dogs;
        }
    }
    newPet = selectedQueue.shift();
    return newPet;
};

AnimalShelter.prototype.dequeueSpecific = function(queue) {
    let newPet = null;
    // if both are empty, there are no animals to rescue
    if (queue.length == 0) {
        return newPet;
    }
    else {
        newPet = queue.shift();
    }
    return newPet;
};

AnimalShelter.prototype.dequeueDog = function() {
    return this.dequeueSpecific(this.dogs);
};

AnimalShelter.prototype.dequeueCat = function() {
    return this.dequeueSpecific(this.cats);
};



































let happyShelter = new AnimalShelter();
let petType = Animal.prototype.CAT;
happyShelter.enqueue({type:Animal.prototype.CAT, name:"Misingo"});
happyShelter.enqueue({type:Animal.prototype.DOG, name:"Firulais"});
happyShelter.enqueue({type:Animal.prototype.DOG, name:"Rocky"});
happyShelter.enqueue({type:Animal.prototype.CAT, name:"Bigotes"});
happyShelter.enqueue({type:Animal.prototype.DOG, name:"Chase"});
happyShelter.enqueue({type:Animal.prototype.DOG, name:"Skye"});
let newPet = happyShelter.dequeueAny();
console.log(newPet);
// newPet = happyShelter.dequeueAny();
// console.log(newPet);
// newPet = happyShelter.dequeueAny();
// console.log(newPet);
// newPet = happyShelter.dequeueAny();
// console.log(newPet);
// newPet = happyShelter.dequeueAny();
// console.log(newPet);
newPet = happyShelter.dequeueDog();
console.log(newPet);
newPet = happyShelter.dequeueCat();
console.log(newPet);
newPet = happyShelter.dequeueDog();
console.log(newPet);
newPet = happyShelter.dequeueAny();
console.log(newPet);