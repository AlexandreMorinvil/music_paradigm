/* eslint-disable max-len */
<template>
	<user-page-content-frame-component title="Before Starting">
		<div class="pre-session-page-content pre-session-text">
			<component :is="stageComponent" v-on:end-stage="moveNextStage" :isLastStage="isLastStage" class="fill" />
		</div>
	</user-page-content-frame-component>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PreSessionAdviceComponent from '@/components/user/pre-session/pre-session-advice.component.vue';
import PreSessionMessageComponent from '@/components/user/pre-session/pre-session-message.component.vue';
import PreSessionPianoSettingComponent from '@/components/user/pre-session/pre-session-piano-setting.component.vue';
import UserPageContentFrameComponent from '@/components/content-frame/user-page-content-frame.component.vue';

export default {
	components: {
		UserPageContentFrameComponent,
		message: PreSessionMessageComponent,
		advice: PreSessionAdviceComponent,
		piano: PreSessionPianoSettingComponent,
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
			if (this.needsPianoSettingPreExperiment) stages.push('piano');
			return stages;
		},
		stageComponent() {
			return this.stages[this.currentStageIndex];
		},
		isLastStage() {
			return this.currentStageIndex + 1 >= this.stages.length;
		},
	},
	methods: {
		...mapActions('session', ['startSession']),
		moveNextStage() {
			if (this.isLastStage) this.startSession();
			else this.currentStageIndex += 1;
		},
	},
};
</script>

<style scoped>
.pre-session-page-content {
	background-color: rgb(50, 50, 50);
	border: 2px solid rgb(40, 40, 40);
	box-shadow: 5px 10px 8px black;
	padding: 20px;
	height: 100%;
	width: 100%;
}

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
