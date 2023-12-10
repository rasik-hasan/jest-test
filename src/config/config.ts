if (!process.env.API_KEY || !process.env.API_URL) {
  throw new Error("Missing env variables");
}

export const API_KEY: string = process.env.API_KEY ?? "";
export const API_URL: string = process.env.API_URL ?? "";
