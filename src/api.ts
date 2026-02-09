import type {ApiError, Forecast} from "./types";

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search?";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast?";

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

const STATUS_MAP: Record<number, string> = {
  400: "Invalid Request. Please try again",
  404: "Location Not Found",
  429: "Too many requests. Please try again shortly",
  500: "Server error. Please try again later",
  503: "Service temporarily unavailable",
};

export const getQueryLocations = async (input: string) => {
  const searchParams = new URLSearchParams({
    name: input,
    ...QUERY_PARAMS,
  });

  const requestUrl = GEOCODE_URL + searchParams;

  try {
    const res = await fetch(requestUrl);
    if (!res.ok) {
      let errorData: ApiError["details"];
      try {
        errorData = res.json();
      } catch {
        errorData = {message: res.statusText};
      }
      return {
        success: false,
        error: {
          type: "HTTP_ERROR",
          status: res.status,
          userMessage: STATUS_MAP[res.status] || "An unexpected error occurred",
          shouldRetry: res.status >= 500,
          details: errorData,
        },
      };
    }
    const data = await res.json();
    return {success: true, data: data.results};
  } catch (err) {
    if (err instanceof SyntaxError) {
      return {
        success: false,
        error: {
          type: "PARSE_ERROR",
          status: 0,
          userMessage: "Received invalid data from server",
          shouldRetry: false,
          details: err.message,
        },
      };
    }
    if (err instanceof TypeError) {
      return {
        success: false,
        error: {
          type: "NETWORK_ERROR",
          status: 0,
          userMessage: "Unable to connect, check your internet connection",
          shouldRetry: true,
          details: err.message,
        },
      };
    }
  }
};

export const queryApiForecast = async (lat: number, long: number) => {
  const searchParams = new URLSearchParams({
    latitude: lat.toString(),
    longitude: long.toString(),
    ...FORECAST_PARAMS,
  });

  const requestUrl = FORECAST_URL + searchParams;

  try {
    const res = await fetch(requestUrl);
    if (!res.ok) {
      let errorData: ApiError["details"];
      try {
        errorData = res.json();
      } catch {
        errorData = {message: res.statusText};
      }
      return {
        success: false,
        error: {
          type: "HTTP_ERROR",
          status: res.status,
          userMessage: STATUS_MAP[res.status] || "An unexpected error occurred",
          shouldRetry: res.status >= 500,
          details: errorData,
        },
      };
    }
    const data: Forecast = await res.json();
    return {success: true, data: data};
  } catch (err) {
    if (err instanceof SyntaxError) {
      return {
        success: false,
        error: {
          type: "PARSE_ERROR",
          status: 0,
          userMessage: "Received invalid data from server",
          shouldRetry: false,
          details: err.message,
        },
      };
    }
    if (err instanceof TypeError) {
      return {
        success: false,
        error: {
          type: "NETWORK_ERROR",
          status: 0,
          userMessage: "Unable to connect, check your internet connection",
          shouldRetry: true,
          details: err.message,
        },
      };
    }
  }
};
