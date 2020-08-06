const validateExperiment = function (experiment) {
    // Verification of the validity of the experiment object type
    if (!(typeof experiment === 'object'))
        throw "The experiment is not defined within a JSON object";

    // Verification of the name
    if (!(experiment.hasOwnProperty('name')))
        throw "The experiment does not have a name"

    if (!(typeof experiment.name === 'string'))
        throw "The experiment name must be a string";

    if (!(experiment.name.length > 0))
        throw "The experiment name should not be empty"

    // Verification of the folder
    if (!(experiment.hasOwnProperty('folder')))
        throw "The experiment does not have a folder"

    if (!(typeof experiment.folder === 'string'))
        throw "The experiment folder name must be a string";

    if (!(experiment.folder.length > 0))
        throw "The experiment folder name should not be empty"


    // Verification of the flow
    if (!(experiment.hasOwnProperty('flow')))
        throw "The experiment does not have a flow"

    if (!(Array.isArray(experiment.flow)))
        throw "The experiment flow must be an array";

    if (!(experiment.flow.length > 0))
        throw "The experiment flow must have at least one block"

    experiment.flow.array.forEach(element => {
        validateBlock(element);
    });

    return true;
}

const validateBlock = function (block, index = null) {
    // Set the index message addon
    let indexMessage = ""
    if (index !== null) {
        indexMessage = `number ${index + 1} `
    }

    // Verification of the validity of the experiment object type
    if (!(typeof block === 'object'))
        throw `The block ${indexMessage}is not defined within a JSON object`;

    // Verification of the type
    if (!(block.hasOwnProperty('type')))
        throw `The block ${indexMessage}does not have a type`

    if (!(typeof block.type === 'string'))
        throw `The type of the block ${indexMessage}name must be a string`;

    var allowedTypes = ["cue", "end", "feedback", "instruction", "playing", "rest", "video"];
    if (!(allowedTypes.includes(block.type)))
        throw `The tyoe of the block ${indexMessage}is not allowed`;

    return true;
}

export default {
    validateExperiment,
    validateBlock
}