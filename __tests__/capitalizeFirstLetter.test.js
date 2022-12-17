let capitalizeFirstLetter = require ('../src/server/server');

describe("Testing the capitalize functionality", () => {
    test("Testing the capitalizeFirstLetter() function", () => {
        expect(capitalizeFirstLetter('australia')).toEqual('Australia');
    })});