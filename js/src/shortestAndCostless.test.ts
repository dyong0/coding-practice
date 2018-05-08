import * as chai from 'chai';
const { expect } = chai;

import { Node, shortestAndCostless } from './shortestAndCostless';

describe('shortestAndCostless', () => {
    it('returns the nodes composing the shortest path', () => {
        // different weights with same costs
        // 1 -> 2 -> 3 has the least weight
        const nodes: Node[] = [
            {
                id: '1',
                edges: [
                    { to: '2', weight: 1 },
                    { to: '3', weight: 10 },
                    { to: '4', weight: 4 }
                ],
                cost: 0,
            },
            {
                id: '2',
                edges: [
                    { to: '3', weight: 2 }
                ],
                cost: 0,
            },
            {
                id: '3',
                edges: [],
                cost: 0
            },
            {
                id: '4',
                edges: [
                    { to: '2', weight: 1 },
                    { to: '3', weight: 10 }
                ],
                cost: 0
            },
        ];


        const pathFound = shortestAndCostless('1', '3', 10, nodes);
        expect(pathFound).to.deep.eq({
            nodes: nodes.slice(0, 3),
            totalCost: 0,
            totalWeight: 3
        });
    });

    it('returns the nodes composing the shortest path with the least cost', () => {
        // same weight but different costs
        // 1 -> 2 -> 3
        // 1 -> 4 -> 3
        const nodes: Node[] = [
            {
                id: '1',
                edges: [
                    { to: '2', weight: 5 },
                    { to: '3', weight: 1000 }, //direct but super far
                    { to: '4', weight: 1 }
                ],
                cost: 1,
            },
            {
                id: '2',
                edges: [
                    { to: '3', weight: 5 }
                ],
                cost: 20,
            },
            {
                id: '3',
                edges: [],
                cost: 3
            },
            {
                id: '4',
                edges: [
                    { to: '3', weight: 9 }
                ],
                cost: 4
            },
        ];


        const pathFound = shortestAndCostless('1', '3', 40, nodes);
        expect(pathFound).to.deep.eq({
            nodes: [nodes[0], nodes[3], nodes[2]],
            totalCost: 8,
            totalWeight: 10
        });
    });

    it('uses cached path', () => {
        // same weight but different costs
        // 1 -> 5(costs 1) -> 2            3 -> 7
        // 1 -> 4(costs 1) -> 2 ->(cached) 3 -> 6 -> 7
        const nodes: Node[] = [
            {
                id: '1',
                edges: [
                    { to: '5', weight: 1 },
                    { to: '4', weight: 1 },
                ],
                cost: 1,
            },
            {
                id: '2',
                edges: [
                    { to: '3', weight: 5 }
                ],
                cost: 5,
            },
            {
                id: '3',
                edges: [
                    { to: '6', weight: 6 },
                    { to: '7', weight: 6 },
                ],
                cost: 3
            },
            {
                id: '4',
                edges: [
                    { to: '2', weight: 11 }
                ],
                cost: 1
            },
            {
                id: '5',
                edges: [
                    { to: '2', weight: 11 }
                ],
                cost: 1
            },
            {
                id: '6',
                edges: [
                    { to: '7', weight: 5 }
                ],
                cost: 1
            },
            {
                id: '7',
                edges: [],
                cost: 1
            },
        ];

        const pathFound = shortestAndCostless('1', '7', 40, nodes);
    });
})