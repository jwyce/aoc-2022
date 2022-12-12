export const x = '';
const input = await Deno.readTextFile('./input.txt');

const grid = input.split('\n').map((line) => line.split('').map(Number));

console.log('grid', grid);
let visible = 2 * (grid.length + grid[0].length - 2);

for (let x = 1; x < grid.length - 1; x++) {
	for (let y = 1; y < grid[0].length - 1; y++) {
		const cell = grid[x][y];

		const l = grid.slice(x, x + 1).map((i) => i.slice(0, y));
		const r = grid.slice(x, x + 1).map((i) => i.slice(y + 1));
		const u = grid.slice(0, x).map((i) => i.slice(y, y + 1));
		const d = grid.slice(x + 1).map((i) => i.slice(y, y + 1));

		// console.log('cell', `${x},${y}`);
		// console.log('left', l.flat());
		// console.log('right', r.flat());
		// console.log('above', u.flat());
		// console.log('below', d.flat());
		// console.log('---\n');

		if (Math.max(...l.flat()) < cell) visible++;
		else if (Math.max(...r.flat()) < cell) visible++;
		else if (Math.max(...u.flat()) < cell) visible++;
		else if (Math.max(...d.flat()) < cell) visible++;
	}
}

console.log('answer', visible);
