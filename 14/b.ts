export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Point = {
	x: number;
	y: number;
};

const matrix = (cols: number, rows: number) =>
	Array.from({ length: rows }, () => Array.from({ length: cols }, () => ' '));

const parsePaths = (input: string): Point[][] => {
	return input.split('\n').map((line) => {
		const points = line.split(' -> ');
		return points.map((p) => {
			const [x, y] = p.split(',');
			return {
				x: Number(x),
				y: Number(y),
			};
		});
	});
};

const paths = parsePaths(input);

const xVals = paths.flat().map((p) => p.x);
const yVals = paths.flat().map((p) => p.y);
const maxX = Math.max(...xVals);
const maxY = Math.max(...yVals) + 1;
const cave = matrix(maxX * 2, maxY);
const sandSource = { x: 500, y: 0 };
cave[sandSource.y][sandSource.x] = '+';

paths.forEach((path) => {
	for (let i = 1; i < path.length; i++) {
		const start = path[i - 1];
		const next = path[i];

		const dx = next.x - start.x;
		const dy = next.y - start.y;

		for (let y = 0; y <= Math.abs(dy); y++) {
			cave[start.y + Math.sign(dy) * y][start.x] = '#';
		}
		for (let x = 0; x <= Math.abs(dx); x++) {
			cave[start.y][start.x + Math.sign(dx) * x] = '#';
		}
	}
});

const simulateSandfall = (
	cave: string[][],
	source: Point,
	atRest: boolean
): boolean | undefined => {
	if (atRest) {
		cave[source.y][source.x] = 'O';
		return JSON.stringify(source) === JSON.stringify(sandSource)
			? undefined
			: true;
	}

	const below = cave[source.y + 1][source.x];
	const left = cave[source.y + 1][source.x - 1];
	const right = cave[source.y + 1][source.x + 1];

	if (below !== 'O' && below !== '#') {
		return simulateSandfall(cave, { x: source.x, y: source.y + 1 }, false);
	} else {
		if (left !== 'O' && left !== '#') {
			return simulateSandfall(
				cave,
				{ x: source.x - 1, y: source.y + 1 },
				false
			);
		} else if (right !== 'O' && right !== '#') {
			return simulateSandfall(
				cave,
				{ x: source.x + 1, y: source.y + 1 },
				false
			);
		} else {
			return simulateSandfall(cave, source, true);
		}
	}
};

const fillCaveCompletely = (cave: string[][]) => {
	const augmentedCave: string[][] = JSON.parse(JSON.stringify(cave)).concat(
		Array.from({ length: 2 }, (_, i) =>
			Array.from({ length: cave[0].length }, () => (i ? '#' : ' '))
		)
	);
	while (simulateSandfall(augmentedCave, sandSource, false));
	return augmentedCave;
};

const filled = fillCaveCompletely(cave);

const output = filled
	.flat()
	.flat()
	.filter((c) => c === 'O').length;
console.log('answer', output);
