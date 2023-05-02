// Exports
module.exports = {
    makeJson,
};

async function makeJson(data) {
    // Transform the data to JSON format (Necessary for Mongoose documents)
    data = JSON.parse(JSON.stringify(data));
    return data;
}
