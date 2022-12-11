export const x = '';
const input = await Deno.readTextFile('./input.txt');

type MonkeyNote = {
	mod: number;
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
	const mod = Number(trimText(notes[3], 'Test: divisible by '));

	const condition = (x: number) => {
		return x % mod === 0
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

	return { items, mod, condition, operation };
});

const globalMod = monkeys.reduce((a, b) => a * b.mod, 1);
const inspectCount = Array.from({ length: monkeys.length }, () => 0);

for (let rounds = 0; rounds < 10_000; rounds++) {
	monkeys.forEach((m, idx) => {
		m.items.forEach((i) => {
			inspectCount[idx]++;

			const newWorry = m.operation(i) % globalMod;
			const throwTo = m.condition(newWorry);

			monkeys[throwTo].items.push(newWorry);
		});

		m.items = [];
	});
}

const sorted = inspectCount.sort((a, b) => b - a);
console.log('round 10_000', monkeys);
console.log('inspect count', sorted);
console.log('monkey business', sorted[0] * sorted[1]);
