export default {
    saveCsv,
    saveJson,
    saveZip,
};

function saveCsv(data, filename = 'file.json') {
    const dataUrl = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
    const downloadAnchorElement = document.createElement('a');
    downloadAnchorElement.setAttribute('href', dataUrl);
    downloadAnchorElement.setAttribute('download', filename);
    downloadAnchorElement.click();
}

function saveJson(data, filename = 'file.json') {

    let dataUrl = '';
    if (isJsonString(data)) dataUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
    else if (isJsonObject(data)) dataUrl = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, '\t'));
    else throw Error('The content to save as a JSON does not have a JSON format');

    const downloadAnchorElement = document.createElement('a');
    downloadAnchorElement.setAttribute('href', dataUrl);
    downloadAnchorElement.setAttribute('download', filename);
    downloadAnchorElement.click();
}

async function saveZip(dataBase64, filename = 'file.zip') {
    const dataUrl = 'data:application/zip;base64,' + dataBase64;
    const downloadAnchorElement = document.createElement('a');
    downloadAnchorElement.setAttribute('href', dataUrl);
    downloadAnchorElement.setAttribute('download', filename);
    downloadAnchorElement.click();
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
