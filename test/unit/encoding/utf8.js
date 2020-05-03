import * as utf8 from "../../../src/encoding/utf8";

const text = "hello, world";

const bytes = Uint8Array.from([
    104, 101, 108, 108,
    111, 44, 32, 119,
    111, 114, 108, 100
]);

describe("encoding/utf8", function () {
    it("should encode", function () {
        expect(utf8.encode(text)).to.deep.equal(bytes);
    });

    it("should decode", function () {
        expect(utf8.decode(bytes)).to.equal(text);
    });
});