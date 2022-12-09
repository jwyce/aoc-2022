export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Point = { x: number; y: number };
type Movement = { direction: 'U' | 'D' | 'L' | 'R'; distance: number };

const knots: Point[] = new Array(10).fill(0).map(() => ({ x: 0, y: 0 }));
const visted = new Map<string, Point>();
visted.set('0,0', { ...knots[9] });

const movements: Movement[] = input.split('\n').map((m) => {
	const [direction, distance] = m.split(' ');
	return {
		direction: direction as Movement['direction'],
		distance: parseInt(distance, 10),
	};
});

const nextPos = (posT: Point, posH: Point): Point => {
	const distX = posH.x - posT.x;
	const distY = posH.y - posT.y;
	const absDistX = Math.abs(distX);
	const absDistY = Math.abs(distY);

	if (distX === 0 && absDistY === 2) {
		return { x: posT.x, y: posT.y + Math.sign(distY) };
	} else if (absDistX === 2 && distY === 0) {
		return { x: posT.x + Math.sign(distX), y: posT.y };
	} else if (
		Math.abs(absDistX - absDistX) < 2 &&
		absDistX !== 0 &&
		absDistY !== 0 &&
		(absDistX !== absDistY || (absDistX === 2 && absDistY === 2))
	) {
		return { x: posT.x + Math.sign(distX), y: posT.y + Math.sign(distY) };
	}

	return posT;
};

movements.forEach((m) => {
	for (let i = 1; i <= m.distance; i++) {
		knots[0].x += m.direction === 'R' ? 1 : m.direction === 'L' ? -1 : 0;
		knots[0].y += m.direction === 'U' ? 1 : m.direction === 'D' ? -1 : 0;

		for (let k = 1; k <= 9; k++) {
			knots[k] = nextPos(knots[k], knots[k - 1]);
		}

		visted.set(`${knots[9].x},${knots[9].y}`, { ...knots[9] });
	}
});

console.log('visted', visted);
console.log('answer', visted.size);
