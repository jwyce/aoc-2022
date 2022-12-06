import { parseCrates, parseInstructions } from './a.ts';

export const x = '';
const input = await Deno.readTextFile('./input.txt');

const [unparsedCrates, unparsedInstructions] = input.split('\n\n');
const crates = parseCrates(unparsedCrates);
const instructions = parseInstructions(unparsedInstructions);

console.log('crates', crates);
console.log('instructions', instructions);

instructions.forEach((i) => {
	crates[i.to] = [...crates[i.to], ...crates[i.from].slice(-i.amt)];
	crates[i.from] = crates[i.from].slice(0, -i.amt);
});
console.log('rearranged crates', crates);

let output = '';
Object.values(crates).forEach((stack) => {
	output += stack.pop();
});
console.log('answer', output);
