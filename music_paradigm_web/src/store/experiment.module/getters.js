import identifierGetters from './getters/getters.identifier';
import sessionMakerGetters from './getters/getters.session-marker';

import containGetters from './getters/getters.contain';
import contextGetters from './getters/getters.context';
import currentStateGetters from './getters/getters.current-state';
import globalSessionGetters from './getters/getters.global-session';
import logGetters from './getters/getters.log';

import interactiveControllerGetters from './getters/getters.interactive-controller';

import evaluationGetters from './getters/getters.evaluation';

import cueGetters from './getters/getters.cue';
import cursorGetters from './getters/getters.cursor';
import feedbackGetters from './getters/getters.feedback';
import gridLoactionTaskGetters from './getters/getters.grid-location-task';
import playingGetters from './getters/getters.playing';
import pvtGetters from './getters/getters.pvt';
import questionGetters from './getters/getters.question';
import surveyGetters from './getters/getters.survey';
import writtingGetters from './getters/getters.writting';

export default {
	// Getters for all informations periferal to the session itself (experiment, session makers, logs)
	...identifierGetters,
	...sessionMakerGetters,
	...logGetters,

	// Information to constitude the current state
	...contextGetters,
	...globalSessionGetters,
	...cursorGetters,
	...currentStateGetters,

	// Interactive components
	...interactiveControllerGetters,

	// Specifications
	...evaluationGetters,

	// Getters specific for some states
	...cueGetters,
	...feedbackGetters,
	...gridLoactionTaskGetters,
	...playingGetters,
	...pvtGetters,
	...questionGetters,
	...surveyGetters,
	...writtingGetters,

	// Boolean helper to specify the content present
	...containGetters,
};
