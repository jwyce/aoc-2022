export const x = "";
const input = (await Deno.readTextFile("./input.txt")).slice(1, -1);

type Point = {
  x: number;
  y: number;
};

type Report = {
  S: Point;
  B: Point;
  D: number;
};

const manhattanDistance = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const fullReport = (input: string): Report[] => {
  return input.split("\n").map((line) => {
    const [s, b] = line.split(":");
    const [sx, sy] = s.replace(/[^-,0-9]+/g, "").split(",").map(Number);
    const [bx, by] = b.replace(/[^-,0-9]+/g, "").split(",").map(Number);

    return {
      S: { x: sx, y: sy },
      B: { x: bx, y: by },
      D: manhattanDistance({ x: sx, y: sy }, { x: bx, y: by }),
    };
  });
};

const reports = fullReport(input);
console.log("reports", reports);

const getRangeForRow = (
  reports: Report[],
  toRow: number,
): [number, number][] => {
  const ranges: [number, number][] = [];
  reports.forEach((r) => {
    const dy = Math.abs(toRow - r.S.y);
    const dx = r.D - dy;
    if (dx > 0) {
      const range: [number, number] = [r.S.x - dx, r.S.x + dx];
      ranges.push(range);
    }
  });

  return ranges;
};

const MAX = 4_000_000;

const findBeacon = (): [number, number] | undefined => {
  for (let y = 0; y <= MAX; y++) {
    const range = getRangeForRow(reports, y).sort((a, b) => a[0] - b[0]);
    if (y % 100_000 === 0) {
      console.log("y", y, "range", range);
    }

    let x = 0;
    for (const r of range) {
      const [min, max] = r;
      if (x >= min && x <= max) {
        x = max + 1;
      }
    }

    const [min, max] = range[range.length - 1];
    if ((x < min || x > max) && x <= MAX) {
      return [x, y];
    }
  }
  return [0, 0];
};

const beacon = findBeacon();
console.log("beacon", beacon);
if (beacon) {
  console.log("answer", beacon[0] * 4_000_000 + beacon[1]);
}
