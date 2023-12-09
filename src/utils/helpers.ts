//2.1 Filter out data that began before 2022-01-01T00:00:00.000Z

import { IOutages, IDevices, ISiteOutage } from "../types/types";

export function filterByTime(time: string, data: IOutages[]) {
  const filtered = data.filter((item: IOutages) => {
    const startDate = new Date(item.begin);
    const targetDate = new Date(time);

    return startDate >= targetDate;
  });

  return filtered;
}

//2.2 filter out outages that don't have devices in the list of devices in site info
export function filterById(outages: IOutages[], devices: IDevices[]) {
  const deviceIds = devices.map((device) => device.id);
  const filtered = outages.filter((outage) => deviceIds.includes(outage.id));
  return filtered;
}

//2.3 attach name of device in the remaining array
export function attachDeviceNameToOutage(
  outages: IOutages[],
  devices: IDevices[]
) {
  const attached: ISiteOutage[] = outages.map((outage) => {
    const device = devices.find((device) => outage.id === device.id);

    const newAttach = { ...outage, name: device?.name ?? "" };

    return newAttach;
  });

  return attached;
}