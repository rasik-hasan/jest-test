import axios from "axios";
import { getOutages } from "../src/api/api";
import { API_KEY, API_URL } from "../src/config/config";
import { IOutage } from "../src/types/types";

jest.mock("axios");

describe("testing get Outages", () => {
  it("testing basic data fetching", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const responseData: IOutage[] = [
      { id: "1", begin: "begintime", end: "endtime" },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });
    const result = await getOutages(param1, param2);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`${param1}/outages`, {
      headers: param2,
    });
  });

  it("resilient in one failed attempt", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const responseData: IOutage[] = [
      { id: "1", begin: "begintime", end: "endtime" },
    ];

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Call failed"));

    (axios.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });
    const result = await getOutages(param1, param2);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`${param1}/outages`, {
      headers: param2,
    });
  });

  it("3 attempts failed", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };

    (axios.get as jest.Mock).mockRejectedValue(new Error("Call failed"));

    await expect(getOutages(param1, param2)).rejects.toThrow(
      "Exponential Back Off failed in GetOutages"
    );

    expect(axios.get).toHaveBeenCalledWith(`${param1}/outages`, {
      headers: param2,
    });
  }, 15000);
});
