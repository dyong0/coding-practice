export function solveProblem(A: number[]): number[] {
    if (A.length === 2) {
        if ((A[1] / 3) === A[0] || ((A[1] * 2) === A[0])) {
            return A.slice(0).reverse();
        }

        return A;
    }

    return selectionSort2Way(A.slice(0), (left, right) => {
        if (((left / 3) === right) || ((left * 2) === right)) {
            return -1;
        } else if (((right / 3) === left) || ((right * 2) === left)) {
            return 1;
        }

        return 0;
    });
}

function selectionSort2Way(unorderedArray: number[], comparator: (left: number, right: number) => number): number[] {
    // pick the left most and right most candidate elements
    let leftMost = unorderedArray[0];
    let rightMost = unorderedArray[0];
    for (let i = 1; i < unorderedArray.length; ++i) {
        if (comparator(leftMost, unorderedArray[i]) < 0) {
            rightMost = unorderedArray[i];
            break;
        } else if (comparator(unorderedArray[i], rightMost) > 0) {
            leftMost = unorderedArray[i];
            break;
        }
    }

    // place [..., leftMost, rightMost, ...]
    const ordered = new Array(unorderedArray.length * 2);
    let leftMostAt = unorderedArray.length - 1;
    let rightMostAt = unorderedArray.length;
    ordered[leftMostAt] = leftMost;
    ordered[rightMostAt] = rightMost;

    // fill the next left most element in the left way
    while (true) {
        let foundNextElement = false;

        for (let i = 1; i < unorderedArray.length; ++i) {
            if (comparator(unorderedArray[i], leftMost) < 0) {
                leftMost = unorderedArray[i];
                leftMostAt--;
                ordered[leftMostAt] = leftMost;

                foundNextElement = true;
                break;
            }
        }

        if (!foundNextElement) {
            break;
        }
    }

    // fill the next right most element in the right way
    while (true) {
        let foundNextElement = false;

        for (let i = 1; i < unorderedArray.length; ++i) {
            if (comparator(rightMost, unorderedArray[i]) < 0) {
                rightMost = unorderedArray[i];
                rightMostAt++;
                ordered[rightMostAt] = rightMost;

                foundNextElement = true;
                break;
            }
        }

        if (!foundNextElement) {
            break;
        }
    }

    return ordered.filter((v) => !Number.isNaN(v));
}