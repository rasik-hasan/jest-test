import { calculateSum } from "../src/utils/helpers";

test("string with a single number should", () => {
  expect(calculateSum(1, 2)).toBe(3);
});
