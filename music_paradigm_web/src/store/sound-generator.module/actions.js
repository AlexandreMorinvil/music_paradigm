import { defaultState } from '@/store-helper/sound-generator.module-helper';
import { resourceService } from '@/_services';

export default {
	initializeSoundGenerator: ({ commit }, instrument) => {
		commit('initializeSoundGenerator', instrument);
	},

	terminateSoundGenerator: ({ commit }) => {
		commit('terminateSoundGenerator');
	},

	loadFirstAudio: ({ dispatch }, fileName) => {
		dispatch('loadResourceFile', { assignation: defaultState.FIRST_AUDIO_RESSOURCE_NAME, fileName: fileName });
	},

	loadSecondAudio: ({ dispatch }, fileName) => {
		dispatch('loadResourceFile', { assignation: defaultState.SECOND_AUDIO_RESSOURCE_NAME, fileName: fileName });
	},

	loadResourceFile: ({ commit }, { assignation, fileName }) => {
		commit('resetResource', assignation);
		commit('setResourceName', { assignation: assignation, fileName: fileName });
		commit('indicateIsLoading', assignation);
		return resourceService.fetchMidiFile(fileName).then(
			(arrayStream) => {
				commit('loadResourceArrayStream', { assignation: assignation, arrayStream: arrayStream });
				commit('processArrayStream', assignation);
			},
			(error) => {
				console.error(`Resource loading failed:\n${error}`);
			}
		)
			.finally(() => {
				commit('indicateIsLoadingEnd', assignation);
			});
	},
};
