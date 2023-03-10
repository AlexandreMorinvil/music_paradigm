import { Progression } from "@/modules/progressions";

export default {
	setUserProgressionSelection(state, progression) {
		state.selectionUserProgression = new Progression(progression);
	},

	unsetUserProgressionSelection(state) {
		state.selectionUserProgression = new Progression();
	},
};