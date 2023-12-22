const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 9 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r').join('')).map(e => e.split(' ').map(f => parseInt(f)));
}

let parsedInput = parseDay1(input);

let extrapolatedNums = [];

let extrapolatedNumsP2 = [];

parsedInput.forEach((e, idx) => {

    let diffHistory = [[...e]];
    let allDiffs0 = e.reduce((acc, e) => e !== 0 ? false : acc, true);

    while(!allDiffs0) {
        let curDiffs = diffHistory[diffHistory.length - 1].reduce((acc, f, idx2) => {
            if (idx2 === 0) {
                return acc;
            }
            acc.push(f - diffHistory[diffHistory.length - 1][idx2 - 1])
            return acc;
        }, []);
        diffHistory.push(curDiffs);
        allDiffs0 = curDiffs.reduce((acc, g) => g !== 0 ? false : acc, true);
    }

    extrapolatedNums.push(diffHistory.reduceRight((acc, e) => acc + e[e.length - 1], 0));

    extrapolatedNumsP2.push(diffHistory.reduceRight((acc, e) => - acc + e[0], 0));
});


let p1Sum = extrapolatedNums.reduce((acc, e) => acc + e, 0);

let p2Sum = extrapolatedNumsP2.reduce((acc, e) => acc + e, 0);

console.log("The total sum of the extrapolated numbers is: " + p1Sum);

console.log("The total sum of the extrapolated numbers in part 2 is: " + p2Sum);