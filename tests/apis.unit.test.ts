import axios from "axios";
import { getOutages, getSiteInfo, postSiteOutages } from "../src/api/api";
import { IOutage, ISiteInfo, ISiteOutage } from "../src/types/types";

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
  }, 10000);
});

describe("testing getSiteInfo", () => {
  it("testing basic data fetching", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const param3 = "siteId";
    const responseData: ISiteInfo[] = [
      { id: "id", name: "name", devices: [{ id: "1", name: "device 1" }] },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });
    const result = await getSiteInfo(param1, param2, param3);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`${param1}/site-info/${param3}`, {
      headers: param2,
    });
  });

  it("resilient in one failed attempt", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const param3 = "siteId";
    const responseData: ISiteInfo[] = [
      { id: "id", name: "name", devices: [{ id: "1", name: "device 1" }] },
    ];

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Call failed"));

    (axios.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });
    const result = await getSiteInfo(param1, param2, param3);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`${param1}/site-info/${param3}`, {
      headers: param2,
    });
  });

  it("3 attempts failed", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const param3 = "siteId";

    (axios.get as jest.Mock).mockRejectedValue(new Error("Call failed"));

    await expect(getSiteInfo(param1, param2, param3)).rejects.toThrow(
      "Exponential Back Off failed in GetSiteOutages"
    );

    expect(axios.get).toHaveBeenCalledWith(`${param1}/site-info/${param3}`, {
      headers: param2,
    });
  }, 10000);
});

describe("testing postSiteOutages", () => {
  it("testing basic data posting", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const param3: ISiteOutage[] = [
      { id: "1", name: "name", begin: "begintime", end: "endtime" },
    ];
    const param4 = "siteId";
    const responseData = {
      data: {},
      status: 200,
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(responseData);
    const result = await postSiteOutages(param1, param2, param3, param4);

    expect(result).toEqual(responseData);
    expect(axios.post).toHaveBeenCalledWith(
      `${param1}/site-outages/${param4}`,
      param3,
      {
        headers: param2,
      }
    );
  });

  it("resilient in one failed attempt", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const param3: ISiteOutage[] = [
      { id: "1", name: "name", begin: "begintime", end: "endtime" },
    ];
    const param4 = "siteId";
    const responseData = {
      data: {},
      status: 200,
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Call failed"));

    (axios.post as jest.Mock).mockResolvedValueOnce(responseData);
    const result = await postSiteOutages(param1, param2, param3, param4);

    expect(result).toEqual(responseData);
    expect(axios.post).toHaveBeenCalledWith(
      `${param1}/site-outages/${param4}`,
      param3,
      {
        headers: param2,
      }
    );
  });

  it("3 attempts failed", async () => {
    const param1 = "https://api.test.com/dev";
    const param2 = {
      "x-api-key": "testKey",
    };
    const param3: ISiteOutage[] = [
      { id: "1", name: "name", begin: "begintime", end: "endtime" },
    ];
    const param4 = "siteId";

    (axios.post as jest.Mock).mockRejectedValue(new Error("Call failed"));

    await expect(
      postSiteOutages(param1, param2, param3, param4)
    ).rejects.toThrow("Exponential Back Off failed in PostSiteOutages");

    expect(axios.post).toHaveBeenCalledWith(
      `${param1}/site-outages/${param4}`,
      param3,
      {
        headers: param2,
      }
    );
  }, 10000);
});
