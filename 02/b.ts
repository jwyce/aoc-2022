export const x = '';
const input = await Deno.readTextFile('./input.txt');

const inputMapA = {
	A: '🪨',
	B: '📄',
	C: '✂️',
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

const matches = input
	.split(/\n/)
	.map((match) => match.split(' '))
	.map(([op, me]) => [
		inputMapA[op as keyof typeof inputMapA],
		inputMapC[me as keyof typeof inputMapC],
	]);

const output = matches
	.map(
		([op, me]) =>
			outcomeValues[me as keyof typeof outcomeValues] +
			(me === 'draw'
				? shapeValues[op as keyof typeof shapeValues]
				: me === 'lose'
				? shapeValues[winMap[op as keyof typeof winMap]]
				: shapeValues[loseMap[op as keyof typeof loseMap]])
	)
	.reduce((agg, sum) => agg + sum);

console.log('output', output);
