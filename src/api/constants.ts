export const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search?";
export const FORECAST_URL = "https://api.open-meteo.com/v1/forecast?";

export const FORECAST_PARAMS = {
  daily:
    "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration",
  hourly: "temperature_2m,weather_code",
  current:
    "precipitation,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
};

export const QUERY_PARAMS = {
  count: "10",
  language: "en",
  format: "json",
};

export const STATUS_MAP: Record<number, string> = {
  400: "Invalid Request. Please try again",
  404: "Location Not Found",
  429: "Too many requests. Please try again shortly",
  500: "Server error. Please try again later",
  503: "Service temporarily unavailable",
};
