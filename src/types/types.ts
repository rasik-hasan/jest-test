export interface IOutage {
  id: string;
  begin: string;
  end: string;
}

export interface IDevice {
  id: string;
  name: string;
}

export interface ISiteInfo {
  id: string;
  name: string;
  devices: IDevice[];
}

export interface ISiteOutage {
  id: string;
  name: string;
  begin: string;
  end: string;
}
