import axios from "axios";
import { IOutage, ISiteInfo, ISiteOutage } from "../types/types";

// 1. `GET /outages` which returns all outages in our system
export async function getOutages(
  API_URL: string,
  header: {}
): Promise<IOutage[]> {
  const tryMax = 3;
  const delayMultiplier = 500;
  let tryCounter = 0;

  while (tryCounter < tryMax) {
    try {
      const res = await axios.get(API_URL + "/outages", {
        headers: header,
      });

      return res.data;
    } catch (error) {
      console.log("Error in getOutages", "trying again");

      tryCounter++;
      const delay = Math.pow(2, tryCounter) * delayMultiplier;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Exponential Back Off failed in GetOutages");
}

// 2. `GET /site-info/{siteId}` which returns specific information about a site
export async function getSiteInfo(
  API_URL: string,
  header: {},
  siteId: string
): Promise<ISiteInfo> {
  const tryMax = 3;
  const delayMultiplier = 500;
  let tryCounter = 0;

  while (tryCounter < tryMax) {
    try {
      const res = await axios.get(API_URL + `/site-info/${siteId}`, {
        headers: header,
      });

      return res.data;
    } catch (error) {
      console.log("Error in GetSiteInfo", "trying again");

      const delay = Math.pow(2, tryCounter) * delayMultiplier;

      await new Promise((resolve) => setTimeout(resolve, delay));

      tryCounter++;
    }
  }

  throw new Error("Exponential Back Off failed in GetSiteOutages");
}

// 3. `POST /site-outages/{siteId}` which expects outages for a specific site to be posted to it
export async function postSiteOutages(
  API_URL: string,
  header: {},
  siteOutages: ISiteOutage[],
  siteId: string
) {
  const tryMax = 3;
  const delayMultiplier = 500;
  let tryCounter = 0;

  while (tryCounter < tryMax) {
    try {
      const res = await axios.post(
        API_URL + `/site-outages/${siteId}`,
        siteOutages,
        { headers: header }
      );

      // console.log("post res: ", res);
      console.log("post status: ", res.status);
      console.log("post res: ", res.data);

      return res;
    } catch (error) {
      console.log("Error in PostSiteOutages ", "trying again");

      const delay = Math.pow(2, tryCounter) * delayMultiplier;

      await new Promise((resolve) => setTimeout(resolve, delay));

      tryCounter++;
    }
  }

  throw new Error("Exponential Back Off failed in PostSiteOutages");
}
