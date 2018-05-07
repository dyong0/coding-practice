export interface Edge {
    to: string;
    weight: number;
}

export interface Node {
    id: string;
    edges: Edge[];
    cost: number;
}

export interface Path {
    nodes: Node[];
    totalCost: number;
    totalWeight: number;
}

export function shortestAndCostless(startNodeId: string, endNodeId: string, budget: number, nodes: Node[]): Path | null {
    shortestPathCache = {};

    const nodeHashmap: any = {};
    for (let k in nodes) {
        nodeHashmap[nodes[k].id] = nodes[k];
    }

    const emptyPath = {
        nodes: [],
        totalCost: 0,
        totalWeight: 0,
    };

    return _shortestAndCostless(startNodeId, endNodeId, budget, emptyPath, nodeHashmap);
};

function _shortestAndCostless(currentNodeId: string, endNodeId: string, budget: number, currentPath: Path, nodes: { [key: string]: Node }): Path | null {
    const currentNode = nodes[currentNodeId];
    currentPath.nodes.push(currentNode);
    currentPath.totalCost += currentNode.cost;

    if (currentNodeId === endNodeId) {
        return currentPath;
    }

    const shortestPathFound = nodes[currentNodeId].edges
        .map((e) => {
            const nextNode = nodes[e.to];
            if (budget < nextNode.cost) {
                return null;
            }

            const nextPath = Object.assign({}, currentPath, {
                nodes: currentPath.nodes.slice(0)
            });
            nextPath.totalWeight += e.weight;

            if (hasCache(currentNode.id, nextNode.id, budget - nextNode.cost)) {
                return getCache(currentNode.id, nextNode.id, budget - nextNode.cost);
            } else {
                const pathFound = _shortestAndCostless(nextNode.id, endNodeId, budget - nextNode.cost, nextPath, nodes);
                setCache(currentNode.id, nextNode.id, budget - nextNode.cost, pathFound);

                return pathFound;
            }
        })
        .filter((p): p is Path => (p !== null))
        .filter((p) => p.nodes[p.nodes.length - 1].id === endNodeId)
        .sort((lhs, rhs) => {
            if (lhs.totalWeight === rhs.totalWeight) {
                return lhs.totalCost - rhs.totalCost;
            }

            return lhs.totalWeight - rhs.totalWeight;
        })[0];

    return shortestPathFound;
}

let shortestPathCache: { [start: string]: { [end: string]: { [budget: number]: Path | null } } } = {};
function hasCache(currentNodeId: string, nextNodeId: string, budget: number) {
    if (typeof shortestPathCache[currentNodeId] === 'undefined') {
        return false;
    }
    if (typeof shortestPathCache[currentNodeId][nextNodeId] === 'undefined') {
        return false;
    }
    if (typeof shortestPathCache[currentNodeId][nextNodeId][budget] === 'undefined') {
        return false;
    }

    return true;
}
function getCache(currentNodeId: string, nextNodeId: string, budget: number) {
    return shortestPathCache[currentNodeId][nextNodeId][budget];
}
function setCache(currentNodeId: string, nextNodeId: string, budget: number, path: Path | null) {
    shortestPathCache[currentNodeId] = shortestPathCache[currentNodeId] || {};
    shortestPathCache[currentNodeId][nextNodeId] = shortestPathCache[currentNodeId][nextNodeId] || {};

    shortestPathCache[currentNodeId][nextNodeId][budget] = path;
}