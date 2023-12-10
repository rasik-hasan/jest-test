import {
  integrationTestResult,
  testDevices,
  testOutages,
} from "../src/sampleData/testData";
import {
  attachDeviceNameToOutage,
  filterById,
  filterByTime,
} from "../src/utils/helpers";

describe("integration test for all helper functions", () => {
  it("testing set of helper function: ", () => {
    const timeFiltered = filterByTime("2022-01-01T00:00:00.000Z", testOutages);
    const deviceFiltered = filterById(timeFiltered, testDevices);
    const nameAttached = attachDeviceNameToOutage(deviceFiltered, testDevices);

    expect(nameAttached).toEqual(integrationTestResult);
  });
});
