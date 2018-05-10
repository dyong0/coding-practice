// http://codeforces.com/problemset/problem/954/E

interface WaterTap {
    maxFluidSpeed: number;
    temperature: number;
}

const REPRESENTATIONAL_PRECISION = 6;
const COMPUTING_PRECISION = REPRESENTATIONAL_PRECISION + 2;

export function solveProblem(t: number, A: number[], T: number[]): number {
    const targetTemperature = t;
    const taps = A.map((s, i): WaterTap => ({
        maxFluidSpeed: s * Math.pow(10, COMPUTING_PRECISION),
        temperature: T[i],
    })).sort((lhs, rhs) => {
        return Math.abs(targetTemperature - lhs.temperature) - Math.abs(targetTemperature - rhs.temperature);
    });

    // all above or all below the target temperature
    if (taps.every((t) => t.temperature < targetTemperature)
        || taps.every((t) => t.temperature > targetTemperature)) {
        return 0;
    }

    // all same as the target temperature
    if (taps.every((t) => t.temperature === targetTemperature)) {
        return taps.reduce((sum, t) => (sum + t.maxFluidSpeed), 0);
    }

    return fluidSpeedOfTapsWithTotalTemperature(targetTemperature, taps);
}

function fluidSpeedOfTapsWithTotalTemperature(targetTemperature: number, taps: WaterTap[]): number {
    // always above the target temperature at this momenet
    let currentFluidSpeeds = taps.map((t) => t.maxFluidSpeed);
    let currentTemperature = totalTemperature(currentFluidSpeeds, taps);

    if (currentTemperature === targetTemperature) {
        return totalFluidSpeed(currentFluidSpeeds) / Math.pow(10, COMPUTING_PRECISION);
    }

    let currentTapAt = 0;
    let reducingAmount = Math.pow(10, COMPUTING_PRECISION);
    let iteration = 0;
    while (true) {
        ++iteration;
        // if no perfect solution exists
        if (currentTapAt >= taps.length) {
            return 0;
        }

        // if the current temperature is above the target
        // - pick the next most impactive tap if the current tap is on 0 speed
        // - reduce the current tap's fluid speed
        let newFluidSpeeds: number[] = [];
        if (currentTemperature > targetTemperature) {
            if (currentFluidSpeeds[currentTapAt] === 0) {
                currentTapAt++;
                reducingAmount = Math.pow(10, COMPUTING_PRECISION);
                continue;
            }

            newFluidSpeeds = currentFluidSpeeds.slice(0);
            newFluidSpeeds[currentTapAt] -= reducingAmount;
        }

        const newTemperature = totalTemperature(newFluidSpeeds, taps);

        // return total fluid speeds, because the current temperature is same as the target
        if (newTemperature.toFixed(REPRESENTATIONAL_PRECISION) === targetTemperature.toFixed(REPRESENTATIONAL_PRECISION)) {
            return Math.round(totalFluidSpeed(newFluidSpeeds) / Math.pow(10, COMPUTING_PRECISION - REPRESENTATIONAL_PRECISION)) / Math.pow(10, REPRESENTATIONAL_PRECISION);
        }

        // keep the current tap's speed if the current temperature got closer to the target
        if ((newTemperature > targetTemperature)
            && (newTemperature - targetTemperature) < (currentTemperature - targetTemperature)) {
            currentFluidSpeeds = newFluidSpeeds;
            currentTemperature = newTemperature;
        } else {
            // otherwise reduce the amount of reducement if the amount still can be reduced
            if (reducingAmount > 1) {
                reducingAmount /= 10;
            } else {
                // pick the next most impactive tap if the amount reducing is at the minimum
                currentTapAt++;
                reducingAmount = Math.pow(10, COMPUTING_PRECISION);
            }
        }
    }
}

function totalTemperature(fluidSpeeds: number[], taps: WaterTap[]): number {
    return taps.reduce((total, t, i) => (total + (fluidSpeeds[i] * t.temperature)), 0) / totalFluidSpeed(fluidSpeeds);
}

function totalFluidSpeed(fluidSpeeds: number[]): number {
    return fluidSpeeds.reduce((total, s) => (total + s), 0);
}