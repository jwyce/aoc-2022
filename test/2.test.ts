import { rpsScore, rpsScoreNewRules } from '../src/2';

describe('day 2: rock paper scissors', () => {
  it('calculates rps score from test input', () => {
    expect(rpsScore('./input/2/test.txt')).toEqual(15);
  });
  it('calculates rps score from real input', () => {
    expect(rpsScore('./input/2/a.txt')).toEqual(11063);
  });
  it('calculates rps score with new rules from test input', () => {
    expect(rpsScoreNewRules('./input/2/test.txt')).toEqual(12);
  });
  it('calculates rps score with new rules from real input', () => {
    expect(rpsScoreNewRules('./input/2/b.txt')).toEqual(10349);
  });
});
