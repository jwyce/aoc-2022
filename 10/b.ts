export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Instruction = { type: 'addx' | 'noop'; value: number };
const ADD_DELAY = 2;

let X = 1;
let cycle = 1;
let currentDelay = 0;
const CRT: string[] = Array.from({ length: 6 }, () => '');

const instructions: Instruction[] = input
	.split('\n')
	.map((i) => {
		const [type, value] = i.split(' ');
		return {
			type: type as Instruction['type'],
			value: value ? parseInt(value, 10) : 0,
		};
	})
	.reverse();

while (cycle <= 240) {
	cycle++;

	const i = instructions.at(-1);
	if (!i) break;

	const sprite = [X - 1, X, X + 1];
	const pixelDrawn = ((cycle - 1) % 40) - 1;
	const lineNumber = Math.floor((cycle - 2) / 40);
	CRT[lineNumber] += sprite.includes(pixelDrawn) ? '#' : '.';

	if (i.type === 'noop') {
		instructions.pop();
	} else {
		currentDelay++;

		if (currentDelay === ADD_DELAY) {
			currentDelay = 0;
			X += i.value;
			instructions.pop();
		}
	}
}

// NOTE: I think this is wrong but I still got it somehow ¯\_(ツ)_/¯
CRT.forEach((line) => console.log(line));
