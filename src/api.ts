// import type {Location} from "./types";

export const getApiData = async (input: string) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`,
  );
  const data = await res.json();
  return data.results;
};
