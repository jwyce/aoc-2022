export const x = "";
const input = (await Deno.readTextFile("./input.txt")).slice(0, -1);

type TunnelNode = {
  flowRate: number;
  valve: string;
  tunnels: string[];
  score: number;
};

const buildTunnelGraph = (input: string): TunnelNode[] => {
  return input.split("\n").map((line) => {
    const [valve, rate, tunnels] = line.replace("Valve ", "")
      .replace(" has flow rate=", "*")
      .replace(/; [a-z ]*/gm, "*").split("*");

    return {
      valve,
      flowRate: parseInt(rate),
      tunnels: tunnels.replace(/\s+/g, "").split(","),
      score: 0,
    };
  });
};

const tunnelGraph = buildTunnelGraph(input);
const valveMap = new Map<string, TunnelNode>();
tunnelGraph.forEach((t) => valveMap.set(t.valve, t));

const findShortestDistanceBFS = (startId: string, endId: string) => {
  const visited = new Set<string>(startId);
  const queue = [valveMap.get(startId)];

  while (queue.length) {
    const v = queue.shift()!;
    if (v.valve === endId) return v.score;
    for (const neighborId of v.tunnels) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        const neighbor = { ...valveMap.get(neighborId)! };
        neighbor.score = v.score + 1;
        queue.push(neighbor);
      }
    }
  }
  return -1;
};

const distanceMaps = new Map<string, Map<string, number>>();
for (const v of tunnelGraph) {
  const map = new Map<string, number>();
  for (const t of tunnelGraph) {
    if (v.valve !== t.valve) {
      map.set(t.valve, findShortestDistanceBFS(v.valve, t.valve));
    }
  }

  distanceMaps.set(v.valve, map);
}

const visit = (id: string, unexplored: string[]) => {
  const index = unexplored.indexOf(id);
  if (index > -1) unexplored.splice(index, 1);
  return unexplored;
};

const explore = (startdId = "AA", time: number) => {
  const unexplored = visit(
    startdId,
    tunnelGraph.filter((v) => v.flowRate > 0).map((m) => m.valve),
  );
  const all = [];
  const queue = [
    {
      ...valveMap.get(startdId)!,
      time,
      unexplored,
      path: [] as (string | number)[][],
    },
  ];

  while (queue.length) {
    const v = queue.shift()!;
    for (const neighborId of Array.from(distanceMaps.get(v.valve)!.keys())) {
      const dt = distanceMaps.get(v.valve)!.get(neighborId)!;
      const unexplored = [...v.unexplored];

      if (unexplored.includes(neighborId) && dt < v.time) {
        const neighbor = { ...valveMap.get(neighborId)! };
        if (v.time - dt > 0) {
          neighbor.score = v.score + neighbor.flowRate * (v.time - dt - 1);
        }

        const path = [...v.path, [neighborId, v.time - dt - 1]];
        all.push({
          path: path.map(([id]) => id).join("->"),
          score: neighbor.score,
        });
        queue.push({
          ...neighbor,
          time: v.time - dt - 1,
          unexplored: visit(neighborId, unexplored),
          path,
        });
      }
    }
  }
  const sorted = all.sort((a, b) => b.score - a.score);
  return [sorted[0].score, sorted[0].path, sorted];
};

console.log("graph", tunnelGraph);
console.log("map", distanceMaps);

const [answer, path] = explore("AA", 30);
console.log("answer", answer, path);
