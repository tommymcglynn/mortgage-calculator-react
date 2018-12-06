import Util from "./Util";

test('numberValueOrDefault', () => {
    expect(Util.numberValueOrDefault(null, 5, 10)).toBe(10);
    expect(Util.numberValueOrDefault("value", 5, 10)).toBe(10);
    expect(Util.numberValueOrDefault(2, 5, 10)).toBe(10);
    expect(Util.numberValueOrDefault(6, 5, 10)).toBe(6);
});

test('numberValueInSetOrDefault', () => {
    expect(Util.numberValueInSetOrDefault(null, [5, 10, 20], 10)).toBe(10);
    expect(Util.numberValueInSetOrDefault("5", [5, 10, 20], 10)).toBe(10);
    expect(Util.numberValueInSetOrDefault(12, [5, 10, 20], 10)).toBe(10);
    expect(() => Util.numberValueInSetOrDefault(5, 10, 10)).toThrow();
});