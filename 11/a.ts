export const x = '';
const input = await Deno.readTextFile('./input.txt');

type MonkeyNote = {
	items: number[];
	operation: (worry: number) => number;
	condition: (worry: number) => number;
};

const trimText = (text: string, trim: string) => {
	return text.trim().replace(trim, '');
};

const monkeys: MonkeyNote[] = input.split('\n\n').map((m) => {
	const notes = m.split('\n');

	const items = trimText(notes[1], 'Starting items: ').split(',').map(Number);

	const condition = (x: number) => {
		return x % Number(trimText(notes[3], 'Test: divisible by ')) === 0
			? Number(trimText(notes[4], 'If true: throw to monkey '))
			: Number(trimText(notes[5], 'If false: throw to monkey '));
	};

	const operation = (old: number) => {
		const [op, b] = trimText(notes[2], 'Operation: new = old ').split(' ');
		const operand = b === 'old' ? old : Number(b);

		if (op === '+') return old + operand;
		else if (op === '*') return old * operand;

		throw new Error('Invalid operation');
	};

	return { items, condition, operation };
});

const inspectCount = Array.from({ length: monkeys.length }, () => 0);

for (let rounds = 0; rounds < 20; rounds++) {
	monkeys.forEach((m, idx) => {
		m.items.forEach((i) => {
			inspectCount[idx]++;

			const newWorry = Math.floor(m.operation(i) / 3);
			const throwTo = m.condition(newWorry);

			monkeys[throwTo].items.push(newWorry);
		});

		m.items = [];
	});
}

const sorted = inspectCount.sort((a, b) => b - a);
console.log('round 20', monkeys);
console.log('inspect count', sorted);
console.log('monkey business', sorted[0] * sorted[1]);
