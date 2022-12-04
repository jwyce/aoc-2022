export const x = '';
const input = await Deno.readTextFile('./input.txt');

const elves = input.split(/\ns*\n/).map((elf) =>
	elf
		.split('\n')
		.map(Number)
		.reduce((agg, sum) => agg + sum)
);

const output = elves
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((agg, sum) => agg + sum);

console.log('answer', output);
