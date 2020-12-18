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
        "helperImageFileName",
        "midiFileName",
        "videoFileName",
        "numberRepetition",
        "followedBy",
        "anyPianoKey",
        "enableSoundFlag",
        "timeoutInSeconds",
        "playingMode",
        "footnote",
        "footnoteType",
        "logFlag",
        "hideFeedbackSmiley",
        "isInSkipableChain",
        "skipStepButton",
        "isSkipStepButtonInFootnote",
        "skipStepButtonMessage",
        "successFeedbackMessage",
        "failureFeedbackMessage",
        "footnoteMessage",
        "melodyRepetition",
        "successesForSkipLoop",
        "lastRepetitionVersion",
        "startSignal",
        "feedbackNumerical",

        "resetVariableValue",
        "incrementVariable",
        "decrementVariable",
        "incrementVariableOnSucess",
        "decrementVariableOnSucces",
    ]
    const innerBlockAttributes = [
        "lastRepetitionVersion"
    ]
    Object.keys(block).forEach(key => {
        if (!(allowedAttributes.includes(key)))
            throw new Error(`The key '${key}' of the block${indexMessage} is not allowed`);

        try {
            validateAttributeType(key, block[key]);
            if (innerBlockAttributes.includes(key)) validateBlock(block[key]);
        } catch (e) {
            throw new Error(`${e.message} for the block${indexMessage}`);
        }
    });

    return true;
}

const validateAttributeType = function (key, value) {
    switch (key) {
        // String
        case "resetVariableValue":
        case "incrementVariable":
        case "decrementVariable":
        case "incrementVariableOnSucess":
        case "decrementVariableOnSucces":
        case "type":
        case "name":
        case "folder":
        case "footnoteType":
        case "playingMode":
        case "skipStepButton":
        case "skipStepButtonMessage":
        case "successFeedbackMessage":
        case "failureFeedbackMessage":
        case "footnoteMessage":
            if (!(typeof value === "string"))
                throw new Error(`The key '${key}' must be of type 'String'`);
            break;

        // Number
        case "numberRepetition":
        case "timeoutInSeconds":
        case "successesForSkipLoop":
        case "melodyRepetition":
        case "startSignal":
            if (!(typeof value === "number"))
                throw new Error(`The key '${key}' must be of type 'Number'`);
            break;

        // Boolean
        case "followedBy":
        case "footnote":
        case "anyPianoKey":
        case "enableSoundFlag":
        case "logFlag":
        case "hideFeedbackSmiley":
        case "skipStepButtonInFootnote":
        case "feedbackNumerical":
            if (!(typeof value === "boolean"))
                throw new Error(`The key '${key}' must be of type 'Boolean'`);
            break;

        // Object
        case "lastRepetitionVersion":
            if (!(typeof value === "object"))
                throw new Error(`The key '${key}' must be of type 'Object'`);
            break;

        // Array
        case "textContent":
        case "pictureFileName":
        case "helperImageFileName":
        case "videoFileName":
        case "interactivePiano":
        case "midiFileName":
            if (!(Array.isArray(value)))
                throw new Error(`The key '${key}' must be of type 'Array'`);

            // Verification in the elments of the array
            switch (key) {
                // Arrays of String
                case "helperImageFileName":
                    value.forEach((element, index) => {
                        if (!(typeof element === "string"))
                            throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String'`);
                    });
                    break;

                // Array of String or boolean OR array of array of string or boolean  
                case "interactivePiano":
                    value.forEach((element, index) => {
                        if (!(typeof element === "string" || typeof element === "boolean" || Array.isArray(element))) {
                            throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String' or boolean or array`);
                        }

                        const allowedEntries = ["midi", "first"]
                        if (typeof element === "string" && !allowedEntries.includes(element)) {
                            throw new Error(`The element number ${index + 1} in the array of the key '${key}' cannot have the value ${element}`);
                        }

                        if (Array.isArray(element))
                            element.forEach((subElement, subIndex) => {
                                if (!(typeof subElement === "string" || typeof subElement === "boolean")) {
                                    throw new Error(`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String' or boolean`);
                                }

                                if (typeof subElement === "string" && !allowedEntries.includes(subElement)) {
                                    throw new Error(`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' cannot have the value ${subElement}`);
                                }
                            });
                    });
                    break;

                // Array of String or array of array of strings
                case "midiFileName":
                case "pictureFileName":
                case "textContent":
                case "videoFileName":
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

        default: break
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