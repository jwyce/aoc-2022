export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Point = {
	x: number;
	y: number;
};

const printMatrix = (grid: string[][], minX: number, maxX: number) => {
	const numDigits = maxX.toString().length;
	for (let i = 0; i < numDigits; i++) {
		let significantDigitSlice = '  ';
		for (let k = minX; k <= maxX; k++) {
			significantDigitSlice += k.toString()[i];
		}
		console.log(significantDigitSlice);
	}

	grid.forEach((row, col) => {
		console.log(col, row.join(''));
	});
	console.log();
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
const minX = Math.min(...xVals);
const maxX = Math.max(...xVals);
const maxY = Math.max(...yVals) + 1;
const cave = matrix(maxX - minX, maxY);
const sandSource = { x: 500 - minX, y: 0 };
cave[sandSource.y][sandSource.x] = '+';

paths.forEach((path) => {
	for (let i = 1; i < path.length; i++) {
		const start = path[i - 1];
		const next = path[i];

		const dx = next.x - start.x;
		const dy = next.y - start.y;

		for (let y = 0; y <= Math.abs(dy); y++) {
			cave[start.y + Math.sign(dy) * y][start.x - minX] = '#';
		}
		for (let x = 0; x <= Math.abs(dx); x++) {
			cave[start.y][start.x - minX + Math.sign(dx) * x] = '#';
		}
	}
});

printMatrix(cave, minX, maxX);

const inBoundary = (cave: string[][], point: Point) => {
	return (
		point.x >= 0 &&
		point.x <= cave[0].length &&
		point.y >= 0 &&
		point.y < cave.length
	);
};

const simulateSandfall = (
	cave: string[][],
	source: Point,
	atRest: boolean
): boolean | undefined => {
	if (atRest) {
		cave[source.y][source.x] = 'O';
		return true;
	}

	const candidates: Point[] = [
		{ x: source.x, y: source.y + 1 },
		{ x: source.x - 1, y: source.y + 1 },
		{ x: source.x + 1, y: source.y + 1 },
	];

	const isInBoundary = candidates
		.map((c) => inBoundary(cave, c))
		.reduce((a, b) => a && b, true);
	if (!isInBoundary) return undefined;

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

while (simulateSandfall(cave, sandSource, false));

printMatrix(cave, minX, maxX);

const output = cave
	.flat()
	.flat()
	.filter((c) => c === 'O').length;
console.log('answer', output);
