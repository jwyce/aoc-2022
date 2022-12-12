export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Point = { x: number; y: number };

const getHeight = (hill: string): number => {
	if (hill === 'S') {
		return 0;
	} else if (hill === 'E') {
		return 25;
	}
	return hill.charCodeAt(0) - 97;
};

const getNeighbors = (p: Point, h: string[][]): Point[] => {
	const neighbors: Point[] = [
		{ x: p.x, y: p.y - 1 },
		{ x: p.x, y: p.y + 1 },
		{ x: p.x - 1, y: p.y },
		{ x: p.x + 1, y: p.y },
	];

	return neighbors.filter((n) => {
		if (n.x < 0 || n.x >= h.length || n.y < 0 || n.y >= h[0].length) {
			return false;
		}

		return getHeight(h[p.x][p.y]) - getHeight(h[n.x][n.y]) <= 1;
	});
};

const heightmap = input.split('\n').map((line) => line.split(''));
const startingCandidates: Point[] = [];
let end: Point = { x: 0, y: 0 };

heightmap.forEach((h) => {
	console.log(h.join(''));
});
console.log();

for (let x = 0; x < heightmap.length; x++) {
	for (let y = 0; y < heightmap[x].length; y++) {
		if (heightmap[x][y] === 'S' || heightmap[x][y] === 'a') {
			startingCandidates.push({ x, y });
		}
		if (heightmap[x][y] === 'E') {
			end = { x, y };
		}
	}
}

// Hillclimbing all-pairs shortest paths from 'a'

// console.log('startingCandidates', startingCandidates);
const hillClimbing = (start: Point) => {
	const visited = new Map<string, string | undefined>();
	visited.set(`${end.x},${end.y}`, undefined);
	const queue = [end];

	while (queue.length > 0) {
		const v = queue.shift()!;

		// console.log('neighbors', getNeighbors(v, heightmap));
		for (const n of getNeighbors(v, heightmap)) {
			if (!visited.has(`${n.x},${n.y}`)) {
				visited.set(`${n.x},${n.y}`, `${v.x},${v.y}`);
				queue.push(n);
			}
		}
	}

	// console.log('visited', visited);

	const path = [`${start.x},${start.y}`];
	let next = visited.get(`${start.x},${start.y}`);
	while (next !== undefined) {
		path.push(next);
		next = visited.get(next);
	}

	return path;
};

const pathLengths = startingCandidates.map((c) => {
	const path = hillClimbing(c);
	if (path.length - 1 < 2) {
		return Infinity;
	}
	return path.length - 1;
});
// console.log('pathLengths', pathLengths);
console.log('answer', Math.min(...pathLengths));
