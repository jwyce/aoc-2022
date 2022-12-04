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
	)
	.map((sack) => {
		const compartment1 = sack.slice(0, sack.length / 2);
		const compartment2 = sack.slice(sack.length / 2, sack.length);

		const commonItems = intersect(compartment1, compartment2);

		return commonItems[0];
	});

console.log(
	'answer',
	sacks.reduce((agg, sum) => agg + sum)
);
