export const x = '';
const input = await Deno.readTextFile('./input.txt');

type PacketPair = {
	id: number;
	left: Node;
	right: Node;
};

type Base = number | number[];
type Node = Base | Base[];

const packetPairs: PacketPair[] = input.split('\n\n').map((packet, idx) => {
	const [left, right] = packet.split('\n');

	return {
		id: idx + 1,
		left: JSON.parse(left.trim()),
		right: JSON.parse(right.trim()),
	};
});

console.log('pairs', packetPairs);

const makeArray = (n: Node) => {
	return typeof n === 'number' ? [n] : n;
};

const comparePackets = (left: Node, right: Node): boolean | undefined => {
	if (Array.isArray(left) && Array.isArray(right)) {
		for (let i = 0; i < left.length && i < right.length; i++) {
			const c = comparePackets(left[i], right[i]);
			if (c !== undefined) {
				return c;
			}
		}
		if (left.length > right.length) return false;
		if (left.length < right.length) return true;
		return undefined;
	} else if (typeof left === 'number' && typeof right === 'number') {
		if (left < right) return true;
		if (left > right) return false;
		return undefined;
	} else {
		return comparePackets(makeArray(left), makeArray(right));
	}
};

const indecies = packetPairs
	.map((p) => (comparePackets(p.left, p.right) ? p.id : null))
	.filter((i) => i !== null) as number[];

console.log('indecies', indecies);

console.log(
	'answer',
	indecies.reduce((acc, i) => acc + i, 0)
);
