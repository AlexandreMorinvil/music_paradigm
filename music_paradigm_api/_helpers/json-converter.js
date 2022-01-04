// Exports
module.exports = {
    makeJson,
};

async function makeJson(data) {
    try {
        // Transform the data to JSON format (Necessary for Mongoose documents)
        data = JSON.parse(JSON.stringify(data));
        return data;
    } catch (err) {
        throw err;
    }
}
