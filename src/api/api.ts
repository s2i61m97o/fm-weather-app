import type {ApiError, Forecast} from "../types";
import {
  GEOCODE_URL,
  FORECAST_URL,
  FORECAST_PARAMS,
  QUERY_PARAMS,
  STATUS_MAP,
} from "./constants.ts";

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
