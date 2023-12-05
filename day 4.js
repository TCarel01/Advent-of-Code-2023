const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 4 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r').join('').split(':')[1]).map(f => f.split('|').map(g => g.split(' ').filter(h => h !== '').map(i => parseInt(i))));
}

let parsedInput = parseDay1(input);

let x = 2;

let totalPoints = 0;

let cardCopies = [];

parsedInput.forEach((e, idx) => {
    let cardNum = idx;
    cardCopies.push({cardNumber: cardNum, value: e, copies: 1});
    let currentNumMatch = 0;
    e[0].forEach(f => {
        if (e[1].includes(f)) {
            currentNumMatch += 1;
        }
    });
    totalPoints = currentNumMatch === 0 ? totalPoints : totalPoints + 2 ** (currentNumMatch - 1);
});


let loopStop = cardCopies.length;
for (let i = 0; i < loopStop; ++i) {
    let e = cardCopies[i];
    let currentNumMatch = 0;
    (e.value)[0].forEach(f => {
        if ((e.value)[1].includes(f)) {
            currentNumMatch += 1;
        }
    });
    for (let j = 0; j < e.copies; ++j){
        for (let k = i + 1; k < i + 1 + currentNumMatch; ++k) {
            cardCopies[k].copies += 1;
        }
    }
};

let totalSum = 0;

cardCopies.forEach(e => {
    totalSum += e.copies;
});


console.log("The total points on the Elf's Scratch Cards is: " + totalPoints);

console.log("The total number of scratchcards is: " + totalSum);