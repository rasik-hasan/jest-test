import { IDevice, IOutage } from "../src/types/types";
import { calculateSum, filterById, filterByTime } from "../src/utils/helpers";
import {
  filterByIdResult,
  filterByTimeResult,
  simpleTimeArrayData,
  testDevices,
  testOutages,
} from "./testData";

describe("testing calculate sum", () => {
  it("adding two numbers correctly", () => {
    const param1 = 1;
    const param2 = 10;
    const expectedResult = 11;

    expect(calculateSum(param1, param2)).toBe(expectedResult);
  });
});

describe("testing filterbyId", () => {
  it("given outages and devices filters out outages that don't have device ids in list of devices", () => {
    const param1 = testOutages;
    const param2 = testDevices;
    const result = filterByIdResult;

    expect(filterById(param1, param2)).toEqual(result);
  });

  it("handles both empty arrays", () => {
    const param1: IOutage[] = [];
    const param2: IDevice[] = [];
    const result: IOutage[] = [];

    expect(filterById(param1, param2)).toEqual(result);
  });

  it("handles  empty device array", () => {
    const param1: IOutage[] = testOutages;
    const param2: IDevice[] = [];
    const result: IOutage[] = [];

    expect(filterById(param1, param2)).toEqual(result);
  });

  it("handles  empty outage array", () => {
    const param1: IOutage[] = [];
    const param2: IDevice[] = testDevices;
    const result: IOutage[] = [];

    expect(filterById(param1, param2)).toEqual(result);
  });
});

describe("filter by time", () => {
  it("filter by time correctly", () => {
    const param1 = "2022-01-01T00:00:00.000Z";
    const param2 = testOutages;
    const result = filterByTimeResult;

    expect(filterByTime(param1, param2)).toEqual(result);
  });

  it("handles empty array", () => {
    const param1 = "2022-01-01T00:00:00.000Z";
    const param2: IOutage[] = [];
    const result: IOutage[] = [];

    expect(filterByTime(param1, param2)).toEqual(result);
  });

  it("handles invalid time string", () => {
    const param1 = "abasd";
    const param2 = testOutages;
    const result: IOutage[] = [];

    expect(filterByTime(param1, param2)).toEqual(result);
  });
});
