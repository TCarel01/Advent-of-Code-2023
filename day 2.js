const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 2 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r').join(''));
}

let parsedInput = parseDay1(input);

let maxColors = {red: 12, green: 13, blue: 14}

let colorKeys = Object.keys(maxColors);

let totalSum = 0;
let totalSumP2 = 0;

//Part 1:
parsedInput.forEach(e => {
    let id = parseInt(e.split(':')[0].split(' ')[1]);
    let combos = e.split(':')[1].split(';');
    let maxValue = {red: 0, green: 0, blue: 0}
    let validId = true;
    combos.forEach(a => {
        let curRoundsArr = a.split(',').join('').split(' ').filter(g => g !== '');
        for (let i = 0; i < curRoundsArr.length; i += 2) {
            if (maxColors[curRoundsArr[i + 1]] < parseInt(curRoundsArr[i])) {
                validId = false;
            }
            if (maxValue[curRoundsArr[i + 1]] < parseInt(curRoundsArr[i])) {
                maxValue[curRoundsArr[i + 1]] = parseInt(curRoundsArr[i]);
            }
        }
        
    });

    totalSum = validId ? totalSum + id : totalSum;

    let curProduct = maxValue.red * maxValue.green * maxValue.blue;
    totalSumP2 += curProduct;

});

console.log("The total valid Game Id Sum is: " + totalSum);

console.log("The total power sum is: " + totalSumP2);
