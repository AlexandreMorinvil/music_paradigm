export default {
    compareForDefaultSort,
};

function compareForDefaultSort(valueA, valueB) {
    if (Array.isArray(valueA) || Array.isArray(valueB))
        return compareArrayForDefaultSort([valueA].flat(), [valueB].flat());
    else
        return compareValueForDefaultSort(valueA, valueB);
}

function compareArrayForDefaultSort(arrayA = [], arrayB = []) {
    const largerMaxIndex = Math.max(arrayA.length, arrayB.length);
    for (let index = 0; index < largerMaxIndex; index++) {
        const comparisonResult = compareValueForDefaultSort(arrayA[index], arrayB[index]);
        if (comparisonResult !== 0) return comparisonResult;
    }
    return 0;
}

function compareValueForDefaultSort(valueA = null, valueB = null) {
    switch (typeof valueA) {
        case 'string': return compareString(valueA, valueB);
        case 'number': return compareNumber(valueA, valueB);
        default: return compareGenericValue(valueA, valueB);
    }
}

function compareNumber(numberA, numberB) {
    return (numberA - numberB) || 0;
}

function compareString(stringA, stringB) {
    return stringA.localeCompare(stringB);
}

function compareGenericValue(valueA = null, valueB = null) {
    if (valueA < valueB) return -1;
    else if (valueA > valueB) return 1;
    else return 0;
}