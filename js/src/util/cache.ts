export interface Cache<T> {
    exists(keys: any[], testFn?: (cacheValue: T | null | undefined) => boolean): boolean;
    get(keys: any[]): T;
    set(keys: any[], value: T | null): void;
}

export class DimensionalCache<T> implements Cache<T> {
    private storage: any;

    public constructor(dimensions: number[], initialValue: T | null | undefined = undefined) {
        this.storage = {};
        this.initializeSpace(this.storage, dimensions, initialValue);
    }

    public exists(keys: any[], testFn?: (cacheValue: T | null | undefined) => boolean): boolean {
        const found = this.get(keys);
        if (testFn) {
            return testFn(found);
        }

        return typeof found !== 'undefined';
    }

    public get(keys: any[]): T {
        let current = this.storage;
        keys.forEach((k) => {
            current = current[k];
        });

        return current;
    }

    public set(keys: any[], value: T | null): void {
        let current = this.storage;
        keys.forEach((k) => {
            current = current[k];
        });

        current = value;
    }

    private initializeSpace(space: any, dimensions: number[], initialValue: T | null | undefined): void {
        if (dimensions.length === 0) {
            return;
        }

        const size = dimensions[0];
        if (dimensions.length === 1) {
            for (let i = 0; i < size; ++i) {
                space[i] = initialValue;
            }
        } else {
            for (let i = 0; i < size; ++i) {
                space[i] = {};
                this.initializeSpace(space[i], dimensions.slice(1), initialValue);
            }
        }
    }
}