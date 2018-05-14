export interface Employee {
    id: number;
    qualification: number;
};

export interface Application {
    supervisor: number;
    subordinate: number;
    cost: number;
};

interface Edge {
    from: number;
    to: number;
    weight: number;
}

interface Vertex {
    id: number;
    edges: Edge[];
}

export function solveProblem(employees: Employee[], applications: Application[]): number {
    const vertices: Vertex[] = employees
        .sort((lhs, rhs) => rhs.qualification - lhs.qualification)
        .map((e) => ({
            id: e.id,
            edges: [],
        }));

    const vertexHashmap: { [id: number]: Vertex } = {};
    vertices.forEach((v) => {
        vertexHashmap[v.id] = v;
    });
    applications.forEach((a) => {
        const e: Edge = { from: a.supervisor, to: a.subordinate, weight: a.cost };
        vertexHashmap[a.supervisor].edges.push(e);
    });

    let totalWeight = 0;

    const incomingEdges: { [vertexId: number]: Edge } = {};

    const reaminingVertices: Vertex[] = [vertices[0]];
    while (reaminingVertices.length > 0) {
        const currentVertex = reaminingVertices.shift()!;
        currentVertex.edges.forEach((e) => {
            if (incomingEdges[e.to]) {
                // replace the incoming edge with new one as shorter
                if (e.weight < incomingEdges[e.to].weight) {
                    totalWeight = totalWeight - incomingEdges[e.to].weight + e.weight;
                    incomingEdges[e.to] = e;
                }
            } else {
                incomingEdges[e.to] = e;
                totalWeight += e.weight;
            }

            reaminingVertices.push(vertexHashmap[e.to]);
        });
    }

    if(! vertices.slice(1).every((v) => (typeof incomingEdges[v.id] !== 'undefined'))) {
        return -1;
    }

    return totalWeight;
};