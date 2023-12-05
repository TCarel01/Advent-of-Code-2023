const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 3 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return arrInput = input.split('\n').map(e => e.split('').filter(f => f !== '\r'));
}

let parsedInput = parseDay1(input);


function isChar(char) {
    return char.charCodeAt(0) >= '0'.charCodeAt(0) && char.charCodeAt(0) <= '9'.charCodeAt(0);
}

//Part 1
let curPartNumberList = [];

let gearsList = [];

for (let i = 0; i < parsedInput.length; ++i) {
    for (let j = 0; j < parsedInput[0].length; ++j) {
        if (!isChar(parsedInput[i][j])) {
            continue;
        }
        else {
            let xRange = 0;
            for (let k = j; k < parsedInput[0].length; ++k) {
                if (!(isChar(parsedInput[i][k]))) {
                    xRange = k - j;
                    break;
                }
            }
            let yMin = Math.max(0, i - 1);
            let xMin = Math.max(0, j - 1);
            let yMax = Math.min(i + 1, parsedInput.length - 1);
            let xMax = Math.min(j + xRange, parsedInput[0].length - 1);

            let isPartNumber = false;

            let specialSymbolInfo = {value: 0, symbols: [], coords: []};

            for (let k = yMin; k <= yMax; ++k) {
                for (let l = xMin; l <= xMax; ++l) {
                    let firstSymbol = true;
                    if (!isChar(parsedInput[k][l]) && parsedInput[k][l] !== '.') {
                        if (isPartNumber || firstSymbol) {
                            specialSymbolInfo.value = parseInt(parsedInput[i].join('').substr(j, j + xRange));
                            specialSymbolInfo.symbols.push(parsedInput[k][l]);
                            specialSymbolInfo.coords.push([k, l])
                            if (firstSymbol) {
                                firstSymbol = false;
                            }
                            else {
                                continue;
                            }
                        }
                        let curPartNumber = parseInt(parsedInput[i].join('').substr(j, j + xRange));

                        curPartNumberList.push(curPartNumber);
                        isPartNumber = true;

                    }
                }
            }

            if (JSON.stringify(specialSymbolInfo) !== JSON.stringify({value: 0, symbols: [], coords:[]})){
                gearsList.push(specialSymbolInfo)
            }
            j += xRange;
        }
    }
}

let returnRatioSum = 0;

gearsList.forEach((e, idx) => {
    let curValuesList = [];
    curValuesList.push(e.value);
    if (e.symbols[0] === '*') {
        for (let i = idx + 1; i < gearsList.length; ++i) {
            if (gearsList[i].symbols[0] === '*' && JSON.stringify(e.coords) === JSON.stringify(gearsList[i].coords)) {
                curValuesList.push(gearsList[i].value);
            }
        }
        if (curValuesList.length === 2) {
            returnRatioSum += curValuesList[0] * curValuesList[1];
        }
    }
});

let finalSum = curPartNumberList.reduce((acc, e) => acc += e, 0);

console.log("The sum of all partial numbers is: " + finalSum);

console.log("The sum of all gear ratios is: " + returnRatioSum);

