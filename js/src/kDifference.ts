function naive(arr: number[], k: number): number {
    let count = 0;
    for (let i = 0; i < arr.length; ++i) {
        for (let j = i + 1; j < arr.length; ++j) {
            if (Math.abs(arr[i] - arr[j]) === k) {
                ++count;
            }
        }
    }

    return count;
}

function hashing(arr: number[], k: number): number {
    const hashmap: { [key: number]: number } = {};
    arr.forEach((v) => {
        const diff = v - k;
        hashmap[diff] = (hashmap[diff] !== undefined) ? hashmap[diff] + 1 : 1;
    });

    return arr.reduce((count, v) => count + (hashmap[v] || 0), 0);
}

function binaryTree(arr: number[], k: number): number {
    const sorted = arr.sort((lhs, rhs) => lhs - rhs);
    return arr.reduce((count, v) => {
        if(v - k < 0) {
            return count;
        }

        return binarySearch(sorted, v - k) ? count + 1 : count
    }, 0);
}
function binarySearch(sorted: number[], v: number): boolean {
    let begin = 0;
    let end = sorted.length;
    let lastAt = null;
    while (true) {
        const at = Math.floor((begin + end) / 2);
        if (at === lastAt || begin >= sorted.length || end < 0) {
            return false;
        }

        const current = sorted[at];
        if (current === v) {
            return true;
        } else if (current < v) {
            begin = at;
        } else {
            end = at;
        }

        lastAt = at;
    }
}

export const solveProblem = binaryTree;