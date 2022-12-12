export const x = '';
const input = await Deno.readTextFile('./input.txt');

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

const outcomeValues = {
	win: 6,
	lose: 0,
	draw: 3,
} as const;

const matches = input
	.split(/\n/)
	.map((match) => match.split(' '))
	.map(([op, me]) => [
		inputMapA[op as keyof typeof inputMapA],
		inputMapB[me as keyof typeof inputMapB],
	]);

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

console.log('output', output);
