export const x = '';
const input = await Deno.readTextFile('./input.txt');

const grid = input.split('\n').map((line) => line.split('').map(Number));

console.log('grid', grid);
let maxScenic = 0;

const getViewDistance = (trees: number[], cell: number) => {
	let count = 0;
	for (let i = 0; i < trees.length; i++) {
		count++;
		if (trees[i] >= cell) {
			break;
		}
	}
	return count;
};

for (let x = 1; x < grid.length - 1; x++) {
	for (let y = 1; y < grid[0].length - 1; y++) {
		const cell = grid[x][y];

		const l = grid.slice(x, x + 1).map((i) => i.slice(0, y));
		const r = grid.slice(x, x + 1).map((i) => i.slice(y + 1));
		const u = grid.slice(0, x).map((i) => i.slice(y, y + 1));
		const d = grid.slice(x + 1).map((i) => i.slice(y, y + 1));

		const distL = getViewDistance(l.flat().reverse(), cell);
		const distR = getViewDistance(r.flat(), cell);
		const distU = getViewDistance(u.flat().reverse(), cell);
		const distD = getViewDistance(d.flat(), cell);

		const scenicScore = distL * distR * distU * distD;

		// console.log('cell', `${x},${y}`, 'value', cell);
		// console.log('l', l.flat().reverse());
		// console.log('r', r.flat());
		// console.log('u', u.flat().reverse());
		// console.log('d', d.flat());
		// console.log('L', distL);
		// console.log('R', distR);
		// console.log('U', distU);
		// console.log('D', distD);
		// console.log('scenicScore', scenicScore);
		// console.log('max', maxScenic);
		// console.log('---\n');

		if (scenicScore > maxScenic) maxScenic = scenicScore;
	}
}

console.log('answer', maxScenic);
