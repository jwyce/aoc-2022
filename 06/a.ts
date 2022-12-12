export const x = '';
const input = await Deno.readTextFile('./input.txt');

export const packetMarker = (input: string, size: number) => {
	for (let i = 0; i <= input.length - size; i++) {
		const window = input.slice(i, i + size);

		const unique = new Set(window).size === window.length;
		if (unique) {
			return i + size;
		}
	}
};

console.log('answer', packetMarker(input, 4));
