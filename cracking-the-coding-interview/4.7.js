/*
4.7 Build Order: You are given a list of projects and a list of dependencies (which is a list of pairs of projets, where the second project is dependent on the first project). All of a project's dependencies must be built before the project is. Find a build order that will allow the projects to be built. If there is no valid build order, return an error.
EXAMPLE
Input:
  projects: a,b,c,d,e,f
  dependencies: (a,d), (f,b), (b,d), (f,a), (d,c)
Output: f,e,a,b,d,c
*/

/*
Solution: This can be seen as traversing a graph breadth-first (because I need all dependencies fulfilled to move on with the next project), and fail if we find a cycle.
Take into consideration that the graph could have multiple, separate, dependency groups
such as {e} and {c,d,a,b,f}, so the final solution is to check that all dependency groups don't have cycles.

For each element in the graph:
- build the queue of project order, if there is cycle, abort
- add the project to the queue
*/

// data structures code ---------------------------------------------

const NodeStates = Object.freeze({
    PENDING: 0,
    PARTIAL: 1,
    COMPLETED: 2
  });

function Node() {
    this.name = "";
    this.neighborList = new Array();
    this.neighborMap = new Map();
    this.dependencies = 0;
    this.state = NodeStates.PENDING;
}

function Node(nodeName) {
    this.name = nodeName;
    this.neighborList = new Array();
    this.neighborMap = new Map();
    this.dependencies = 0;
    this.state = NodeStates.PENDING;
}

Node.prototype.addNeighbor = function(neighbor) {
    if (!this.neighborMap.has(neighbor.name)) {
        this.neighborList.push(neighbor);
        this.neighborMap.set(neighbor.name, neighbor);
        neighbor.dependencies++;
    }
}

function Graph() {
    this.nodes = new Map();
}

Graph.prototype.getOrCreateNode = function(name) {
    if (!this.nodes.has(name)) {
        let newNode = new Node(name);
        this.nodes.set(name, newNode);
    }
    return this.nodes.get(name);
}

Graph.prototype.addEdge = function(a,b) {
    let nodeA = this.getOrCreateNode(a);
    let nodeB = this.getOrCreateNode(b);
    nodeA.addNeighbor(nodeB);
}

Graph.prototype.size = function() {
    return this.nodes.size;
}

// logic code -------------------------------------------------------

function buildGraph(projects, dependencies) {
    let graph = new Graph();
    projects.forEach(element => {
       graph.getOrCreateNode(element); 
    });
    dependencies.forEach(element => {
        graph.addEdge(element[0], element[1]);
    });
    return graph;
}

function findFreeNodes(buildOrder, nodes, tailIndex) {
    let count = 0;
    for (node of nodes){
        if (node.dependencies == 0) {
            buildOrder[tailIndex++] = node;
        }
    };
    return tailIndex;
}

function createBuildPlan(graph) {    
    let buildOrder = new Array(graph.size());
    let index = 0;
    // find all the nodes without dependencies and add them to the beginning of the build order
    let tailIndex = findFreeNodes(buildOrder, graph.nodes.values(), 0);  
    while(index < buildOrder.length) {
        let currentNode = buildOrder[index];
        if (currentNode == undefined) {
            return null;
        }
        currentNode.neighborList.forEach(neighbor => {
            neighbor.dependencies--;
        });
        tailIndex = findFreeNodes(buildOrder, currentNode.neighborList, tailIndex);
        index++;
    } 
    return buildOrder;
}

function printBuildPlan(plan) {
    if (plan != null) {
        console.log(plan.map(node => node.name).join());
    }
    else {
        console.log("Impossible build order");
    }
}

function traverseNode(node, buildOrder) {
    if (node.state === NodeStates.PARTIAL) {
        return false;
    }
    if (node.state === NodeStates.PENDING) {
        node.state = NodeStates.PARTIAL;
        for (neighbor of node.neighborList) {
            let success = traverseNode(neighbor, buildOrder);
            if (!success) {
                return false;
            }
        };
        node.state = NodeStates.COMPLETED;
        buildOrder.unshift(node);
    }
    return true;
}

function createBuildPlanDFS(graph) {
    let buildOrder = new Array(); // we'll use this as a stack
    for (node of graph.nodes.values()) {
        if (node.state === NodeStates.PENDING) {
            let success = traverseNode(node, buildOrder);
            if (!success) { 
                return null; 
            }
        }
    }
    return buildOrder;
}

// test code --------------------------------------------------------------------

// let projects = ["a","b","c","d","e","f"];
// let dependencies = [["a","d"],["f","b"],["b","d"],["f","a"],["d","c"]];

let projects = ["a","b","c","d","e","f","g"];
let dependencies = [["f","c"],["f","b"],["a","e"],["f","a"],["c","a"],["b","a"],["b","e"],["d","g"]];

let graph = buildGraph(projects, dependencies);

let buildPlan = createBuildPlan(graph);
printBuildPlan(buildPlan);

let secondBuildPlan = createBuildPlanDFS(graph);
printBuildPlan(secondBuildPlan);
