export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
  timezone: string;
}

export interface CurrentForecast {
  apparent_temperature: number;
  interval: number;
  relative_humidity_2m: number;
  precipitation: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_speed_10m: number;
}

export interface HourForecast {
  time: Date[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface Forecast {
  latitude: number;
  longitude: number;
  current: CurrentForecast;
  hourly: HourForecast;
  daily: DailyForecast;
}

export interface ApiError {
  type: string;
  status: number;
  userMessage: string;
  shouldRetry: boolean;
  details: string | ErrorMessage | Promise<unknown>;
}

export type ErrorMessage = {
  message: string;
};
