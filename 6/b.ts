import { packetMarker } from './a.ts';

export const x = '';
const input = await Deno.readTextFile('./input.txt');

console.log('answer', packetMarker(input, 14));
