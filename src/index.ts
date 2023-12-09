import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { IOutages, IDevices, ISiteInfo, ISiteOutage } from "../src/types/types";
import { API_URL, API_KEY } from "../src/config/config";

const header = {
  "x-api-key": API_KEY,
};

// 1. `GET /outages` which returns all outages in our system
async function getOutages() {
  try {
    const res = await axios.get(API_URL + "/outages", {
      headers: header,
    });
    // console.log("Res:", res.data);

    return res.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// 2. `GET /site-info/{siteId}` which returns specific information about a site
async function getSiteInfo(siteId: string): Promise<any> {
  try {
    const res = await axios.get(API_URL + `/site-info/${siteId}`, {
      headers: header,
    });

    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
}

//2.1 Filter out data that began before 2022-01-01T00:00:00.000Z

function filterByTime(time: string, data: IOutages[]) {
  const filtered = data.filter((item: IOutages) => {
    const startDate = new Date(item.begin);
    const targetDate = new Date(time);

    return startDate >= targetDate;
  });

  return filtered;
}

//2.2 filter out outages that don't have devices in the list of devices in site info
function filterById(outages: IOutages[], devices: IDevices[]) {
  const deviceIds = devices.map((device) => device.id);
  const filtered = outages.filter((outage) => deviceIds.includes(outage.id));
  return filtered;
}

//2.3 attach name of device in the remaining array
function attachDeviceNameToOutage(outages: IOutages[], devices: IDevices[]) {
  const attached: ISiteOutage[] = outages.map((outage) => {
    const device = devices.find((device) => outage.id === device.id);

    const newAttach = { ...outage, name: device?.name ?? "" };

    return newAttach;
  });

  return attached;
}

// 3. `POST /site-outages/{siteId}` which expects outages for a specific site to be posted to it
async function postSiteOutages(siteOutages: ISiteOutage[], siteId: string) {
  try {
    const res = await axios.post(
      API_URL + `/site-outages/${siteId}`,
      siteOutages,
      { headers: header }
    );
    console.log("post status: ", res.status);
    console.log("post res: ", res.data);

    return res;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function main() {
  const targetTime = "2022-01-01T00:00:00.000Z";
  const siteId = "norwich-pear-tree";

  try {
    const outages: IOutages[] = await getOutages();
    const siteInfos: ISiteInfo = await getSiteInfo(siteId);
    console.log("siteinfos: ", siteInfos);
    const timeFiltered = filterByTime(targetTime, outages);
    // console.log("timefiltered: ", timeFiltered);
    const deviceFiltered = filterById(timeFiltered, siteInfos.devices);
    console.log("device filtered: ", deviceFiltered);

    const nameAttached = attachDeviceNameToOutage(
      deviceFiltered,
      siteInfos.devices
    );
    console.log("attach: ", nameAttached);

    postSiteOutages(nameAttached, siteId);
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();
