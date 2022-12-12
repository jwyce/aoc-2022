export const x = '';
const input = await Deno.readTextFile('./input.txt');

let count = 0;
input.split(/\n/).forEach((pair) => {
	const [a, b] = pair.split(',');
	const [startA, endA] = a.split('-').map(Number);
	const [startB, endB] = b.split('-').map(Number);

	if (
		(startA >= startB && endA <= endB) ||
		(startB >= startA && endB <= endA)
	) {
		count++;
	}
});

console.log('answer', count);
