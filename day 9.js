const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('./puzzle inputs/day 9 input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    return input.split('\n').map(e => e.split('').filter(f => f !== '\r'));
}

let parsedInput = parseDay1(input);

let possibleDirs = {N: ["F", "|", "7"], S: ["|", "J", "L"], E: ["-", "7", "J"], W: ["-", "L", "F"]}

let nextDirs = {N: ["L", "|", "J"], S: ["|", "J", "L"], E: ["-", "7", "J"], W: ["-", "L", "F"]}

let inverseSymbols = {N: "S", S: "N", E: "W", W: "E"}


function getCoords(parsedInput) {
    let pathCoords = [];

    let startPos = parsedInput.reduce((acc, e, idx) => e.includes("S") ? [e.indexOf("S"), idx] : acc, []);
    
    let startPosRepeat = false;
    
    let curPos = [...startPos]
    
    let prevDirSymbol = "";
    
    let startDir = "";
    
    if (possibleDirs.N.includes(parsedInput[curPos[1] - 1][curPos[0]])) {
        startDir = "N";
    }
    
    else if (possibleDirs.S.includes(parsedInput[curPos[1] + 1][curPos[0]])) {
        startDir = "S";
    }
    
    else {
        startDir = "E";
    }
    
    prevDirSymbol = startDir;
    
    while (!startPosRepeat) {
        pathCoords.push(curPos);
        if (curPos[1] === 9) {
            let curBreakPoint = true;
        }
        curPos = prevDirSymbol === "N" ? [curPos[0], curPos[1] - 1] : prevDirSymbol === "S" ? [curPos[0], curPos[1] + 1] : prevDirSymbol === "E" ? [curPos[0] + 1, curPos[1]] : [curPos[0] - 1, curPos[1]];
        let curSymbol = parsedInput[curPos[1]][curPos[0]];
        prevDirSymbol = Object.keys(possibleDirs).filter(e => possibleDirs[inverseSymbols[e]].includes(curSymbol) && inverseSymbols[e] !== prevDirSymbol)[0];
        startPosRepeat = JSON.stringify(curPos) === JSON.stringify(startPos);
    }

    return pathCoords;
}



let pathCoords = getCoords(parsedInput);

console.log("The furthest point in the loop is: " + (pathCoords.length) / 2);

//Part 2

let inputCopy = [...parsedInput];

inputCopy.forEach((e, rowIdx) => {
    e.forEach((f, columnIdx) => {
        console.log(columnIdx + ", " + rowIdx)
        let stringCoords = JSON.stringify([columnIdx, rowIdx]);
        let onPath =  pathCoords.reduce((acc, g) => JSON.stringify(g) === stringCoords ? true : acc, false);
        if (!onPath) {
            inputCopy[rowIdx][columnIdx] = ".";
        }
    });
});

let paddedArr = [];

inputCopy.forEach((row, idx) => {
    console.log(row);
    paddedArr.push('.'.repeat(row.length).split(''));
    paddedArr.push(row);
    paddedArr[idx * 2] = paddedArr[idx * 2].reduce((acc, e) => {
        acc.push('.');
        acc.push('.');
        return acc;
    }, []);

    paddedArr[idx * 2 + 1] = paddedArr[idx * 2 + 1].reduce((acc, e) => {
        acc.push(e);
        acc.push('.');
        return acc;
    }, []);
    paddedArr[idx * 2].push('.');
    paddedArr[idx * 2 + 1].push('.');
    paddedArr[idx * 2].unshift('.');
    paddedArr[idx * 2 + 1].unshift('.');

});

paddedArr.push('.'.repeat(paddedArr[0].length).split(''));

paddedArr.forEach((e, row) => {

    if (row === 0 || row === paddedArr.length - 1) {
        return;
    }
    e.forEach((f, column) => {
        if (column === 0 || column === e.length - 1) {
            return;
        }
        if ((possibleDirs.E.includes(paddedArr[row][column + 1]) || paddedArr[row][column + 1] === "S") && (possibleDirs.W.includes(paddedArr[row][column - 1]) || paddedArr[row][column - 1] === "S")) {
            paddedArr[row][column] = "-";
        }
        else if ((possibleDirs.N.includes(paddedArr[row - 1][column]) || paddedArr[row - 1][column] === "S") && (possibleDirs.S.includes(paddedArr[row + 1][column]) || paddedArr[row + 1][column] === "S")) {
            paddedArr[row][column] = "|";
        }
    });
});

let paddedPathCoords = getCoords(paddedArr);

let adjacencyList = paddedArr.map((e) => e.map(f => '.'));

let reachedNodes = [];

let nextNodes = [];

nextNodes.push([0, 0]);


while (nextNodes.length > 0) {
    let curNode = nextNodes.shift();
    reachedNodes.push(curNode);
    console.log(curNode);

    adjacencyList[curNode[1]][curNode[0]] = '0';

    let possibleCoords = [[curNode[0], curNode[1] - 1], [curNode[0], curNode[1] + 1], [curNode[0] - 1, curNode[1]], [curNode[0] + 1, curNode[1]]];
    
    possibleCoords = possibleCoords.filter(e => {
        return (e[1] >= 0) && (e[1] <= paddedArr.length - 1) && (e[0] >= 0) && (e[0] <= paddedArr[0].length - 1) && (paddedArr[e[1]][e[0]] === '.');
    });

    possibleCoords.forEach(e => {
        let node = JSON.stringify(e);
        let reachedNode = reachedNodes.reduce((acc, f) => {
            if (JSON.stringify(f) === node) {
                return true;
            }
            return acc;
        }, false);

        let inNextNodes = nextNodes.reduce((acc, f) => {
            if (JSON.stringify(f) === node) {
                return true;
            }
            return acc;
        }, false);

        if (!reachedNode && !inNextNodes) {
            nextNodes.push(e);
        }
    });
}

adjacencyList = adjacencyList.filter((e, idx) => idx % 2 !== 0);

adjacencyList.forEach((e, idx) => {
    adjacencyList[idx] = e.filter((f, idx2) => idx2 % 2 !== 0);
});

let zeroCount = 0;

adjacencyList.forEach(row => {
    row.forEach(elem => {
        zeroCount = elem === '0' ? zeroCount + 1 : zeroCount;
    });
});

let totalArea = (adjacencyList.length * adjacencyList[0].length) - pathCoords.length - zeroCount;
console.log("The total area of the inside of the pipes is: " + totalArea);