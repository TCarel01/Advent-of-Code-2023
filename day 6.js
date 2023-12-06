const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 6 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay6(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r').join('')).map(f => f.split(' ').filter(g => !g.includes(':') && g !== '').map(h => parseInt(h)));
}

let parsedInput = parseDay6(input);

let raceWinList = [];

parsedInput[0].forEach((e, idx) => {
    let curWinCount = 0;
    for (let i = 0; i < e; ++i) {
        let currentMPH = i;
        let distance = currentMPH * (e - currentMPH);
        if (distance > parsedInput[1][idx]) {
            curWinCount += 1;
        }
    }
    raceWinList.push(curWinCount);
});

let finalProduct = raceWinList.reduce((acc, e) => acc * e, 1);

console.log("The total ways to break the record is: " + finalProduct);

//Part 2:
let race1 = parseInt(parsedInput[0].join(''));

let race2 = parseInt(parsedInput[1].join(''));

let test = 2;

let minValue = -1;
let maxValue = 1;

for (let i = 0; i < race1; ++i) {
    let currentMPH = i;
    let distance = currentMPH * (race1 - currentMPH);
    if (distance > race2) {
        minValue = i;
        break;
    }
}

for (let j = race1; j > 0; --j) {
    let currentMPH = j;
    let distance = currentMPH * (race1 - currentMPH);
    if (distance > race2) {
        maxValue = j;
        break;
    }
}

let finalValue = maxValue - minValue + 1;

console.log("The number of ways to win the race is: " + finalValue);