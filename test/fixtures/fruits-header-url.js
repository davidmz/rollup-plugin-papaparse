import fruits from "./fruits.csv?header=true";

t.deepEqual(fruits, [
  { type: "apples", count: "7" },
  { type: "pears", count: "4" },
  { type: "bananas", count: "5" },
]);
