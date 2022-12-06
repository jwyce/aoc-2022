export const x = '';
const input = await Deno.readTextFile('./input.txt');

export const parseCrates = (input: string) => {
	const crates: Record<number, string[]> = {};
	const numStacks = input.split('\n').at(-1)?.trim().split(/\s+/).length;
	if (!numStacks) {
		throw new Error('invalid input');
	}

	for (let i = 0; i < numStacks; i++) {
		const stack = input
			.split('\n')
			.slice(0, -1)
			.map((line) => line.slice(4 * i, 4 * i + 3));

		crates[i + 1] = stack
			.filter((s) => s.trim() !== '')
			.map((s) => s.substring(1, 2))
			.reverse();
	}

	return crates;
};

export const parseInstructions = (input: string) => {
	return input.split('\n').map((line) => {
		const nums = line.match(/\d+/g)?.map(Number);
		if (!nums) throw new Error('invalid input');

		const [amt, from, to] = nums;
		return { amt, from, to };
	});
};

const [unparsedCrates, unparsedInstructions] = input.split('\n\n');
const crates = parseCrates(unparsedCrates);
const instructions = parseInstructions(unparsedInstructions);

console.log('crates', crates);
console.log('instructions', instructions);

instructions.forEach((i) => {
	for (let t = 0; t < i.amt; t++) {
		crates[i.to].push(crates[i.from].pop()!);
	}
});
console.log('rearranged crates', crates);

let output = '';
Object.values(crates).forEach((stack) => {
	output += stack.pop();
});
console.log('answer', output);
