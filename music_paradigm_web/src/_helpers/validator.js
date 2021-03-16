/* eslint-disable max-lines-per-function */
export default {
	getMinimalValidExperimentStructure,
	validateExperiment,
	validateBlock,
	isExperimentValid,
};

function getMinimalValidExperimentStructure() {
	return {
		name: '',
		folder: '',
		flow: [
			{
				type: '',
			},
		],
	};
}

function isExperimentValid(experiment) {
	try {
		validateExperiment(experiment);
		return true;
	} catch (error) {
		return false;
	}
}

function validateExperiment(experiment) {
	// Verification of the validity of the experiment object type
	if (!(typeof experiment === 'object')) {
		throw new Error('The experiment is not defined within a JSON object');
	}

	// Verification of the name
	if (!Object.prototype.hasOwnProperty.call(experiment, 'name')) {
		throw new Error('The experiment does not have a name');
	}

	if (!(typeof experiment.name === 'string')) {
		throw new Error('The experiment name must be a string');
	}

	if (!(experiment.name.length > 0)) {
		throw new Error('The experiment name should not be empty');
	}

	// Verification of the folder
	if (!Object.prototype.hasOwnProperty.call(experiment, 'folder')) {
		throw new Error('The experiment does not have a folder');
	}

	if (!(typeof experiment.folder === 'string')) {
		throw new Error('The experiment folder name must be a string');
	}

	if (!(experiment.folder.length > 0)) {
		throw new Error('The experiment folder name should not be empty');
	}

	// Verification of the flow
	if (!Object.prototype.hasOwnProperty.call(experiment, 'flow')) {
		throw new Error('The experiment does not have a flow');
	}

	if (!Array.isArray(experiment.flow)) {
		throw new Error('The experiment flow must be an array');
	}

	if (!(experiment.flow.length > 0)) {
		throw new Error('The experiment flow must have at least one block');
	}

	// Verification of the attributes
	const allowedAttributes = [
		'flow',
		'variables',
		'group',
		'name',
		'version',
		'folder',
		'mode',
		'anyPianoKey',
		'enableSoundFlag',
		'footnote',
		'footnoteType',
		'timeLimitInSeconds',
		'logFlag',
		'successesForSkip',
		'hideFeedbackSmiley',
		'isSkipStepButtonInFootnote',
		'programmedOctaveOffset',
		'interactivePianoFirstOctave',
		'controlType',
		'isGoBackButtonInFootnote',
	];
	Object.keys(experiment).forEach((key) => {
		if (!allowedAttributes.includes(key)) throw new Error(`The key '${key}' of the general parameters is not allowed`);
		try {
			validateAttributeType(key, experiment[key]);
		} catch (e) {
			throw new Error(`${e.message} for the general parameters`);
		}
	});

	experiment.flow.forEach((element, index) => {
		validateBlock(element, index);
	});

	return true;
}

function validateBlock(block, index = null) {
	// Set the index message addon
	let indexMessage = '';
	if (typeof index === 'number') {
		indexMessage = ` number ${index + 1}`;
	}

	// Verification of the validity of the experiment object type
	if (!(typeof block === 'object')) {
		throw new Error(`The block${indexMessage} is not defined within a JSON object`);
	}

	// Verification of the type
	if (!Object.prototype.hasOwnProperty.call(block, 'type')) {
		throw new Error(`The block${indexMessage} does not have a type`);
	}

	if (!(typeof block.type === 'string')) {
		throw new Error(`The type of the block${indexMessage} name must be a string`);
	}

	const allowedTypes = ['cue', 'end', 'feedback', 'instruction', 'playing', 'rest', 'video'];
	if (!allowedTypes.includes(block.type)) {
		throw new Error(`The type '${block.type}' of the block${indexMessage} is not allowed`);
	}

	// Verification of the attributes
	const allowedAttributes = [
		'type',
		'textContent',
		'interactivePiano',
		'interactiveKeyboard',
		'interactiveKeyboardTextMapping',
		'pictureFileName',
		'helperImageFileName',
		'midiFileName',
		'videoFileName',
		'referenceKeyboardKeys',
		'numberRepetition',
		'followedBy',
		'anyPianoKey',
		'enableSoundFlag',
		'timeoutInSeconds',
		'playingMode',
		'footnote',
		'footnoteType',
		'logFlag',
		'hideFeedbackSmiley',
		'isInSkipableChain',
		'skipStepButton',
		'isSkipStepButtonInFootnote',
		'skipStepButtonMessage',
		'successFeedbackMessage',
		'failureFeedbackMessage',
		'footnoteMessage',
		'melodyRepetition',
		'successesForSkipLoop',
		'lastRepetitionVersion',
		'succeeededForSkipLoopVersion',
		'startSignal',
		'feedbackNumerical',
		'interactivePianoFirstOctave',
		'skipLoopOnLastRepetition',
		'canGoBack',
		'isGoBackButtonInFootnote',
		'goBackStepButton',
		'goBackButtonMessage',
		'checkpoint',
		'strictPlay',

		'resetVariableValue',
		'incrementVariable',
		'decrementVariable',
		'incrementVariableOnSucess',
		'decrementVariableOnSucces',
	];
	const innerBlockAttributes = ['lastRepetitionVersion', 'succeeededForSkipLoopVersion'];
	Object.keys(block).forEach((key) => {
		if (!allowedAttributes.includes(key)) throw new Error(`The key '${key}' of the block${indexMessage} is not allowed`);

		try {
			validateAttributeType(key, block[key]);
			if (innerBlockAttributes.includes(key)) validateBlock(block[key]);
		} catch (e) {
			throw new Error(`${e.message} for the block${indexMessage}`);
		}
	});

	return true;
}

function validateAttributeType(key, value) {
	switch (key) {
		// String
		case 'mode':
		case 'resetVariableValue':
		case 'incrementVariable':
		case 'decrementVariable':
		case 'incrementVariableOnSucess':
		case 'decrementVariableOnSucces':
		case 'type':
		case 'name':
		case 'folder':
		case 'footnoteType':
		case 'playingMode':
		case 'skipStepButton':
		case 'skipStepButtonMessage':
		case 'successFeedbackMessage':
		case 'failureFeedbackMessage':
		case 'footnoteMessage':
		case 'controlType':
		case 'goBackStepButton':
		case 'goBackButtonMessage':
		case 'checkpoint':
			if (!(typeof value === 'string')) {
				throw new Error(`The key '${key}' must be of type 'String'`);
			}
			break;

		// Number
		case 'numberRepetition':
		case 'timeoutInSeconds':
		case 'successesForSkipLoop':
		case 'melodyRepetition':
		case 'startSignal':
		case 'interactivePianoFirstOctave':
			if (!(typeof value === 'number')) {
				throw new Error(`The key '${key}' must be of type 'Number'`);
			}
			break;

		// Boolean
		case 'followedBy':
		case 'footnote':
		case 'anyPianoKey':
		case 'enableSoundFlag':
		case 'logFlag':
		case 'hideFeedbackSmiley':
		case 'skipStepButtonInFootnote':
		case 'feedbackNumerical':
		case 'skipLoopOnLastRepetition':
		case 'canGoBack':
		case 'isGoBackButtonInFootnote':
		case 'strictPlay':
			if (!(typeof value === 'boolean')) {
				throw new Error(`The key '${key}' must be of type 'Boolean'`);
			}
			break;

		// Object
		case 'lastRepetitionVersion':
		case 'succeeededForSkipLoopVersion':
		case 'interactiveKeyboardTextMapping':
			if (!(typeof value === 'object')) {
				throw new Error(`The key '${key}' must be of type 'Object'`);
			}
			break;

		// Array
		case 'textContent':
		case 'pictureFileName':
		case 'helperImageFileName':
		case 'videoFileName':
		case 'interactivePiano':
		case 'interactiveKeyboard':
		case 'midiFileName':
		case 'referenceKeyboardKeys':
			if (!Array.isArray(value)) {
				throw new Error(`The key '${key}' must be of type 'Array'`);
			}

			// Verification in the elments of the array
			switch (key) {
				// Arrays of String
				case 'helperImageFileName':
					value.forEach((element, index) => {
						if (!(typeof element === 'string')) {
							throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String'`);
						}
					});
					break;

				// Array of String or boolean OR array of array of string or boolean
				case 'interactivePiano':
				case 'interactiveKeyboard':
					value.forEach((element, index) => {
						if (!(typeof element === 'string' || typeof element === 'boolean' || Array.isArray(element))) {
							throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String' or boolean or array`);
						}

						const allowedEntries = ['all', 'midi', 'first'];
						if (typeof element === 'string' && !allowedEntries.includes(element)) {
							throw new Error(`The element number ${index + 1} in the array of the key '${key}' cannot have the value ${element}`);
						}

						if (Array.isArray(element)) {
							element.forEach((subElement, subIndex) => {
								if (!(typeof subElement === 'string' || typeof subElement === 'boolean')) {
									throw new Error(
										// eslint-disable-next-line prettier/prettier
										`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String' or boolean`,
									);
								}

								if (typeof subElement === 'string' && !allowedEntries.includes(subElement)) {
									throw new Error(
										// eslint-disable-next-line prettier/prettier
										`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' cannot have the value ${subElement}`,
									);
								}
							});
						}
					});
					break;

				// Array of String or array of array of strings
				case 'midiFileName':
				case 'pictureFileName':
				case 'textContent':
				case 'videoFileName':
					value.forEach((element, index) => {
						if (!(typeof element === 'string' || Array.isArray(element))) {
							throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String' or boolean`);
						}

						if (Array.isArray(element)) {
							element.forEach((subElement, subIndex) => {
								if (!(typeof subElement === 'string')) {
									throw new Error(
										// eslint-disable-next-line prettier/prettier
										`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String'`,
									);
								}
							});
						}
					});
					break;

				case 'referenceKeyboardKeys':
					value.forEach((element, index) => {
						if (!Array.isArray(element)) throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'Array`);
						element.forEach((subElement, subIndex) => {
							if (!(typeof subElement === 'string')) {
								throw new Error(
									// eslint-disable-next-line prettier/prettier
									`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String'`,
								);
							}
						});
					});
					break;

				default:
					break;
			}
			break;

		default:
			break;
	}

	return true;
}
