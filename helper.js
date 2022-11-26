const fs = require("fs");

const convertToNums = (input) => {
  return Array.from(input.split(",")).map(Number);
};

const findMean = (numbers) => {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

const findMedian = (numbers) => {
  const length = numbers.length;
  let median;
  if (length % 2 === 0) {
    median = (numbers[length / 2 - 1] + numbers[length / 2]) / 2;
  } else {
    median = numbers[Math.floor(length / 2)];
  }
  return median;
};

// Option 1
// let collection = {};
// for (let num of numbers) {
//   if (!Object.keys(collection).includes(num)) {
//     let count = 0;
//     numbers.forEach((el) => {
//       if (el === num) {
//         count++;
//       }
//     });
//     collection[num] = count;
//   }
// }

// Option 2
const convertToObj = (numbers) => {
  return numbers.reduce((acc, next) => {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
};

const findMode = (numbers) => {
  const collection = convertToObj(numbers);
  const max = Math.max(...Object.values(collection));
  return Object.keys(collection)
    .filter((key) => collection[key] === max)
    .map(Number);
};

const writeToFile = (data) => {
  try {
    const content = JSON.stringify({ ...data, timestamp: new Date() });
    fs.writeFileSync("./results.json", content);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  convertToNums,
  findMean,
  findMedian,
  findMode,
  writeToFile,
};
