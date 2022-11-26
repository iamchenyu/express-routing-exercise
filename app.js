const express = require("express");

const ExpressError = require("./error");
const {
  convertToNums,
  findMean,
  findMedian,
  findMode,
  writeToFile,
} = require("./helper");

const app = express();

app.get("/mean", (req, res, next) => {
  try {
    if (!req.query.nums) throw new ExpressError("Numbers are required.", 400);

    const numbers = convertToNums(req.query.nums);

    if (numbers.includes(NaN))
      throw new ExpressError("Invalid Type. Please type in numbers.", 400);

    const mean = findMean(numbers);

    const result = {
      response: {
        operation: "mean",
        value: mean,
      },
    };

    if (req.query.save === "true") writeToFile(result);

    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

app.get("/median", (req, res, next) => {
  try {
    if (!req.query.nums) throw new ExpressError("Numbers are required.", 400);

    const numbers = convertToNums(req.query.nums);

    if (numbers.includes(NaN))
      throw new ExpressError("Invalid Type. Please type in numbers.", 400);

    const median = findMedian(numbers);

    const result = {
      response: {
        operation: "median",
        value: median,
      },
    };

    if (req.query.save === "true") writeToFile(result);

    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    if (!req.query.nums) throw new ExpressError("Numbers are required.", 400);

    const numbers = convertToNums(req.query.nums);

    if (numbers.includes(NaN))
      throw new ExpressError("Invalid Type. Please type in numbers.", 400);

    const mode = findMode(numbers);

    const result = {
      response: {
        operation: "mode",
        value: mode,
      },
    };

    if (req.query.save === "true") writeToFile(result);

    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

app.get("/all", (req, res, next) => {
  try {
    if (!req.query.nums) throw new ExpressError("Numbers are required.", 400);

    const numbers = convertToNums(req.query.nums);
    if (numbers.includes(NaN))
      throw new ExpressError("Invalid Type. Please type in numbers.", 400);

    const result = {
      response: {
        operation: "all",
        mean: findMean(numbers),
        median: findMedian(numbers),
        mode: findMode(numbers),
      },
    };

    if (req.query.save === "true") writeToFile(result);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

app.use((req, res, next) => {
  const notFoundError = new ExpressError("Page Not Found", 404);
  return next(notFoundError);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    response: {
      error: { status, message: err.message },
    },
  });
});

app.listen(3000, () => {
  console.log("Server is lisenting on port 3000...");
});
