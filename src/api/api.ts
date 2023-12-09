import axios from "axios";
import { ISiteOutage } from "../types/types";

// 1. `GET /outages` which returns all outages in our system
export async function getOutages(API_URL: string, header: {}) {
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
export async function getSiteInfo(
  API_URL: string,
  header: {},
  siteId: string
): Promise<any> {
  try {
    const res = await axios.get(API_URL + `/site-info/${siteId}`, {
      headers: header,
    });

    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
}

// 3. `POST /site-outages/{siteId}` which expects outages for a specific site to be posted to it
export async function postSiteOutages(
  API_URL: string,
  header: {},
  siteOutages: ISiteOutage[],
  siteId: string
) {
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
