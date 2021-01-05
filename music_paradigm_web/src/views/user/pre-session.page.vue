/* eslint-disable max-len */
<template>
	<user-page-content-frame-component title="Before Starting">
		<div class="home-page-grid">
			<component :is="stageComponent" :isLastStage="isLastStage" />
		</div>
	</user-page-content-frame-component>
</template>

<script>
import { mapGetters } from 'vuex';

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
};
</script>

<style scoped>
.pre-session-page-grid {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: 1fr;
	grid-template-rows: 4fr 6fr;
	grid-template-areas:
		'button'
		'overview';
	height: 100%;
	width: 100%;
}

.area-overview {
	grid-area: overview;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
}

.area-button {
	grid-area: button;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
