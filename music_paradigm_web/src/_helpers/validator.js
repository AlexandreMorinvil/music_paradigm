const getMinimalValidExperimentStructure = function () {
    return {
        name: "",
        folder: "",
        flow: [
            {
                type: ""
            }
        ]
    }
}

const validateExperiment = function (experiment) {
    // Verification of the validity of the experiment object type
    if (!(typeof experiment === 'object'))
        throw new Error("The experiment is not defined within a JSON object");

    // Verification of the name
    if (!(experiment.hasOwnProperty('name')))
        throw new Error("The experiment does not have a name");

    if (!(typeof experiment.name === 'string'))
        throw new Error("The experiment name must be a string");

    if (!(experiment.name.length > 0))
        throw new Error("The experiment name should not be empty");

    // Verification of the folder
    if (!(experiment.hasOwnProperty('folder')))
        throw new Error("The experiment does not have a folder");

    if (!(typeof experiment.folder === 'string'))
        throw new Error("The experiment folder name must be a string");

    if (!(experiment.folder.length > 0))
        throw new Error("The experiment folder name should not be empty");


    // Verification of the flow
    if (!(experiment.hasOwnProperty('flow')))
        throw new Error("The experiment does not have a flow");

    if (!(Array.isArray(experiment.flow)))
        throw new Error("The experiment flow must be an array");

    if (!(experiment.flow.length > 0))
        throw new Error("The experiment flow must have at least one block");

    experiment.flow.forEach((element, index) => {
        validateBlock(element, index);
    });

    return true;
}

const validateBlock = function (block, index = null) {
    // Set the index message addon
    let indexMessage = ""
    if (typeof index === 'number') {
        indexMessage = ` number ${index + 1}`
    }

    // Verification of the validity of the experiment object type
    if (!(typeof block === 'object'))
        throw new Error(`The block${indexMessage} is not defined within a JSON object`);

    // Verification of the type
    if (!(block.hasOwnProperty('type')))
        throw new Error(`The block${indexMessage} does not have a type`);

    if (!(typeof block.type === 'string'))
        throw new Error(`The type of the block${indexMessage} name must be a string`);

    const allowedTypes = ["cue", "end", "feedback", "instruction", "playing", "rest", "video"];
    if (!(allowedTypes.includes(block.type)))
        throw new Error(`The type '${block.type}' of the block${indexMessage} is not allowed`);

    // Verification of the attributes
    const allowedAttributes = [
        "type",
        "textContent",
        "interactivePiano",
        "pictureFileName",
        "midiFileName",
        "videoFileName",
        "numberRepetition",
        "followedBy",
        "anyPianoKey",
        "enableSoundFlag",
        "timeoutInSeconds",
        "playingMode",
        "footnote",
        "logFlag",
        "successesForSkip"
    ]
    Object.keys(block).forEach(key => {
        if (!(allowedAttributes.includes(key)))
            throw new Error(`The key '${key}' of the block${indexMessage} is not allowed`);

        try {
            validateAttributeType(key, block[key]);
        } catch (e) {
            throw new Error(`${e.message} for the block${indexMessage}`);
        }
    });

    return true;
}

const validateAttributeType = function (key, value) {
    switch (key) {
        // String
        case "type":
        case "name":
        case "folder":
        case "playingMode":
            if (!(typeof value === "string"))
                throw new Error(`The key '${key}' must be of type 'String'`);
            break;

        // Number
        case "numberRepetition":
        case "timeoutInSeconds":
        case "successesForSkip":
            if (!(typeof value === "number"))
                throw new Error(`The key '${key}' must be of type 'Number'`);
            break;

        // Boolean
        case "followedBy":
        case "anyPianoKey":
        case "enableSoundFlag":
        case "footnote":
        case "logFlag":
            if (!(typeof value === "boolean"))
                throw new Error(`The key '${key}' must be of type 'Boolean'`);
            break;

        // Array
        case "textContent":
        case "pictureFileName":
        case "videoFileName":
        case "interactivePiano":
        case "midiFileName":
            if (!(Array.isArray(value)))
                throw new Error(`The key '${key}' must be of type 'Array'`);

            // Verification in the elments of the array
            switch (key) {
                // Arrays of String
                case "textContent":
                case "pictureFileName":
                case "videoFileName":
                    value.forEach((element, index) => {
                        if (!(typeof element === "string"))
                            throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String'`);
                    });
                    break;

                // Array of String or boolean    
                case "interactivePiano":
                    value.forEach((element, index) => {
                        if (!(typeof element === "string" || typeof element === "boolean")) {
                            throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String' or boolean`);
                        }

                        const allowedEntries = ["midi", "first"]
                        if (typeof element === "string" && !allowedEntries.includes(element)) {
                            throw new Error(`The element number ${index + 1} in the array of the key '${key}' cannot have the value ${element}`);
                        }
                    });
                    break;

                // Array of String or array of array of strings
                case "midiFileName":
                    value.forEach((element, index) => {
                        if (!(typeof element === "string" || Array.isArray(element))) {
                            throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String' or boolean`);
                        }

                        if (Array.isArray(element))
                            element.forEach((subElement, subIndex) => {
                                if (!(typeof subElement === "string"))
                                    throw new Error(`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String'`);
                            });
                    });
                    break;

                default: break;
            }
            break;

        default: throw new Error(`The attribut ${key} is not a recognized attribute`);
    }

    return true;
}

const isExperimentValid = function (experiment) {
    try {
        validateExperiment(experiment);
        return true;
    } catch (error) {
        return false;
    }
}
export default {
    getMinimalValidExperimentStructure,
    validateExperiment,
    validateBlock,
    isExperimentValid
}