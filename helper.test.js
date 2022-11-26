const { convertToNums, findMean, findMedian, findMode } = require("./helper");

test("convertToNums should return an array of numbers/NaN", () => {
  expect(convertToNums("1,2,3")).toEqual([1, 2, 3]);
  expect(convertToNums("foo")).toEqual([NaN]);
});

test("findMean should return the mean value of an array", () => {
  expect(findMean([1, 2, 3])).toBe(2);
  expect(findMean([-12, 34, 89])).toBe(37);
});

test("findMedian should return the median value of an array", () => {
  expect(findMedian([1, 2, 3])).toBe(2);
  expect(findMedian([1, 2, 3, 4])).toBe(2.5);
});

test("findMode should return the mode value of an array", () => {
  expect(findMode([1, 1, 2])).toEqual([1]);
  expect(findMode([1, 1, 2, 2])).toEqual([1, 2]);
});
