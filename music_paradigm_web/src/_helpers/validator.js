/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
export default {
	getMinimalValidExperimentStructure,
	validateExperiment,
	validateBlock,
	isExperimentValid,
};

// Allowed values

/**
 * @constant ALLOWED_ENTRIES_INTERACTIVE_HELPERS
 * @type {Array<String>}
 * @description combinations of ['true', 'false', 'all', 'midi', 'first'] and ['', '#']
 * 				For example : 'true', 'true#', 'false', 'false#', 'all', 'all#', ...
 * 				These values are allowed for the attributes :
 * 				- interactivePiano
 * 				- interactiveKeyboard
 * */
const ALLOWED_ENTRIES_INTERACTIVE_HELPERS = ['true', 'false', 'all', 'midi', 'first'].flatMap((d) => ['', '#', '##'].map((v) => d + v));

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
		'timeUpState',
		'prelude',
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

		'relativeRhythmImportance',
		'rhythmErrorMarginInMilliseconds',
		'rhythmRelativeErrorMarginInFloat',

		'withProgressionBar',
		'logLabel',

		'cueWaitForClick',
		'instrument',
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

	if (experiment.prelude)
		experiment.prelude.forEach((element, index) => {
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

	const allowedTypes = ['cue', 'end', 'feedback', 'instruction', 'playing', 'rest', 'video', 'survey', 'writting'];
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
		'considerExperimentFinished',
		'skipIfNotMetSuccessGoal',
		'isInSkipIfNotMetSuccessGoalChain',

		'resetVariableValue',
		'incrementVariable',
		'decrementVariable',
		'incrementVariableOnSucess',
		'decrementVariableOnSucces',

		'logLabel',

		'surveyOptionsAreRadio',
		'surveyAreAnswersMandatory',
		'surveyInputOptionsValues',
		'surveyInputOptionsText',
		'surveyLeftSideText',
		'surveyRightSideText',

		'writtingMaxCharacters',
		'writtingMinCharacters',
		'writtingIsNumber',
		'writtingIsMultiline',
		'writtingTextPlaceHolder',

		'instrument',
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
		case 'logLabel':
		case 'writtingTextPlaceHolder':
		case 'instrument':
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
		case 'relativeRhythmImportance':
		case 'rhythmErrorMarginInMilliseconds':
		case 'rhythmRelativeErrorMarginInFloat':
		case 'skipIfNotMetSuccessGoal':
		case 'writtingMaxCharacters':
		case 'writtingMinCharacters':
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
		case 'withProgressionBar':
		case 'considerExperimentFinished':
		case 'cueWaitForClick':
		case 'isInSkipIfNotMetSuccessGoalChain':
		case 'surveyOptionsAreRadio':
		case 'surveyAreAnswersMandatory':
		case 'writtingIsNumber':
		case 'writtingIsMultiline':
			if (!(typeof value === 'boolean')) {
				throw new Error(`The key '${key}' must be of type 'Boolean'`);
			}
			break;

		// Object
		case 'timeUpState':
		case 'lastRepetitionVersion':
		case 'succeeededForSkipLoopVersion':
			if (!(typeof value === 'object') || Array.isArray(value)) {
				throw new Error(`The key '${key}' must be of type 'Object'`);
			}
			break;

		// Array elements or elements taken out of their array
		case 'interactiveKeyboardTextMapping':
		case 'textContent':
		case 'pictureFileName':
		case 'helperImageFileName':
		case 'videoFileName':
		case 'interactivePiano':
		case 'interactiveKeyboard':
		case 'midiFileName':
		case 'referenceKeyboardKeys':
			// Elements of the array
			if (!Array.isArray(value)) {
				switch (key) {
					case 'interactiveKeyboardTextMapping':
						throw new Error(`The key '${key}' must be of type 'Array'`);

					case 'textContent':
					case 'pictureFileName':
					case 'helperImageFileName':
					case 'videoFileName':
					case 'midiFileName':
						if (!(typeof value === 'string')) {
							throw new Error(`The key '${key}' must be of type 'String' or 'Array'`);
						}
						break;

					case 'interactivePiano':
					case 'interactiveKeyboard':
						if (!(typeof value === 'string' || typeof value === 'boolean')) {
							throw new Error(`The key '${key}' must be of type 'String', 'Boolean' or 'Array'`);
						}

						if (!ALLOWED_ENTRIES_INTERACTIVE_HELPERS.includes(value)) {
							throw new Error(`The key '${key}' cannot have the value '${value}'`);
						}
						break;

					default:
						break;
				}
			}

			// Verification in the elments of the array
			else {
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

							if (typeof element === 'string' && !ALLOWED_ENTRIES_INTERACTIVE_HELPERS.includes(element)) {
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

									if (typeof subElement === 'string' && !ALLOWED_ENTRIES_INTERACTIVE_HELPERS.includes(subElement)) {
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
						// Verifying whether the array contains subarrays (of type array) or keys (of type number or character)
						// In the case of sub arrays
						if (Array.isArray(value[0]))
							value.forEach((element, index) => {
								if (!Array.isArray(element))
									throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'Array`);

								element.forEach((subElement, subIndex) => {
									if (!(typeof subElement === 'string')) {
										throw new Error(
											// eslint-disable-next-line prettier/prettier
											`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String'`,
										);
									}
								});
							});
						// In the case of keys indicated directly in the array
						else if (typeof value[0] === 'string')
							value.forEach((element, index) => {
								if (!(typeof element === 'string'))
									throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String'`);
							});
						// Otherwise, the types are incorrect
						else
							throw new Error(
								`The elements in the array of the key '${key}' must all be of the type 'String' or they must all be of the type 'Array'`,
							);
						break;

					default:
						break;
				}
			}

			break;

		// Array
		case 'prelude':
		case 'surveyInputOptionsValues':
		case 'surveyInputOptionsText':
		case 'surveyLeftSideText':
		case 'surveyRightSideText':
			if (!Array.isArray(value)) {
				throw new Error(`The key '${key}' must be of type 'Array'`);
			}
			break;

		default:
			break;
	}

	return true;
}
