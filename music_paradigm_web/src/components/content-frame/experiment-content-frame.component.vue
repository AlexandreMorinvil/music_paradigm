<template>
	<div id="content-frame" class="experiment-content-container experiment-content-grid">
		<helper-image-component v-if="hasHelperImage" class="helper" />
		<skip-button-component v-if="hasSkipOption && !isSkipButtonInFootnote" class="skip-button" />
		<start-signal-timer-component v-if="isWaitingStartSignal" class="start-signal" />

		<router-view
			:class="hasFootnote ? 'content-size-limit-with-footnote' : 'content-size-limit-no-footnote'"
			:lastPressedKey="lastPressedKey"
			:isSpaceBarPressed="isSpaceBarPressed"
		/>

		<footnote-component v-if="hasFootnote" class="experiment-state-division state-division-text footnote-size" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import FootnoteComponent from '@/components/experiment/footnote/footnote.component.vue';
import HelperImageComponent from '@/components/experiment/element/helper-image.component.vue';
import SkipButtonComponent from '@/components/experiment/element/skip-button.component.vue';
import StartSignalTimerComponent from '@/components/experiment/element/start-signal-timer.component.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		HelperImageComponent,
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
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['pressedKeys']),
		...mapGetters('experiment', ['hasFootnote', 'hasHelperImage', 'hasSkipOption', 'isWaitingStartSignal', 'isSkipButtonInFootnote']),
	},
};
</script>

<style scoped>
/* Hard limits determined manually to prevent the page from expending*/
.content-size-limit-no-footnote {
	max-height: 81vh;
}

.content-size-limit-with-footnote {
	max-height: 70vh;
}

.experiment-content-container {
	overflow: hidden;
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
}

.experiment-content-grid {
	display: grid;
	justify-content: center;
	align-content: space-between;
	grid-template-columns: 1fr;
	grid-template-rows: minmax(0, 1fr);
	grid-row-gap: 2.5%;
}

.helper {
	position: absolute;
	right: 0;
	width: 9%;
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
	top: 60%;
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
