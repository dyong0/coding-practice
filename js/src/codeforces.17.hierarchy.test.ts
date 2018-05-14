import * as chai from 'chai';
import { Application, Employee, solveProblem } from './codeforces.17.hierarchy';
const { expect } = chai;


describe('solveProblem', () => {
    it('returns the minimum cost of building a hierarchy based on the applications', () => {
        const employees: Employee[] = [
            { id: 1, qualification: 7 },
            { id: 2, qualification: 2 },
            { id: 3, qualification: 3 },
            { id: 4, qualification: 1 },
        ];
        const applications: Application[] = [
            { supervisor: 1, subordinate: 2, cost: 5 },
            { supervisor: 2, subordinate: 4, cost: 1 },
            { supervisor: 3, subordinate: 4, cost: 1 },
            { supervisor: 1, subordinate: 3, cost: 5 },
        ];

        expect(solveProblem(employees, applications)).to.eq(11);
    });

    it('returns the minimum cost of building a hierarchy based on the applications', () => {
        const employees: Employee[] = [
            { id: 1, qualification: 1 },
            { id: 2, qualification: 2 },
            { id: 3, qualification: 3 },
        ];
        const applications: Application[] = [
            { supervisor: 3, subordinate: 1, cost: 2 },
            { supervisor: 3, subordinate: 1, cost: 3 },
        ];

        expect(solveProblem(employees, applications)).to.eq(-1);
    });
});