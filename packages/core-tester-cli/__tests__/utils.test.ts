import { mlcToSatoshi, parseFee, satoshiToMlc } from "../src/utils";

describe("Utils", () => {
    describe("parseFee", () => {
        it("should give satoshi", () => {
            expect(parseFee(0.1).toString()).toBe("10000000");
            expect(parseFee(1).toString()).toBe("100000000");
            expect(parseFee(10).toString()).toBe("1000000000");
            expect(parseFee("0.1").toString()).toBe("10000000");
            expect(parseFee("1").toString()).toBe("100000000");
            expect(parseFee("10").toString()).toBe("1000000000");
            expect(parseFee("0.001-0.005").toNumber()).toBeWithin(100000, 500000);
        });
    });

    describe("mlcToSatoshi", () => {
        it("should give satoshi", () => {
            expect(mlcToSatoshi(0.00000001).toString()).toBe("1");
            expect(mlcToSatoshi(0.1).toString()).toBe("10000000");
            expect(mlcToSatoshi(1).toString()).toBe("100000000");
            expect(mlcToSatoshi(10).toString()).toBe("1000000000");
        });
    });

    describe("satoshiToMlc", () => {
        it("should give mlc", () => {
            expect(satoshiToMlc(1)).toBe("0.00000001 DѦ");
            expect(satoshiToMlc(10000000)).toBe("0.1 DѦ");
            expect(satoshiToMlc(100000000)).toBe("1 DѦ");
            expect(satoshiToMlc(1000000000)).toBe("10 DѦ");
        });
    });
});
