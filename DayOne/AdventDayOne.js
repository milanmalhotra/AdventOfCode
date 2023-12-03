const fs = require('fs');

const file = fs.readFileSync('input.txt').toString();
const arr = file.split('\n');

const numArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const strToIntMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};
let allNums = [];
let finalAnswer = 0;

arr.forEach(item => {
  let combinedNum = '';
  let firstIntIndex, lastIntIndex;
  let wordIndexArr = [];
  let wordIndexMap = new Map();

  // Grab first instance of a number
  for (let i = 0; i < item.length; i++) {
    if (!isNaN(item[i])) {
      firstIntIndex = i;
      break;
    }
  }

  // Grab all index pos of words (one, two, three, etc...)
  for (let i = 0; i < numArr.length; i++) {
    if (item.includes(numArr[i])) {
      // Push word to array
      wordIndexArr.push(item.indexOf(numArr[i]));
      wordIndexMap.set(item.indexOf(numArr[i]), numArr[i]);

      // Check if there is a second instance of same word and push to array
      const firstIndex = item.indexOf(numArr[i]);
      const secondIndex = item.indexOf(numArr[i], firstIndex + 1);
      const thirdIndex = item.indexOf(numArr[i], secondIndex + numArr[i].length);

      if (secondIndex !== -1) {
        wordIndexArr.push(secondIndex);
        wordIndexMap.set(secondIndex, numArr[i]);
      }
      if (thirdIndex !== -1) {
        wordIndexArr.push(thirdIndex);
        wordIndexMap.set(thirdIndex, numArr[i]);
      }
    }
  }

  // grab the lowest index pos from words array
  const min = Math.min(...wordIndexArr);
  // Grab the highest index pos from words array
  const max = Math.max(...wordIndexArr);

  // if no digits exist, use first instance of word as first pos in combined number
  if (firstIntIndex === undefined) {
    const num = wordIndexMap.get(min);
    combinedNum = strToIntMap[num];
    // if the first digit came before the first word, use digit as first pos
  } else if (min > firstIntIndex) {
    combinedNum = item[firstIntIndex];
    // if first word came before first digit, use word as first pos
  } else if (min < firstIntIndex) {
    const num = wordIndexMap.get(min);
    combinedNum = strToIntMap[num];
  }

  // Grab last instance of a number
  for (let i = item.length; i >= 0; i--) {
    if (!isNaN(item[i])) {
      lastIntIndex = i;
      break;
    }
  }

  // if no digits exist, use last instance of word as second pos in combined number
  if (lastIntIndex === undefined) {
    const num = wordIndexMap.get(max);
    combinedNum += strToIntMap[num];
    // if the last digit came after the last word, use digit as second pos
  } else if (max < lastIntIndex) {
    combinedNum += item[lastIntIndex];
    // if last word came after last digit, use word as second pos
  } else if (max > lastIntIndex) {
    const num = wordIndexMap.get(max);
    combinedNum += strToIntMap[num];
  }

  allNums.push(combinedNum);
});

// convert all the strings into ints and add them together
allNums.forEach(num => {
  const convertedNum = parseInt(num);
  finalAnswer += convertedNum;
});

console.log(finalAnswer);
