/* eslint-disable no-magic-numbers */
export default {
    generateReproduciblePermutedIndexList,
    generateReproduciblePermutedFittedIndexList,
};

/**
 * Generate a list of permuted indexes with an order reproductible with a given seed.
 * If the result size is larger than the range, additional number will be added to fit the fit the 
 * result size, while minimizing repetition.
 * If the result size is smaller than the range, fewer number will be included in the range, and 
 */
function generateReproduciblePermutedFittedIndexList(
    range,
    resultSize,
    reproductionSeed = null,
    excludedIndexesList = []
) {

    // Generate a range array with all the indexes of the parameter array.
    const randomList = [];
    let incrementingReproductionSeed = reproductionSeed;

    // TODO: Add a verification to make sure the excludedIndexesList does not include all possible valies of the range.
    // Add randomly picked numbers to the random list for as long as its number of elements is lower then the 
    // number of elements desired.
    while (randomList.length < resultSize) {
        let randomRangeBatch = generateReproduciblePermutedIndexList(range, incrementingReproductionSeed);
        randomRangeBatch = randomRangeBatch.filter(function (value) {
            return !excludedIndexesList.includes(value);
        });

        Array.prototype.push.apply(randomList, randomRangeBatch);

        // If there is a reproduction seed, we increment it. If there was none, we leave it to its empty state.
        if (reproductionSeed) incrementingReproductionSeed += 1;
    }

    // Return the list containing the expected number of elements.
    return randomList.splice(0, resultSize);
}


/**
 * Generate a list of permuted indexes with an order reproductible with a given seed.
 */
function generateReproduciblePermutedIndexList(range, reproductionSeed = null) {

    // Initialize the random key.
    const hash32 = initializePseudoRandomNumberGenration(reproductionSeed);

    // Determine how many random numbers must be generated.
    const numberCount = interpretRange(range);

    // Generate a range array with all the indexes of the parameter array.
    const orderedRange = [...Array(numberCount).keys()];
    const randomRange = [];

    // Transfer all indexes from the orderedRange array to randomRange array.
    const generateRandomNumber = mulberry32(hash32);
    while (orderedRange.length > 0) {
        const randomOrderedRangePosition = Math.round(generateRandomNumber() * orderedRange.length);
        Array.prototype.push.apply(
            randomRange,
            orderedRange.splice(randomOrderedRangePosition, 1)
        );
    }

    return randomRange;
}

// Private functions

/**
 * Cyrb128 hash fucntion.
 * This function is used to generate random keys that can be used by the
 * random number generator.
 */
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

/**
 * Mulberry32 random number generator.
 */
function mulberry32(a) {
    return function () {
        a += 0x6D2B79F5;
        let t = a;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

/**
 * Initialize pseudo random number generation.
 */
function initializePseudoRandomNumberGenration(seed = null) {
    const reproductionSeed = seed ? String(seed) : String(Math.random());
    return cyrb128(reproductionSeed)[0];
}

function interpretRange(range) {
    // Determine how many random numbers must be permutated.
    if (Array.isArray(range)) return range.length;
    else if (typeof range === 'number') return range;
    return 0;
}
