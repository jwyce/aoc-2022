export const x = '';
const input = await Deno.readTextFile('./input.txt');

type Node = {
	value: { size: number; name: string };
	children: Node[];
	parent: Node | undefined;
};

export const parseDirectoryFromCommands = (input: string) => {
	const lines = input.split(/\n/).slice(1);
	const directory: Node = {
		value: { name: '/', size: 0 },
		children: [],
		parent: undefined,
	};

	let currentRef: Node | undefined = directory;
	lines.forEach((line) => {
		if (line.startsWith('$ cd')) {
			const name = line.split(' ')[2];
			if (name === '..') {
				currentRef = currentRef?.parent;
			} else {
				currentRef = currentRef?.children.find((x) => x.value.name === name)!;
			}
		} else if (line.startsWith('$ ls')) {
			// do nothing
		} else {
			const [size, name] = line.split(' ');
			currentRef?.children.push({
				value: { name: name, size: size === 'dir' ? 0 : Number(size) },
				children: [],
				parent: currentRef,
			});
		}
	});

	const calculateSize = (node: Node): number => {
		let size = node.value.size;
		node.children.forEach((child) => {
			size += calculateSize(child);
		});
		node.value.size = size;
		return size;
	};

	calculateSize(directory);
	return directory;
};

const directory = parseDirectoryFromCommands(input);
console.log('directory', directory);

const traverse = (node: Node, sum: number): number => {
	if (node.value.size <= 100_000 && node.children.length > 0) {
		sum += node.value.size;
	}
	node.children.forEach((child) => {
		sum = traverse(child, sum);
	});
	return sum;
};

console.log('answer', traverse(directory, 0));
