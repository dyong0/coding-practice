// http://codeforces.com/problemset/problem/958/C2

import { Cache, DimensionalCache } from './util/cache';

let cache: Cache<number>;

export function solveProblem(A: number[], k: number, p: number): number {
    cache = new DimensionalCache<number>([A.length + 1, A.length + 1, k]);

    return dp(0, A.length, k, p, A);
}

function dp(begin: number, end: number, subsequenceCount: number, divisor: number, sequence: number[]): number {
    if (begin === end - 1) {
        return sequence[begin] % divisor;
    }

    if (cache.exists([begin, end, subsequenceCount])) {
        return cache.get([begin, end, subsequenceCount]);
    }

    const leftMostSubsequenceEnd = end - subsequenceCount + 1;
    let max = 0;
    for (let i = begin; i < leftMostSubsequenceEnd; ++i) {
        // sum[begin, i]
        let totalSumModulo = (sequence.slice(begin, i + 1).reduce(((sum, v) => sum + v), 0)) % divisor;

        // add trailing dp if [i+1, end) exists
        if (i + 1 < end) {
            totalSumModulo += dp(i + 1, end, subsequenceCount - 1, divisor, sequence);
        }

        max = Math.max(max, totalSumModulo);
    }

    cache.set([begin, end, subsequenceCount], max);

    return max;
}