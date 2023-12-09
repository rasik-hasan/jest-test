export interface IOutages {
  id: string;
  begin: string;
  end: string;
}

export interface IDevices {
  id: string;
  name: string;
}

export interface ISiteInfo {
  id: string;
  name: string;
  devices: [IDevices];
}

export interface ISiteOutage {
  id: string;
  name: string;
  begin: string;
  end: string;
}
