/* eslint-disable max-len */
<template>
	<user-page-content-frame-component :title="$t('views.user.pre-session.before-starting')">
		<component
			:is="stageComponent"
			v-on:end-stage="moveNextStage"
			v-on:back-stage="moveBackStage"
			v-on:abort="abort"
			:isLastStage="isLastStage"
			class="fill pre-session-text"
		/>
	</user-page-content-frame-component>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { PianoEventBus, pianoEvents } from '@/_services/piano-event-bus.service.js';
import PreSessionAdviceComponent from '@/components/user/pre-session/pre-session-advice.component.vue';
import PreSessionMessageComponent from '@/components/user/pre-session/pre-session-message.component.vue';
import PreSessionPianoSettingComponent from '@/components/user/pre-session/pre-session-piano-setting.component.vue';
import PreSessionPianoSoundComponent from '@/components/user/pre-session/pre-session-sound.component.vue';
import PreSessionPianoTestingComponent from '@/components/user/pre-session/pre-session-piano-testing.component.vue';
import UserPageContentFrameComponent from '@/components/content-frame/user-page-content-frame.component.vue';

export default {
	components: {
		UserPageContentFrameComponent,
		message: PreSessionMessageComponent,
		advice: PreSessionAdviceComponent,
		'piano-plug': PreSessionPianoSettingComponent,
		'piano-test': PreSessionPianoTestingComponent,
		sound: PreSessionPianoSoundComponent,
	},
	data() {
		return {
			currentStageIndex: 0,
		};
	},
	computed: {
		...mapGetters('session', ['needsMessagePreSession', 'needsPianoSettingPreExperiment']),
		stages() {
			const stages = [];
			if (this.needsMessagePreSession) stages.push('message');
			stages.push('advice');
			if (this.needsPianoSettingPreExperiment) {
				stages.push('piano-plug');
				stages.push('piano-test');
				stages.push('sound');
			}
			return stages;
		},
		stageComponent() {
			return this.stages[this.currentStageIndex];
		},
		isFirstStage() {
			return this.currentStageIndex === 0;
		},
		isLastStage() {
			return this.currentStageIndex + 1 >= this.stages.length;
		},
	},
	methods: {
		...mapActions('session', ['startSession', 'abortPresession']),
		abort() {
			PianoEventBus.$emit(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST);
			this.abortPresession();
		},
		moveNextStage() {
			if (this.isLastStage) this.startSession();
			else this.currentStageIndex += 1;
		},
		moveBackStage() {
			if (this.isFirstStage) this.abortPresession();
			else this.currentStageIndex -= 1;
		},
	},
};
</script>

<style scoped>
.pre-session-text {
	font-size: 1.2em;
	text-align: center;
	white-space: pre-line;
}

.fill {
	height: 100%;
	width: 100%;
}
</style>
