import * as dotenv from "dotenv";
dotenv.config();

import { API_KEY, API_URL } from "../src/config/config";
import { getOutages, getSiteInfo, postSiteOutages } from "./api/api";
import {
  attachDeviceNameToOutage,
  filterById,
  filterByTime,
} from "./utils/helpers";

const header = {
  "x-api-key": API_KEY,
};

async function main() {
  const targetTime = "2022-01-01T00:00:00.000Z";
  const siteId = "norwich-pear-tree";

  try {
    const outages = await getOutages(API_URL, header);
    const siteInfos = await getSiteInfo(API_URL, header, siteId);
    const timeFiltered = filterByTime(targetTime, outages);
    // console.log("timefiltered: ", timeFiltered);
    const deviceFiltered = filterById(timeFiltered, siteInfos.devices);
    // console.log("device filtered: ", deviceFiltered);

    const nameAttached = attachDeviceNameToOutage(
      deviceFiltered,
      siteInfos.devices
    );
    // console.log("attach: ", nameAttached);

    postSiteOutages(API_URL, header, nameAttached, siteId);
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();
