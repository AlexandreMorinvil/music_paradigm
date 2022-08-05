export default {
    getIgnoredCellsCount,
    generateIgnoredCellsList,
};

function getIgnoredCellsCount(matrixUnusedCells, matrixDimensionX, matrixDimensionY) {
    const ignoredCellsList = generateIgnoredCellsList(matrixUnusedCells, matrixDimensionX, matrixDimensionY);
    return ignoredCellsList.length;
}

function generateIgnoredCellsList(matrixUnusedCells, matrixDimensionX, matrixDimensionY) {
    let ignoredIndexesList = [];

    // If nothing is specified, we return no ignored index.
    if (matrixUnusedCells === null) return [];
    // If the unused cells are specified by an array, the interpretation of all the objects of the array
    // provides the list of indexes to ignore.
    else if (Array.isArray(matrixUnusedCells)) {
        for (const unusedCellsObject of matrixUnusedCells)
            Array.prototype.push.apply(ignoredIndexesList, generateIgnoredIndexes(unusedCellsObject));
    }
    // If the unused cells are specified by an object, the interpretation of that object provides the list of
    // indexes to ignore.
    else if (typeof matrixUnusedCells === 'object')
        ignoredIndexesList = generateIgnoredIndexes(matrixUnusedCells, matrixDimensionX, matrixDimensionY);

    // Return the list of ignored indexes.
    return ignoredIndexesList;
}

function generateIgnoredIndexes(unusedCellsObject, matrixDimensionX, matrixDimensionY) {
    let ignoredIndexesFromObjectList = [];

    // Extract the coordonates.
    const { x, y } = unusedCellsObject;
    const logicalX = x - 1;
    const logicalY = y - 1;

    // Interpret the meaning of the coordinates :
    // If both coordonates are indicated, we ignore the cell it corresponds to.
    if (x && y) ignoredIndexesFromObjectList = [logicalY * matrixDimensionX + logicalX];
    // If only the x coordinate is indicated, we ignore the column it corresponds to.
    else if (x) {
        const rowIndexesRangeList = [...Array(matrixDimensionY).keys()];
        ignoredIndexesFromObjectList = rowIndexesRangeList.map((index) => {
            return index * matrixDimensionX + logicalX;
        });
    }
    // If only the y coordinate is indicated, we ignore the row it corresponds to.
    else if (y) {
        const rowIndexesRangeList = [...Array(matrixDimensionX).keys()];
        ignoredIndexesFromObjectList = rowIndexesRangeList.map((index) => {
            return index + logicalY * matrixDimensionX;
        });
    }

    return ignoredIndexesFromObjectList;
}
