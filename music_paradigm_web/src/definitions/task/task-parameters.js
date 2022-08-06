import * from './description-helpers/block-type';
import * from './description-helpers/parameter-type';
import * from './description-helpers/parameter-allowed-values';
import * from './description-helpers/task-description-constants';

const taskParametersDescriptiom = {
    anyPianoKey: {  },
    
    answerChoicesValue: {  },

    answerChoicesText: {  },

    answerChoicesColor: {  },

    answerChoicesImage: {  },

    areAnswerOptionsVertical: {  },

    areInactiveAnswersDisplayed: {  },

    audioFirst: {  },

    audioSecond: {  },

    canGoBack: {  },

    checkpoint: {  },

    considerExperimentFinished: {  },

    controlType: {  },

    cuePresentationDelay: {  },

    cueWaitForClick: {  },
    
    decrementVariable: {  },

    decrementVariableOnSucces: {  },

    enableSoundFlag: {  },

    failureFeedbackMessage: {  },

    feedbackNumerical: {  },

    folder: {
        title: 'Root directory of the resources of the task',
        isMandatory: false,
        defaultValue: '',
        scope: SCOPE_GENERAL,
        type: TYPE_STRING,
        description: 'This parameter specified the root directory from which the resources will be fetched when \
                        resources are used in the task.\n \
                        When an multimedia asset (audio file, image file, MIDI file, video file, etc.) specified in \
                        the description of the task must be used during a session, the application send a request to \
                        the server in order to retreive the resource requested. The server contains a set of files \
                        referred to as "resources" and those resources are organized in a structure of directories \
                        (the resources available on the server can be browsed through the "resources" page).\n\n\ \
                        When specifying a ressource in the code description of a task, the task will prefix the name \
                        of the resouce with the folder indicated as a parameter so that the resource requested has \
                        the following form: <folder paramerter>/<name of the resource>.',
        example: "Let the description of the task be the following:                                             \
                    {                                                                                           \
                        \"folder\": \"Example_Task\",                                                           \
                        ...                                                                                     \
                        \"flow\": [                                                                             \
                            {                                                                                   \
                                \"type\": \"instruction\",                                                      \
                                \"pictureFileName\": \"instructions_screen/example_image.bmp\",                 \
                            }                                                                                   \
                        ]                                                                                       \
                    }\n\n                                                                                       \
                    This would mean that when the task reaches the point where it ha to retreive the image \
                    \"example_image.bmp\", the server will be looking for the resource identified as : \
                    \"Example_Task/instructions_screen/example_image.bmp\""


    },

    followedBy: {  },

    footnote: {  },

    footnoteMessage: {  },

    footnoteType: {  },

    gltCellSize: {  },

    gltMustHideBeforeClick: {  },

    gltPauseBetweenPresentations: {  },

    gltPauseBetweenStimuli: {  },

    gltScoreForSuccess: {  },

    goBackButtonMessage: {  },

    goBackStepButton: {  },

    group: {
        title: 'Group of the task',
        isMandatory: false,
        defaultValue: 'default',
        scope: SCOPE_GENERAL,
        type: TYPE_STRING,
        description: 'This parameter defines the group to which the task belongs.\n \
                        The group is used to classify the tasks in a list of tasks. The group has no impact on the \
                        behavior or the content of the task and it is not visible to the test subjects completing \
                        the task.',
    },

    hasClearBackground: {  },

    hasNavigationBar: {  },
    
    hasSound: {  },
    
    hasStatusBar: {  },
    
    helperImageFileName: {  },
    
    hideFeedbackSmiley: {  },

    includesPresentation: {  },
    
    includesTest: {  },
    
    incrementVariable: {  },
    
    incrementVariableOnSucess: {  },
    
    instrument: { },
    
    interactiveClicker: {  },
    
    interactiveKeyboard: {  },
    
    interactiveKeyboardTextMapping: {  },
    
    interactivePiano: {  },
    
    interactivePianoFirstOctave: {  },
    
    isFullScreen: {  },
    
    isGoBackButtonInFootnote: {  },
    
    isSkipStepButtonInFootnote: {  },
    
    isSkipButtonInMainOptions: {  },
    
    isInSkipableChain: {  },
    
    isInSkipIfNotMetSuccessGoalChain: {  },

    keyboardToMidiInputMapping:{  },
    
    lastRepetitionVersion: {  },
    
    logFlag: {  },
    
    logLabel: { },
    
    mainOptionText: {  },
    
    matrixSizeX: {  },
    
    matrixSizeY: {  },
    
    matrixUnusedCells: {  },
    
    matrixUsedCellsCount: {  },
    
    maxResponseTime: {  },
    
    melodyRepetition: {  },
    
    midiFileName: {  },
    
    mode: {  },

    name: {
        title: 'Name of the task',
        isMandatory: true,
        scope: SCOPE_GENERAL,
        type: TYPE_STRING,
        description: 'This parameter defines the name of the task.\n \
                        The name is used to identify the tasks within the group of the task in a list of tasks. \
                        The name has no impact on the behavior or the content of the task and is not visible to \
                        the test subjects completing the task.'
    },

    numberRepetition: {  },

    pictureFileName: {  },
    
    playingMode: {  },
    
    presentationTime: {  },
    
    programmedOctaveOffset: {  },
    
    pvtCount: {  },
    
    pvtHasCentralElement: {  },
    
    pvtMaxTime: {  },
    
    pvtMinTime: {  },
    
    pvtTooEarlyMessage: {  },

    questionType: {  },
    
    referenceKeyboardKeys: {  },
    
    relativeRhythmImportance: {  },
    
    reproductionSeed: {  },
    
    resetVariable: {  },
    
    rhythmErrorMarginInMilliseconds: {  },
    
    rhythmRelativeErrorMarginInFloat: {  },
    
    rightAnswers: {  },
    
    skipIfNotMetSuccessGoal: {  },
    
    skipLoopOnLastRepetition: {  },
    
    skipStepButton: {  },
    
    skipStepButtonMessage: {  },
    
    startSignal: {  },
    
    successFeedbackMessage: {  },
    
    successesForSkip: {  },
    
    successesForSkipLoop: {  },
    
    succeeededForSkipLoopVersion: {  },
    
    surveyAreAnswersMandatory: {  },
    
    surveyInputOptionsText: {  },
    
    surveyInputOptionsValues: {  },
    
    surveyLeftSideText: {  },
    
    surveyOptionsAreRadio: {  },
    
    surveyRightSideText: {  },
    
    surveyType: {  },

    stimuliTime: {  },
    
    strictPlay: {  },

    textAfterAnswerReceived: {  },
    
    textAfterQuestionAsked: {  },
    
    textBeforeMainContent: {  },

    textContent: {

    },
    
    textReminder: {  },
    
    textSpecification: {  },
    
    textWaitBeforeNextStep: {  },
    
    timeLeftMessages: {  },
    
    timeLimitInSeconds: {  },
    
    timeoutInSeconds: {  },

    type: {
        title: 'Type of the block',
        isMandatory: true,
        scope: SCOPE_BLOCK,
        blockType: ALL_BLOCK_TYPES,
        allowedValues: ALL_BLOCK_TYPES,
        type: TYPE_STRING,
        description: 'This parameter defines the type of the block.\n \
                        The type of a block defines the behavior of the application and what sequence of events and \
                        interactions are expected at a given step of the task',
    },

    version: {
        // TODO: Add specifications.
        title: '',
        isMandatory: false,
        defaultValue: null,
        scope: null,
        blockType: null,
        allowedValues: null,
        type: null,
        description: '',
        example: '',
    },

 
    videoFileName: {  },

    waitBeforeNextStep: {  },

    withProgressionBar: {  },
    
    withTimer: {  },
    
    writtingMaxCharacters: {  },
    
    writtingMinCharacters: {  },
    
    writtingIsMultiline: {  },
    
    writtingIsNumber: {  },
    
    writtingTextPlaceHolder: {  },


    // =================================================================================================================

    // flow: {  },
    // flowPrelude: {  },
    // flowConclusion: {  },
    // timeUpState: {  },
    // variables: [
    //     {
    //         name: {  },
    //         type: {  },
    //         assignation: {  },
    //         assignedValue: {  },
    //         acceptsFreeTextValue: {  },
    //         valueSelectionType: {  },
    //         scheduleName: {  },
    //         optionValues: {  },
    //     }
    // ],
    // variablesSchedules: 
    // [
    //     {
    //         name: {  },
    //         numberElements: {  },
    //         numberVariantsBalancedInCurriculum: {  },
    //         scheduleType: {  },
    //         schedule: {  },
    //     }
    // ]
};
