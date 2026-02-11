import {toInches} from "../toInch";

describe("toInch", () => {
  it("should convert mm to inches", () => {
    const result = toInches(2);
    expect(result).toBe("0.1");
  });

  it("should convert mm to inches", () => {
    const result = toInches(13);
    expect(result).toBe("0.5");
  });
});
