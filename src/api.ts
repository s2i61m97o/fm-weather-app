const GEOCODEURL = "https://geocoding-api.open-meteo.com/v1/search?";
const FORECASTURL = "https://api.open-meteo.com/v1/forecast?";

const FORECAST_PARAMS = {
  daily: "weather_code,temperature_2m_max,temperature_2m_min",
  hourly: "temperature_2m,weather_code",
  current:
    "precipitation,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
};

const QUERY_PARAMS = {
  count: "10",
  language: "en",
  format: "json",
};

export const getQueryLocations = async (input: string) => {
  const searchParams = new URLSearchParams({
    name: input,
    ...QUERY_PARAMS,
  });

  const requestUrl = GEOCODEURL + searchParams;

  try {
    const res = await fetch(requestUrl);
    if (!res.ok) {
      return {
        success: false,
        data: "unable to retrieve locations",
        error: "no data",
      };
    }
    const data = await res.json();
    return {success: true, data: data.results, error: ""};
  } catch (err) {
    console.error(err);
    return {success: false, data: "network error", error: "network"};
  }
};

export const queryApiForecast = async (lat: number, long: number) => {
  const searchParams = new URLSearchParams({
    latitude: lat.toString(),
    longitude: long.toString(),
    ...FORECAST_PARAMS,
  });

  const requestUrl = FORECASTURL + searchParams;

  try {
    const res = await fetch(requestUrl);
    if (!res.ok) {
      return {success: false, data: `Failed to fetch: ${res.statusText}`};
    }
    const data = await res.json();
    return {success: true, data: data};
  } catch (err) {
    return {success: false, data: err, error: "network"};
  }
};
