var JSZip = require("jszip");

module.exports = {
    generateZipFileFromTaskDescriptions,
};

async function generateZipFileFromTaskDescriptions(tasksDescriptionList) {

    const zip = new JSZip();

    for (let taskDescription of tasksDescriptionList) {
        const taskDescriptionFileName = generateTaskDescriptionFileName(taskDescription);
        zip.file(taskDescriptionFileName, JSON.stringify(taskDescription, null, '\t'));
    }

    return await zip.generateAsync({ type: "base64" });
}

function generateTaskDescriptionFileName(taskDescription) {
    const { group, name, version } = taskDescription;
    return `${String(group)}/${String(name)}-v-${String(version)}.json`;
}