import {toMph} from "./toMph";

describe("toMph", () => {
  it("should convert km/h to mph", () => {
    const result = toMph(4);
    expect(result).toBe(2);
  });
});

describe("toMph", () => {
  it("should convert km/h to mph", () => {
    const result = toMph(13);
    expect(result).toBe(8);
  });
});
