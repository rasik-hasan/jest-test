import { calculateSum } from "../src/utils/helpers";

describe("testing calculate sum", () => {
  it("adding two numbers correctly", () => {
    const param1 = 1;
    const param2 = 10;
    const expectedResult = 11;

    expect(calculateSum(param1, param2)).toBe(expectedResult);
  });
});
