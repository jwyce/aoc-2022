export const x = '';
const input = await Deno.readTextFile('./input.txt');

const elfs = input.split(/\ns*\n/).map((elf) =>
	elf
		.split('\n')
		.map(Number)
		.reduce((agg, sum) => agg + sum)
);

const output = Math.max(...elfs);
console.log('answer', output);
