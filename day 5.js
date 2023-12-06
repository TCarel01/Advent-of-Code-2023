const { reverse } = require("dns");
const fs = require("fs");
const { parse } = require("path");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 5 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function isChar(char) {
    return char.charCodeAt(0) >= '0'.charCodeAt(0) && char.charCodeAt(0) <= '9'.charCodeAt(0) || char === ' ';
}

function parseDay1(input){
    let curInput = input.split(/[a-z]*/).join('').split('\r\n\r\n').map(e => e.split('\r\n').filter(f => !f.includes('-')));
    curInput[0][0] = curInput[0][0].split(' ').filter(e => e !== ':').join(' ');

    curInput.forEach((e, idx) => {
        let lists = [];
        e.forEach(f => {
            lists.push(f.split(' ').map(g => parseInt(g)))
        });
        curInput[idx] = lists;
    });
    return curInput;
}

let parsedInput = parseDay1(input);

let part2Input = parseDay1(input);

parsedInput[0][0].forEach((e, idx) => {
    for (let i = 1; i < parsedInput.length; ++i) {
        let tempVal = e;
        for (let j = 0; j < parsedInput[i].length; ++j) {
            if (e >= parsedInput[i][j][1] && e < parsedInput[i][j][1] + parsedInput[i][j][2]) {
                let difference = e - parsedInput[i][j][1];
                tempVal = parsedInput[i][j][0] + difference;
            }
        }
        e = tempVal;
    }
    parsedInput[0][idx] = e;
});

let finalResult = parsedInput[0].reduce((acc, e) => Math.min(acc, e), Infinity);
console.log("The smallest location value is: " + finalResult);


//Part 2

let part2Arr = part2Input.slice(1, part2Input.length);

let seeds = part2Input.slice(0, 1);

seeds = part2Input[0][0].reduce((acc, e, idx) => {
    if (idx % 2 === 0) {
        acc.push([]);
        acc[acc.length - 1].push(e);
    }
    else {
        acc[acc.length - 1].push(acc[acc.length - 1][0] + e - 1);
    }
    return acc;
}, []);

part2Arr.forEach((e, idx) => {
    let newArr = e.map((f) => {
        return [f[0], f[0] + f[2] - 1, f[1], f[1] + f[2] - 1];
    });
    part2Arr[idx] = newArr;
});

let test = 2;

function rangeCheck(curRange, curIteration) {
    for (let i = curIteration; i < part2Arr.length; ++i) {
        for (let j = 0; j < part2Arr[i].length; ++j) {
            if (curRange[0] >= part2Arr[i][j][2] && curRange[0] <= part2Arr[i][j][3] ||
                curRange[1] >= part2Arr[i][j][2] && curRange[1] <= part2Arr[i][j][3]) {
                    let newRangeLower = Math.max(curRange[0], part2Arr[i][j][2]);
                    let newRangeUpper = Math.min(curRange[1], part2Arr[i][j][3]);
                    if (newRangeLower === curRange[0] && newRangeUpper === curRange[1]){
                        curRange[0] -= part2Arr[i][j][2] - part2Arr[i][j][0];
                        curRange[1] -= part2Arr[i][j][2] - part2Arr[i][j][0];
                        break;
                    }
                    else if (newRangeLower >= curRange[0] && newRangeUpper <= curRange[1]) {
                        let newRangeLowerCopy = newRangeLower - (part2Arr[i][j][2] - part2Arr[i][j][0]);
                        let newRangeUpperCopy = newRangeUpper - (part2Arr[i][j][2] - part2Arr[i][j][0]);
                        return Math.min(rangeCheck([curRange[0], newRangeLower - 1], i),
                        rangeCheck([newRangeLowerCopy, newRangeUpperCopy], i + 1), rangeCheck([newRangeUpper + 1, curRange[1]], i));
                    }
                    else if (newRangeLower >= curRange[0]) {
                        let newRangeLowerCopy = newRangeLower - (part2Arr[i][j][2] - part2Arr[i][j][0]);
                        let newRangeUpperCopy = curRange[1] - (part2Arr[i][j][2] - part2Arr[i][j][0]);
                        return Math.min(rangeCheck([curRange[0], newRangeLower - 1], i), rangeCheck([newRangeLowerCopy, newRangeUpperCopy], i + 1));
                    }
                    else {
                        let newRangeLowerCopy = curRange[0] - (part2Arr[i][j][2] - part2Arr[i][j][0]);
                        let newRangeUpperCopy = newRangeUpper - (part2Arr[2] - part2Arr[0]);
                        return Math.min(rangeCheck([newRangeLowerCopy, newRangeUpperCopy], i + 1), rangeCheck([newRangeUpper + 1, curRange[1]], i));
                    }
                }
        }
    }
    return curRange[0];
}


let curMin = Infinity;

seeds.forEach(e => {
    let value = rangeCheck(e, 0);
    curMin = Math.min(value, curMin);
});

console.log("The smallest location value is: " + curMin);

//Cheese solution with slow runtime

//part2Arr = part2Arr.reverse();


// let e_reset = 63788281;

// let breakBool = false;
// while (true) {
//     e = e_reset;
//     for (let i = 0; i < part2Arr.length; ++i) {
//         let tempVal = e;
//         for (let j = 0; j < part2Arr[i].length; ++j) {
//             if (i === 4 && j === 2) {
//                 let breakpoint = true;
//             }
//             if (e >= part2Arr[i][j][0] && e < part2Arr[i][j][0] + part2Arr[i][j][2]) {
//                 let difference = e - part2Arr[i][j][0];
//                 tempVal = part2Arr[i][j][1] + difference;
//             }
//         }
//         e = tempVal;
//     }
//     for (let j = 0; j < part2Input[0][0].length; j += 2) {
//         if (e >= part2Input[0][0][j] && e < part2Input[0][0][j] + part2Input[0][0][j + 1]) {
//             console.log(e_reset);
//             breakBool = true;
//             break;
//         }
//     }
//     if (breakBool) {
//         break;
//     }
//     ++e_reset;
// }