import {ICON_CODES, ICON_SRC} from "./constraints";

// ICONS from weather_codes
export const getIcon = (code: number | undefined) => {
  if (code === undefined) {
    return;
  }

  for (const [key, value] of Object.entries(ICON_CODES)) {
    if (value.includes(code)) {
      return ICON_SRC[key as keyof typeof ICON_SRC];
    }
  }
  return undefined;
};

// METRIC TO IMPERIAL LOGIC
// temp
export const toFahrenheit = (celsius: number) => {
  return celsius * (9 / 5) + 32;
};

// speed
export const toMph = (km: number) => {
  return km / 1.609;
};

// precipitation
export const toInches = (mm: number) => {
  return mm / 25.4;
};
