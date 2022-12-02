import { mostCalories, top3Calories } from '../src/1';

describe('day 1: counting calories', () => {
  it('finds elf with most calories from test input', () => {
    expect(mostCalories('./input/1/test.txt')).toEqual(24000);
  });
  it('finds elf with most calories from real input', () => {
    expect(mostCalories('./input/1/a.txt')).toEqual(69289);
  });
  it('finds top 3 elves with most calories and sums them from test input', () => {
    expect(top3Calories('./input/1/test.txt')).toEqual(45000);
  });
  it('finds top 3 elves with most colories and sums them from real input', () => {
    expect(top3Calories('./input/1/b.txt')).toEqual(205615);
  });
});
