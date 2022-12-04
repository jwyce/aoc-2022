export const x = '';
const input = await Deno.readTextFile('./input.txt');

function intersect(a: number[], b: number[]) {
	let t;
	if (b.length > a.length) (t = b), (b = a), (a = t); // indexOf to loop over shorter
	return a.filter(function (e) {
		return b.indexOf(e) > -1;
	});
}

const sacks = input
	.split(/\n/)
	.map((rucksack) =>
		rucksack
			.split('')
			.map((char) =>
				char === char.toLowerCase()
					? char.charCodeAt(0) - 96
					: char.charCodeAt(0) - 64 + 26
			)
	);

const output: number[] = [];
for (let i = 0; i < sacks.length; i += 3) {
	const comp1 = sacks[i];
	const comp2 = sacks[i + 1];
	const comp3 = sacks[i + 2];

	const commonItems = intersect(intersect(comp1, comp2), comp3);
	output.push(commonItems[0]);
}

console.log(
	'answer',
	output.reduce((agg, sum) => agg + sum)
);
