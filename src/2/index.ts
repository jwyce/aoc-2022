import fs from 'fs';

const inputMapA = {
  A: '🪨',
  B: '📄',
  C: '✂️',
} as const;

const inputMapB = {
  X: '🪨',
  Y: '📄',
  Z: '✂️',
} as const;

const inputMapC = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
} as const;

const shapeValues = {
  '🪨': 1,
  '📄': 2,
  '✂️': 3,
} as const;

const winMap = {
  '🪨': '✂️',
  '📄': '🪨',
  '✂️': '📄',
} as const;

const loseMap = {
  '🪨': '📄',
  '📄': '✂️',
  '✂️': '🪨',
} as const;

const outcomeValues = {
  win: 6,
  lose: 0,
  draw: 3,
} as const;

export const rpsScore = (file: string) => {
  const input = fs.readFileSync(file, 'utf8');
  const matches = input
    .split(/\n/)
    .map((match) => match.split(' '))
    .map(([op, me]) => [
      inputMapA[op as keyof typeof inputMapA],
      inputMapB[me as keyof typeof inputMapB],
    ]) satisfies [
    typeof inputMapA[keyof typeof inputMapA],
    typeof inputMapB[keyof typeof inputMapB]
  ][];

  const output = matches
    .map(
      ([op, me]) =>
        shapeValues[me] +
        (winMap[me] === op
          ? outcomeValues.win
          : me === op
          ? outcomeValues.draw
          : outcomeValues.lose)
    )
    .reduce((agg, sum) => agg + sum);

  console.log('matches', matches);
  return output;
};

export const rpsScoreNewRules = (file: string) => {
  const input = fs.readFileSync(file, 'utf8');
  const matches = input
    .split(/\n/)
    .map((match) => match.split(' '))
    .map(([op, me]) => [
      inputMapA[op as keyof typeof inputMapA],
      inputMapC[me as keyof typeof inputMapC],
    ]) satisfies [
    typeof inputMapA[keyof typeof inputMapA],
    typeof inputMapC[keyof typeof inputMapC]
  ][];

  const output = matches
    .map(
      ([op, me]) =>
        outcomeValues[me] +
        (me === 'draw'
          ? shapeValues[op]
          : me === 'lose'
          ? shapeValues[winMap[op]]
          : shapeValues[loseMap[op]])
    )
    .reduce((agg, sum) => agg + sum);

  console.log('matches', matches);
  return output;
};
