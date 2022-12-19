import {mergeSort} from '../src/client/js/comm';

describe("Testing the mergeSort functionality", () => {
    test("Testing the mergeSort() function", () => {
        expect(mergeSort([1,5,32,18,9,43])).toEqual([1,5,9,18,32,43]);
    })});