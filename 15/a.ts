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

const getRanges = (reports: Report[], toRow: number): [number, number][] => {
  const ranges: [number, number][] = [];
  reports.forEach((r) => {
    const dy = Math.abs(toRow - r.S.y);
    const dx = r.D - dy;
    const range: [number, number] = [r.S.x - dx, r.S.x + dx];
    // console.log("row", r);
    // console.log("dy", dy, "dx", dx);
    // console.log("range", range);

    ranges.push(range);
  });

  return ranges;
};

const ranges = getRanges(reports, 2_000_000);
console.log("ranges", ranges);

const min = Math.min(...ranges.map((r) => r[0]));
const max = Math.max(...ranges.map((r) => r[1]));
console.log("min", min, "max", max);
console.log("answer", max - min);

