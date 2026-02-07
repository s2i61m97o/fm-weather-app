import {ICON_CODES, ICON_SRC} from "./contraits";

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
