import { parseDirectoryFromCommands } from './a.ts';

export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Node = {
	value: { size: number; name: string };
	children: Node[];
	parent: Node | undefined;
};

const directory = parseDirectoryFromCommands(input);
const totalSpace = 70_000_000;
const minUnusedSpace = 30_000_000;
const unusedSpace = totalSpace - directory.value.size;
console.log('unusedSpace', unusedSpace);

const traverse = (node: Node, candidates: Node['value'][]): Node['value'][] => {
	if (
		node.value.size + unusedSpace >= minUnusedSpace &&
		node.children.length > 0
	) {
		candidates.push(node.value);
	}
	node.children.forEach((child) => {
		candidates = traverse(child, candidates);
	});
	return candidates;
};

const candidates = traverse(directory, []);
console.log('candidates', candidates);

const sizes = candidates.map((x) => x.size);
sizes.sort();
console.log('answer', sizes[0]);
