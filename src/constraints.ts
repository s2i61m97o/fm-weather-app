import iconSunny from "/images/icon-sunny.webp";
import iconStorm from "/images/icon-storm.webp";
import iconSnow from "/images/icon-snow.webp";
import iconRain from "/images/icon-rain.webp";
import iconPartCloud from "/images/icon-partly-cloudy.webp";
import iconOvercast from "/images/icon-overcast.webp";
import iconFog from "/images/icon-fog.webp";
import iconDrizzle from "/images/icon-drizzle.webp";
import type {Forecast} from "./types";

export const ICON_CODES = {
  iconDrizzle: [51, 53, 55, 56, 57, 61],
  iconSunny: [0],
  iconPartCloud: [1, 2],
  iconOvercast: [3],
  iconFog: [45, 48],
  iconSnow: [71, 73, 75, 77, 85, 86],
  iconRain: [63, 65, 66, 67, 80, 81, 82],
  iconStorm: [95, 96, 99],
};

export const ICON_SRC = {
  iconDrizzle: iconDrizzle,
  iconFog: iconFog,
  iconOvercast: iconOvercast,
  iconPartCloud: iconPartCloud,
  iconRain: iconRain,
  iconSnow: iconSnow,
  iconStorm: iconStorm,
  iconSunny: iconSunny,
};

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const emptyForecast: Forecast = {
  longitude: 0,
  latitude: 0,
  current: {
    apparent_temperature: 0,
    interval: 0,
    relative_humidity_2m: 0,
    precipitation: 0,
    temperature_2m: 0,
    time: "0",
    weather_code: 0,
    wind_speed_10m: 0,
  },
  hourly: {
    time: [new Date()],
    temperature_2m: [0],
    weather_code: [0],
  },
  daily: {
    time: ["0000"],
    weather_code: [0],
    temperature_2m_max: [0],
    temperature_2m_min: [0],
    sunrise: ["0000"],
    sunset: ["0000"],
  },
};
