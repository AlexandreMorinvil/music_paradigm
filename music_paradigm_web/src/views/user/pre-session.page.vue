/* eslint-disable max-len */
<template>
	<div class="fill pre-session-text">
		<keyboard-input-tracker-component />
		<piano-input-handler-component />
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
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { KeyboardEventBus, keyboardEvents } from '@/event-bus/keyboard-event-bus.service.js';
import { PianoEventBus, pianoEvents } from '@/event-bus/piano-event-bus.service.js';
import KeyboardInputTrackerComponent from '@/components/controller/keyboard/keyboard-input-tracker.component.vue';
import PianoInputHandlerComponent from '@/components/controller/piano/piano-input-handler.component.vue';

import PreSessionAdviceComponent from '@/components/user/pre-session/pre-session-advice.component.vue';
import PreSessionClickerSettingComponent from '@/components/user/pre-session/pre-session-clicker-setting.component.vue';
import PreSessionClickerTestingComponent from '@/components/user/pre-session/pre-session-clicker-testing.component.vue';
import PreSessionMessageComponent from '@/components/user/pre-session/pre-session-message.component.vue';
import PreSessionPianoSettingComponent from '@/components/user/pre-session/pre-session-piano-setting.component.vue';
import PreSessionPianoSoundComponent from '@/components/user/pre-session/pre-session-sound.component.vue';
import PreSessionPianoTestingComponent from '@/components/user/pre-session/pre-session-piano-testing.component.vue';
import UserPageContentFrameComponent from '@/components/content-frame/user-page-content-frame.component.vue';

export default {
	components: {
		KeyboardInputTrackerComponent,
		PianoInputHandlerComponent,

		UserPageContentFrameComponent,
		message: PreSessionMessageComponent,
		advice: PreSessionAdviceComponent,
		'piano-plug': PreSessionPianoSettingComponent,
		'piano-test': PreSessionPianoTestingComponent,
		'clicker-plug': PreSessionClickerSettingComponent,
		'clicker-test': PreSessionClickerTestingComponent,
		sound: PreSessionPianoSoundComponent,
	},
	data() {
		return {
			currentStageIndex: 0,
		};
	},
	computed: {
		...mapGetters('session', [
			'needsMessagePreSession',
			'needsClickerSettingPreExperiment',
			'needsPianoSettingPreExperiment',
			'needsSoundTestPreExperiment',
		]),
		stages() {
			const stages = [];
			if (this.needsMessagePreSession) stages.push('message');
			stages.push('advice');
			if (this.needsPianoSettingPreExperiment) {
				stages.push('piano-plug');
				stages.push('piano-test');
			}
			if (this.needsClickerSettingPreExperiment) {
				stages.push('clicker-plug');
				stages.push('clicker-test');
			}
			if (this.needsSoundTestPreExperiment) stages.push('sound');
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
		...mapActions('soundGenerator', ['initializeSoundGenerator', 'terminateSoundGenerator']),
		abort() {
			PianoEventBus.$emit(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST);
			KeyboardEventBus.$emit(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST);
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
	beforeMount() {
		if (this.needsSoundTestPreExperiment) this.initializeSoundGenerator();
	},
	beforeDestroy() {
		if (this.needsSoundTestPreExperiment) this.terminateSoundGenerator();
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
