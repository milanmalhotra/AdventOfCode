const fs = require('fs');

const file = fs.readFileSync('DayTwo/input.txt').toString();
const arr = file.split('\n').map(str => str.replace(/\r/g, ''));
const validGamesArr = [];
const regexPattern = /\d+\s(blue|red|green)/g;
const numPattern = /\d+/g;
const colorPattern = /\s(blue|red|green)/g;
const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

let finalAnswer = 0;

arr.forEach(game => {
    // Grab each pair of cubes and their number (ex: "8 green")
    const value = game.split(':')[1].match(regexPattern);

    let isValid = true;
    let colors = {
        blueArr: [],
        redArr: [],
        greenArr: []
    }

    // Push number of cubes to corresponding color array within colors obj
    for (const combo of value) {
        let num = parseInt(combo.match(numPattern));
        let color = `${combo.match(colorPattern).toString().trim()}Arr`;

        colors[color].push(num);
    }

    // If any of the cube amounts is greater than the max of that color, the game is invalid
    for (const color in colors) {
        for (const num of colors[color]) {
            if (color.includes('blue') && num > maxBlueCubes) {
                isValid = false;
            } else if (color.includes('red') && num > maxRedCubes) {
                isValid = false;
            } else if (color.includes('green') && num > maxGreenCubes) {
                isValid = false;
            }
        }
    }

    // Grab the game ID if game is valid and push to valid games array
    if (isValid) {
        const id = parseInt(game.split(':')[0].match(/\d+/)[0]);
        validGamesArr.push(id);
    }
});

// Add up all game IDs
for (const gameId of validGamesArr) {
    finalAnswer += gameId;
}

console.log(finalAnswer);