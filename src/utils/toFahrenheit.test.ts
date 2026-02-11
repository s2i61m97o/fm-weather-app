import {toFahrenheit} from "./toFahrenheit";

describe("convertToFahrenheit", () => {
  it("should convert Celsius to Fahrenheit", () => {
    const result = toFahrenheit(20);
    expect(result).toBe(68);
  });
});

describe("convertToFahrenheit", () => {
  it("should convert Celsius to Fahrenheit", () => {
    const result = toFahrenheit(33);
    expect(result).toBe(91);
  });
});
