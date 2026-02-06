export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
}

export interface CurrentForecast {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
}

export interface HourForecast {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number;
  temperature_2m_min: number;
}

export interface Forecast {
  current: CurrentForecast;
  hourly: HourForecast;
  daily: DailyForecast;
}
