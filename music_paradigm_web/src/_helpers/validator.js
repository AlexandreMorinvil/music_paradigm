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
 * @description combinations of ['half-', ''] and ['true', 'false', 'all', 'midi', 'first'] and ['', '#']
 * 				For example : 'true', 'true#', 'false', 'false#', 'all', 'all#', ...
 * 				These values are allowed for the attributes :
 * 				- interactivePiano
 * 				- interactiveKeyboard
 * */
const ALLOWED_ENTRIES_INTERACTIVE_HELPERS = ['half-', ''].flatMap((c) => {
	const b = ['true', 'false', 'all', 'midi', 'first']
		.flatMap((d) => ['', '#', '##'].map((v) => d + v));
	return b.map((v) => c + v);
});


/**
 * @constant ALLOWED_STATE_TYPES
 * @type {Array<String>}
 * @description Allowed values for the 'type' attributes of the flow descriptions
 * */
const ALLOWED_STATE_TYPES = [
	'cue',
	'end',
	'feedback',
	'glt',
	'instruction',
	'playing',
	'pvt',
	'question',
	'rest',
	'survey',
	'video',
	'writting',
];

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
		'withTimer',
		'hasClearBackground',
		'timeUpState',
		'flowPrelude',
		'flowConclusion',
		'flow',
		'variables',
		'variablesSchedules',
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
		'timeLeftMessages',
		'logFlag',
		'successesForSkip',
		'hideFeedbackSmiley',
		'isSkipStepButtonInFootnote',
		'isSkipButtonInMainOptions',
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
		'hasSound',
		'hasNavigationBar',
		'hasStatusBar',
		'isFullScreen',

		'keyboardToMidiInputMapping',

		'reproductionSeed',
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

	if (experiment.flowPrelude)
		experiment.flowPrelude.forEach((element, index) => {
			validateBlock(element, index);
		});

	if (experiment.flowConclusion)
		experiment.flowConclusion.forEach((element, index) => {
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

	if (!ALLOWED_STATE_TYPES.includes(block.type)) {
		throw new Error(`The type '${block.type}' of the block${indexMessage} is not allowed`);
	}

	// Verification of the attributes
	const allowedAttributes = [
		'type',
		'textContent',
		'interactivePiano',
		'interactiveClicker',
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
		'isSkipButtonInMainOptions',

		'mainOptionText',

		'resetVariableValue',
		'incrementVariable',
		'decrementVariable',
		'incrementVariableOnSucess',
		'decrementVariableOnSucces',

		'logLabel',

		'surveyType',
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
		'hasNavigationBar',
		'hasStatusBar',
		'isFullScreen',

		'questionType',
		'audioFirst',
		'audioSecond',
		'textAfterQuestionAsked',
		'textSpecification',
		'textReminder',
		'areAnswerOptionsVertical',

		'answerChoicesValue',
		'answerChoicesText',
		'answerChoicesImage',
		'answerChoicesColor',
		'areInactiveAnswersDisplayed',

		'rightAnswers',

		'pvtMinTime',
		'pvtMaxTime',
		'pvtCount',
		'pvtTooEarlyMessage',
		'pvtHasCentralElement',

		'matrixSizeX',
		'matrixSizeY',
		'matrixUsedCellsCount',
		'presentationTime',
		'stimuliTime',
		'maxResponseTime',

		'textBeforeMainContent',
		'textAfterAnswerReceived',
		'reproductionSeed',
		'includesPresentation',
		'includesTest',
		'gltScoreForSuccess',
		'gltMustHideBeforeClick',
		'gltPauseBetweenPresentations',
		'gltPauseBetweenStimuli',
		'gltCellSize',
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
		case 'questionType':
		case 'pvtTooEarlyMessage':
		case 'mainOptionText':
		case 'reproductionSeed':
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
		case 'pvtMinTime':
		case 'pvtMaxTime':
		case 'pvtCount':
		case 'maxResponseTime':
		case 'matrixSizeX':
		case 'matrixSizeY':
		case 'presentationTime':
		case 'stimuliTime':
		case 'matrixUsedCellsCount':
		case 'gltScoreForSuccess':
		case 'gltPauseBetweenPresentations':
		case 'gltPauseBetweenStimuli':
		case 'gltCellSize':
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
		case 'isSkipStepButtonInFootnote':
		case 'isSkipButtonInMainOptions':
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
		case 'areAnswerOptionsVertical':
		case 'withTimer':
		case 'hasClearBackground':
		case 'hasSound':
		case 'areInactiveAnswersDisplayed':
		case 'hasNavigationBar':
		case 'hasStatusBar':
		case 'isFullScreen':
		case 'pvtHasCentralElement':
		case 'includesPresentation':
		case 'includesTest':
		case 'gltMustHideBeforeClick':
			if (!(typeof value === 'boolean')) {
				throw new Error(`The key '${key}' must be of type 'Boolean'`);
			}
			break;

		// Object
		case 'keyboardToMidiInputMapping':
		case 'timeUpState':
		case 'lastRepetitionVersion':
		case 'succeeededForSkipLoopVersion':
		case 'timeLeftMessages':
			if (!(typeof value === 'object') || Array.isArray(value)) {
				throw new Error(`The key '${key}' must be of type 'Object'`);
			}
			break;

		// Array elements or elements taken out of their array
		case 'interactiveKeyboardTextMapping':
		case 'textContent':
		case 'textAfterQuestionAsked':
		case 'textBeforeMainContent':
		case 'textAfterAnswerReceived':
		case 'textSpecification':
		case 'textReminder':
		case 'pictureFileName':
		case 'helperImageFileName':
		case 'videoFileName':
		case 'interactivePiano':
		case 'interactiveClicker':
		case 'interactiveKeyboard':
		case 'midiFileName':
		case 'referenceKeyboardKeys':
		case 'audioFirst':
		case 'audioSecond':
		case 'rightAnswers':
		case 'answerChoicesColor':
			// Elements of the array
			if (!Array.isArray(value)) {
				switch (key) {
					case 'interactiveKeyboardTextMapping':
						throw new Error(`The key '${key}' must be of type 'Array'`);

					case 'textContent':
					case 'textAfterQuestionAsked':
					case 'textBeforeMainContent':
					case 'textAfterAnswerReceived':
					case 'textSpecification':
					case 'textReminder':
					case 'pictureFileName':
					case 'helperImageFileName':
					case 'videoFileName':
					case 'midiFileName':
					case 'audioFirst':
					case 'audioSecond':
						// String
						if (!(typeof value === 'string')) {
							throw new Error(`The key '${key}' must be of type 'String' or 'Array'`);
						}
						break;

					case 'interactivePiano':
					case 'interactiveClicker':
					case 'interactiveKeyboard':
						// String or boolean
						if (!(typeof value === 'string' || typeof value === 'boolean')) {
							throw new Error(`The key '${key}' must be of type 'String', 'Boolean' or 'Array'`);
						}

						if (typeof value === 'string' && !ALLOWED_ENTRIES_INTERACTIVE_HELPERS.includes(value)) {
							throw new Error(`The key '${key}' cannot have the value '${value}'`);
						}
						break;

					case 'rightAnswers':
						// Number
						if (!(typeof value === 'number')) {
							throw new Error(`The key '${key}' must be of type 'Number' or 'Array'`);
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
					case 'textReminder':
					case 'audioFirst':
					case 'audioSecond':
					case 'textAfterQuestionAsked':
					case 'textBeforeMainContent':
					case 'textAfterAnswerReceived':
					case 'answerChoicesColor':
						value.forEach((element, index) => {
							if (!(typeof element === 'string')) {
								throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String'`);
							}
						});
						break;

					// Array of Numbers
					case 'rightAnswers':
						value.forEach((element, index) => {
							if (!(typeof element === 'number')) {
								throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'Number'`);
							}
						});
						break;

					// Array of String or boolean OR array of array of string or boolean
					case 'interactivePiano':
					case 'interactiveClicker':
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
										throw new Error(`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String' or boolean`);
									}

									if (typeof subElement === 'string' && !ALLOWED_ENTRIES_INTERACTIVE_HELPERS.includes(subElement)) {
										throw new Error(`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' cannot have the value ${subElement}`);
									}
								});
							}
						});
						break;

					// Array of String or array of array of strings
					case 'midiFileName':
					case 'pictureFileName':
					case 'textContent':
					case 'textSpecification':
					case 'videoFileName':
						value.forEach((element, index) => {
							if (!(typeof element === 'string' || Array.isArray(element))) {
								throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String' or boolean`);
							}

							if (Array.isArray(element)) {
								element.forEach((subElement, subIndex) => {
									if (!(typeof subElement === 'string')) {
										throw new Error(`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String'`);
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
										throw new Error(`The subelement number ${subIndex + 1} in the subarray of the element number ${index + 1} of the key '${key}' must be of type 'String'`);
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
		case 'flowPrelude':
		case 'flowConclusion':
		case 'surveyInputOptionsValues':
		case 'surveyInputOptionsText':
		case 'surveyLeftSideText':
		case 'surveyRightSideText':
		case 'answerChoicesValue':
		case 'answerChoicesText':
		case 'answerChoicesImage':
			if (!Array.isArray(value)) {
				throw new Error(`The key '${key}' must be of type 'Array'`);
			}

			switch (key) {
				// Arrays of String
				case 'answerChoicesImage':
					value.forEach((element, index) => {
						if (!(typeof element === 'string')) {
							throw new Error(`The element number ${index + 1} in the array of the key '${key}' must be of type 'String'`);
						}
					});
					break;

				default:
					break;
			} break;

		default:
			break;
	}

	return true;
}
