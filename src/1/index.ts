import fs from 'fs';

export const mostCalories = (file: string) => {
  const input = fs.readFileSync(file, 'utf8');
  const elfs = input.split(/\ns*\n/).map(elf =>
    elf
      .split('\n')
      .map(Number)
      .reduce((agg, sum) => agg + sum)
  );

  const output = Math.max(...elfs);
  console.log('elfs', elfs);
  console.log('answer', output);

  return output;
};

export const top3Calories = (file: string) => {
  const input = fs.readFileSync(file, 'utf8');
  const elfs = input.split(/\ns*\n/).map(elf =>
    elf
      .split('\n')
      .map(Number)
      .reduce((agg, sum) => agg + sum)
  );

  const output = elfs
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((agg, sum) => agg + sum);
  console.log('elfs', elfs);
  console.log('answer', output);

  return output;
};
