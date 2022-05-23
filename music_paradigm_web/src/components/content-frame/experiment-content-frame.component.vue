<template>
	<div id="content-frame" class="experiment-content-container experiment-content-grid">
		<helper-image-component v-if="hasHelperImage" class="helper-image" />
		<text-reminder-component v-if="hasTextReminder" class="text-reminder" />
		<go-back-button-component v-if="hasGoBackOption && !isGoBackButtonInFootnote" class="go-back-button smaller-button" />
		<skip-button-component v-if="hasSkipOption && !isSkipButtonInFootnote" class="skip-button smaller-button" />
		<start-signal-timer-component v-if="isWaitingStartSignal" class="start-signal" />

		<router-view
			:lastPressedKey="lastPressedKey"
			:isSpaceBarPressed="isSpaceBarPressed"
		/>

		<footnote-component v-if="hasFootnote" class="experiment-state-division state-division-text footnote-size" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import FootnoteComponent from '@/components/experiment/footnote/footnote.component.vue';
import GoBackButtonComponent from '@/components/experiment/element/go-back-button.component.vue';
import HelperImageComponent from '@/components/experiment/element/helper-image.component.vue';
import SkipButtonComponent from '@/components/experiment/element/skip-button.component.vue';
import StartSignalTimerComponent from '@/components/experiment/element/start-signal-timer.component.vue';
import TextReminderComponent from '@/components/experiment/element/text-reminder.component.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		HelperImageComponent,
		TextReminderComponent,
		GoBackButtonComponent,
		SkipButtonComponent,
		StartSignalTimerComponent,
		FootnoteComponent,
	},
	props: {
		lastPressedKey: {
			type: String,
			default() {
				return '';
			},
		},
		isSpaceBarPressed: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	computed: {
		...mapGetters(['urlExperimentResource']),
		...mapGetters('piano', ['pressedKeys']),
		...mapGetters('experiment', [
			'hasFootnote',
			'hasHelperImage',
			'hasTextReminder',
			'hasSkipOption',
			'hasGoBackOption',
			'isWaitingStartSignal',
			'isSkipButtonInFootnote',
			'isGoBackButtonInFootnote',
		]),
	},
};
</script>

<style scoped>
.experiment-content-container {
	overflow: hidden;
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
}

.experiment-content-grid {
	display: grid;
	position: relative;
	justify-content: center;
	align-content: space-between;
	grid-template-columns: 1fr;
	grid-template-rows: minmax(0, 1fr);
	grid-row-gap: 2.5%;
}

.helper-image {
	position: absolute;
	right: 0;
	width: 9%;
}

.text-reminder {
	position: absolute;
	left: 0;
	width: 9%;
}

.go-back-button {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 9%;
	min-height: 10%;
	max-height: 30%;
}

.skip-button {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 9%;
	min-height: 10%;
	max-height: 30%;
}

.start-signal {
	/* Position */
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	/* Appearance */
	z-index: 10;
	width: 75vw;
	height: 55vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: radial-gradient(rgb(200, 165, 0), rgb(200, 130, 30));
	border-radius: 20px;
	text-align: center;

	/* Font-size */
	font-size: 3em;
}
</style>
