import { defaultState } from '@/store-helper/sound-generator.module-helper';
import { resourceService } from '@/_services';

export default {
	initializeSoundGenerator: ({ commit }, instrument) => {
		commit('initializeSoundGenerator', instrument);
	},

	terminateSoundGenerator: ({ commit }) => {
		commit('terminateSoundGenerator');
	},

	loadQuestionFirstAudio: ({ dispatch }, fileName) => {
		dispatch('loadRessourceFile', { assignation: defaultState.FIRST_AUDIO_RESSOURCE_NAME, fileName: fileName });
	},

	loadQuestionSecondAudio: ({ dispatch }, fileName) => {
		dispatch('loadRessourceFile', { assignation: defaultState.SECOND_AUDIO_RESSOURCE_NAME, fileName: fileName });
	},

	loadRessourceFile: ({ commit }, { assignation, fileName }) => {
		commit('indicateIsLoading', assignation);
		return resourceService.fetchMidiFile(fileName).then(
			(arrayStream) => {
				commit('setRessourceName', { assignation: assignation, fileName: fileName });
				commit('loadRessourceArrayStream', { assignation: assignation, arrayStream: arrayStream });
				commit('processArrayStream', assignation);
			},
			(error) => {
				console.error(`Ressource loading failed:\n${error}`);
			}
		)
			.finally(() => {
				commit('indicateIsLoadingEnd', assignation);
			});
	},
};
