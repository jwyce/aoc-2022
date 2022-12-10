export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Instruction = { type: 'addx' | 'noop'; value: number };
const ADD_DELAY = 2;

let X = 1;
let cycle = 1;
let currentDelay = 0;
let signalStrength = 0;

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

while (cycle <= 220) {
	cycle++;

	const i = instructions.at(-1);
	if (!i) break;

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

	if ((cycle - 20) % 40 === 0) {
		signalStrength += cycle * X;
	}
}

console.log('answer', signalStrength);
