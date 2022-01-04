const { Parser } = require('json2csv');

// Exports
module.exports = {
    makeCsv,
};

const opts = { header: true };

async function makeCsv(data) {
    try {
        // Transform the data to JSON format (Necessary for Mongoose documents)
        data = JSON.parse(JSON.stringify(data));

        // Generate csv file
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        return csv;
    } catch (err) {
        throw err;
    }
}
