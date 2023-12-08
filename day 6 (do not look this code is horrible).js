const { count } = require("console");
const fs = require("fs");
const { PassThrough } = require("stream");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 6 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r').join(''))
    .map(e => e.split(' ').map((e, idx) => idx === 1 ? parseInt(e) : e));
}

let parsedInput = parseDay1(input);

let parsedInputP2 = [...parsedInput];

let cardScores = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
                    '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};

let cardScoresP2 = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
                    '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 1, 'Q': 12, 'K': 13, 'A': 14};

parsedInput.forEach((e, curArrIdx) => {

    let p = e;

    e = parsedInput[curArrIdx][0].split('');

    parsedInput[curArrIdx][0] = e;

    parsedInputP2[curArrIdx][0] = e;



    let uniqueVals = new Set(e);

    let countArr = [];

    uniqueVals.forEach(f => {
        countArr.push(e.reduce((acc, g) => f === g ? acc + 1 : acc, 0));
    });

    if ([...uniqueVals].indexOf("J") !== -1) {
        let brekapoint = true;
    }

    let maxIdx = countArr.reduce((acc, h, idx) => countArr[idx] > countArr[acc] ? idx : acc, 0);

    let maxIdxp2 = countArr.reduce((acc, h, idx) => countArr[idx] >= countArr[acc] && [...uniqueVals][idx] !== 'J' ? idx : acc, 0);


    let p2CountArr = [...countArr];

    if ([...uniqueVals].indexOf('J') > -1 && [...uniqueVals].indexOf('J') !== 5) {

        let p2SortCopy = [...p2CountArr].sort((a, b) => b - a);

        if (p2CountArr[[...uniqueVals].indexOf('J')] === 1 && p2SortCopy[0] === 2 && p2SortCopy[1] === 2) {
            p2CountArr = [3, 2];
        }

        else {
            p2CountArr[maxIdxp2] += 1 * p2CountArr[[...uniqueVals].indexOf('J')];

            p2CountArr[[...uniqueVals].indexOf('J')] = 0;
        }

    }


    let sortedCount = countArr.sort((a, b) => b - a);

    let sortedCountP2 = p2CountArr.sort((a, b) => b - a);

    if (sortedCountP2[sortedCountP2.length - 1] === 0) {
        sortedCountP2.pop();
    }

    if (sortedCount.length === 5) {
        parsedInput[curArrIdx].push(1);
    }
    else if (sortedCount.length === 4) {
        parsedInput[curArrIdx].push(2);
    }
    else if (sortedCount.length === 3 && countArr[0] === 2) {
        parsedInput[curArrIdx].push(3);
    }
    else if (sortedCount.length === 3) {
        parsedInput[curArrIdx].push(4);
    }
    else if (sortedCount.length === 2 && countArr[0] === 3) {
        parsedInput[curArrIdx].push(5);
    }
    else if (sortedCount.length === 2) {
        parsedInput[curArrIdx].push(6);
    }
    else {
        parsedInput[curArrIdx].push(7);
    }

    if (sortedCountP2.length === 5) {
        parsedInputP2[curArrIdx].push(1);
    }
    else if (sortedCountP2.length === 4) {
        parsedInputP2[curArrIdx].push(2);
    }
    else if (sortedCountP2.length === 3 && p2CountArr[0] === 2) {
        parsedInputP2[curArrIdx].push(3);
    }
    else if (sortedCountP2.length === 3) {
        parsedInputP2[curArrIdx].push(4);
    }
    else if (sortedCountP2.length === 2 && p2CountArr[0] === 3) {
        parsedInputP2[curArrIdx].push(5);
    }
    else if (sortedCountP2.length === 2) {
        parsedInputP2[curArrIdx].push(6);
    }
    else {
        parsedInputP2[curArrIdx].push(7);
    }

    let test = 2;
});


let sortedInput = parsedInput.sort((hand1, hand2) => {
    if (hand1[2] - hand2[2] !== 0) {
        return hand1[2] - hand2[2];
    }
    let firstDiffIndex = hand1[0].reduce((acc, e, idx) => e !== hand2[0][idx] && acc === -1 ? idx : acc, -1);
    return cardScores[hand1[0][firstDiffIndex]] - cardScores[hand2[0][firstDiffIndex]];
});

let sortedInputP2 = parsedInputP2.sort((hand1, hand2) => {
    if (hand1[3] - hand2[3] !== 0) {
        return hand1[3] - hand2[3];
    }
    let firstDiffIndex = hand1[0].reduce((acc, e, idx) => e !== hand2[0][idx] && acc === -1 ? idx : acc, -1);
    return cardScoresP2[hand1[0][firstDiffIndex]] - cardScoresP2[hand2[0][firstDiffIndex]];
});



let finalValue = sortedInput.reduce((acc, e, idx) => acc + (e[1] * (idx + 1)), 0);

let finalValue2 = sortedInputP2.reduce((acc, e, idx) => acc + (e[1] * (idx + 1)), 0);;


console.log("The total winnings across all hands is: " + finalValue);

console.log(finalValue2);