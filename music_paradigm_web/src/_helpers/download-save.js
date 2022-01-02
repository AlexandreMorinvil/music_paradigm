export default {
    saveCsv,
    saveJson,
};

function saveCsv(data, filename = 'file.json') {
    const dataString = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
    const downloadAnchorElemement = document.createElement('a');
    downloadAnchorElemement.setAttribute('href', dataString);
    downloadAnchorElemement.setAttribute('download', filename);
    downloadAnchorElemement.click();
}

function saveJson(data, filename = 'file.json') {

    let dataString = '';
    if (isJsonString(data)) dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
    else if (isJsonObject(data)) dataString = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, '\t'));
    else throw Error('The content to save as a JSON does not have a JSON format');

    const downloadAnchorElemement = document.createElement('a');
    downloadAnchorElemement.setAttribute('href', dataString);
    downloadAnchorElemement.setAttribute('download', filename);
    downloadAnchorElemement.click();
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isJsonObject(object) {
    try {
        JSON.stringify(object);
    } catch (e) {
        return false;
    }
    return true;
}
