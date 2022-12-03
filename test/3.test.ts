import { rucksackComparison, threeElfGroupRucksack } from '../src/3';

describe('day 3: rucksack reorganization', () => {
  it('finds common item and sums priorities from test data', () => {
    expect(rucksackComparison('./input/3/test.txt')).toEqual(157);
  });
  it('finds common item and sums priorities from real data', () => {
    expect(rucksackComparison('./input/3/a.txt')).toEqual(7878);
  });
  it('finds common item and sums priorities from a group of 3 elves in test data', () => {
    expect(threeElfGroupRucksack('./input/3/test.txt')).toEqual(70);
  });
  it('finds common item and sums priorities from a group of 3 elves in real data', () => {
    expect(threeElfGroupRucksack('./input/3/b.txt')).toEqual(2760);
  });
});
