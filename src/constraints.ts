import iconSunny from "/images/icon-sunny.webp";
import iconStorm from "/images/icon-storm.webp";
import iconSnow from "/images/icon-snow.webp";
import iconRain from "/images/icon-rain.webp";
import iconPartCloud from "/images/icon-partly-cloudy.webp";
import iconOvercast from "/images/icon-overcast.webp";
import iconFog from "/images/icon-fog.webp";
import iconDrizzle from "/images/icon-drizzle.webp";

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
