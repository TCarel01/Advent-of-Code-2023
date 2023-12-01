const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 1 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r').join(''));
}

let parsedInput = parseDay1(input);


let totalSum = 0;


//Part 1:
parsedInput.forEach((e) => {
    let curLine = e.split('').filter((a) => {
        return a.charCodeAt(0) >= '0'.charCodeAt(0) && a.charCodeAt(0) <= '9'.charCodeAt(0);
    });
    totalSum += parseInt(curLine[0] + curLine[curLine.length - 1]);
});

console.log("The total sum is: " + totalSum);

//Part 2

let numObj = {zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9'};
let nums = Object.keys(numObj);

let totalSumP2 = 0;

parsedInput.forEach((e) => {

    let curLineTest = e.split(/[0-9]/).filter((e) => e !== '');

    let firstNum = -1;

    let lastNum = -1;

    if (curLineTest.length > 0) {
        for (let i = 0; i < curLineTest[0].length; ++i) {
            for (let j = 1; j <= curLineTest[0].length; ++j) {
                let curSubStr = curLineTest[0].substr(i, j);
                nums.forEach(e => {
                    if (curLineTest[0].substr(i, j).includes(e)) {
                        firstNum = numObj[e];
                    }
                });
                if (firstNum !== -1) {
                    break;
                }
            }
            if (firstNum !== -1) {
                break;
            }
        }

        for (let i = curLineTest[curLineTest.length - 1].length; i >= 0; --i) {
            for (let j = curLineTest[curLineTest.length - 1].length - 1; j >= 0; --j) {
                nums.forEach((e) => {
                    if (curLineTest[curLineTest.length - 1].substr(j, i).includes(e)) {
                        lastNum = numObj[e];
                    }
                });
                if (lastNum !== -1) {
                    break;
                }
            }
            if (lastNum !== -1) {
                break;
            }
        }

    }

    let curLine = e.split('').filter((a) => {
        return a.charCodeAt(0) >= '0'.charCodeAt(0) && a.charCodeAt(0) <= '9'.charCodeAt(0);
    });
    
    firstNum = firstNum === -1 || e.charCodeAt(0) >= '0'.charCodeAt(0) && e.charCodeAt(0) <= '9'.charCodeAt(0) ? curLine[0] : firstNum;

    lastNum = lastNum === -1 || e.charCodeAt(e.length - 1) >= '0'.charCodeAt(0) && e.charCodeAt(e.length - 1) <= '9'.charCodeAt(0) ? curLine[curLine.length - 1] : lastNum;

    totalSumP2 += parseInt(firstNum + lastNum);
});

console.log("The total sum for part 2 is: " + totalSumP2);
