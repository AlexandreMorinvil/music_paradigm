const { parse } = require('csv-parse/sync');

// Exports
module.exports = {
    getColumnsNameListFromCsv,
    parseCsvToJson,
};

function determineDelimiter(csvFileContent) {
    const possibleDelimitersList = [',', ';'];
    let highestNumberOfColumnsForDelimiter = 0;
    let delimiterFound = possibleDelimitersList[0];

    for (let delimiter of possibleDelimitersList) {
        // If the parsing generated an error with a given delimiter, this delimiter is discarded.
        try {
            const [columnsNamesList, ...restOfFile] = parse(csvFileContent, {
                columns: false,
                delimiter: delimiter,
                skip_empty_lines: true,
            });
            // The delimiter that generates more columns is selected.
            const columnsCount = columnsNamesList.length;
            if (columnsCount > highestNumberOfColumnsForDelimiter) {
                delimiterFound = delimiter;
                highestNumberOfColumnsForDelimiter = columnsCount;
            }
        } catch { }
    }
    return delimiterFound;
}

function getColumnsNameListFromCsv(csvFileContent) {
    const [columnsNameList, ...restOfFile] = parse(csvFileContent, {
        columns: false,
        delimiter: determineDelimiter(csvFileContent),
    });
    return columnsNameList;
}

function parseCsvToJson(csvFileContent) {
    const json = parse(csvFileContent, {
        columns: true,
        delimiter: determineDelimiter(csvFileContent),
        skip_empty_lines: true,
    });
    return json;
}