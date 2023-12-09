import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { IOutages, IDevices, ISiteInfo, ISiteOutage } from "../src/types/types";
import { API_URL, API_KEY } from "../src/config/config";
import { getOutages, getSiteInfo, postSiteOutages } from "./api/api";

const header = {
  "x-api-key": API_KEY,
};

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

async function main() {
  const targetTime = "2022-01-01T00:00:00.000Z";
  const siteId = "norwich-pear-tree";

  try {
    const outages: IOutages[] = await getOutages(API_URL, header);
    const siteInfos: ISiteInfo = await getSiteInfo(API_URL, header, siteId);
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

    postSiteOutages(API_URL, header, nameAttached, siteId);
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();
