export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Base = number | number[];
type Node = Base | Base[];

const packets: Node[] = input
	.split('\n')
	.filter((x) => x.trim() !== '')
	.map((packet) => {
		return JSON.parse(packet);
	});

packets.push(...[[[2]], [[6]]]);

console.log('packets', packets);

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

packets.sort((a, b) => (comparePackets(a, b) ? -1 : 1));
console.log('sorted', packets);

const getIndex = (n: Node, packets: Node[]) => {
	return packets.map((p) => JSON.stringify(p)).indexOf(JSON.stringify(n)) + 1;
};

console.log('answer', getIndex([[2]], packets) * getIndex([[6]], packets));
