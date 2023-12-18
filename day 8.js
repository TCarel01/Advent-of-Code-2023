const fs = require("fs");
const { start } = require("repl");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 8 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r').join('')).map((e) => e.split(' ').join(',').split('=').join(',').split('(').join(',').split(')').join(',').split(',').filter(f => f !== ''));
}

let parsedInput = parseDay1(input);

let map = {};

parsedInput.forEach((e, idx) => {
    if (idx < 2) {
        return;
    }
    let curMapObj = {};
    curMapObj.R = e[2];
    curMapObj.L = e[1];
    map[e[0]] = curMapObj;
});

//Part 1

let curNode = 'AAA';
let curSteps = 0;
let zzzFound = false;

while (!zzzFound) {
    parsedInput[0][0].split('').forEach(e => {
        if (zzzFound) {
            return;
        }
        curNode = map[curNode][e];
        ++curSteps;
        zzzFound = curNode === 'ZZZ' ? true : false;
    });
} 

console.log("The current amount of steps to find ZZZ is: " + curSteps);

//Part 2

let curNodes = Object.keys(map).filter(e => e.split('')[2] === 'A');


let allLCMs = [];

curNodes.forEach((e, idx) => {

    let curNode = e;

    let allPossibleNumsFound = false;
    let curCount = 0;
    while (!allPossibleNumsFound) {
        parsedInput[0][0].split('').forEach(f => {
            if (curNode.split('')[2] === "Z") {
                allPossibleNumsFound = true;
                return;
            }
            curNode = map[curNode][f];
            ++curCount;
        });
    } 
    allLCMs.push(curCount);  
});


let primeFactors = allLCMs.map(e => e / 269);

let finalAnswer = 269 * primeFactors.reduce((acc, e) => e * acc, 1);

console.log("The amount of steps it takes to finish is: " + finalAnswer);