const GEOCODEURL = "https://geocoding-api.open-meteo.com/v1/search?";
const FORECASTURL = "https://api.open-meteo.com/v1/forecast?";

export const getQueryLocations = async (input: string) => {
  const searchParams = new URLSearchParams();
  searchParams.set("name", input);
  searchParams.set("count", "10");
  searchParams.set("language", "en");
  searchParams.set("format", "json");
  const requestUrl = GEOCODEURL + searchParams;

  try {
    const res = await fetch(requestUrl);
    if (!res.ok) {
      throw new Error("API Error");
    }
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const queryApiForecast = async (lat: number, long: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set("latitude", lat.toString());
  searchParams.set("longitude", long.toString());
  searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min",
  );
  searchParams.set("hourly", "temperature_2m,weather_code");
  searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
  );

  const requestUrl = FORECASTURL + searchParams;

  try {
    const res = await fetch(requestUrl);
    if (!res.ok) {
      throw new Error("Api Error");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
