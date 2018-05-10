// https://www.hackerearth.com/ja/practice/algorithms/graphs/breadth-first-search/practice-problems/algorithm/traffic-light-2-ee27ba45/

export type Edge = [number, number];

interface Vertex {
    id: number;
    adjacents: number[];
}

type VertexHash = { [id: number]: Vertex };

export function solveProblem(edges: Edge[], start: number, dest: number): number[] {
    const vertices = verticesFromEdges(edges);
    const path = bfsPath(vertices, start, dest);

    return path.slice(1);
}

function verticesFromEdges(edges: Edge[]): VertexHash {
    const vertices: VertexHash = {};
    edges.forEach((e) => {
        const v1 = e[0];
        const v2 = e[1];

        if (!vertices[v1]) {
            vertices[v1] = {
                id: v1,
                adjacents: [],
            }
        };

        if (!vertices[v2]) {
            vertices[v2] = {
                id: v2,
                adjacents: [],
            }
        };

        vertices[v1].adjacents.push(v2);
        vertices[v2].adjacents.push(v1);
    });

    return vertices;
}

function bfsPath(vertices: VertexHash, start: number, dest: number): number[] {
    let searchQueue: Vertex[] = [vertices[start]];
    const pred: { [v: number]: number } = {};


    let destFound = false;
    while ((!destFound) && searchQueue.length > 0) {
        const currentVertex = searchQueue.shift()!;

        for(let i=0; i < currentVertex.adjacents.length; ++i) {
            const adj = currentVertex.adjacents[i];

            // allow only the first visit
            if(!pred[adj]) {
                pred[adj] = currentVertex.id;
            }

            destFound = destFound || (adj === dest);
        }

        searchQueue = searchQueue.concat(currentVertex.adjacents.map((adj) => vertices[adj]));
    }

    if(!destFound) {
        return [];
    }

    const path: number[] = [dest];
    let currentPred = dest;
    while (currentPred !== start) {
        path.push(pred[currentPred]);

        currentPred = pred[currentPred];
    }

    return path.reverse();
}