import fruits from "./fruits-semicolon.csv?header=true&delimiter=%3B";

t.deepEqual(fruits, [
  { type: "apples", count: "7" },
  { type: "pears", count: "4" },
  { type: "bananas", count: "5" },
]);
