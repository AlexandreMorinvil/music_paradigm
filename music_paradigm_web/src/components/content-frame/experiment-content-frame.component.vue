<template>
	<div id="content-frame" class="experiment-content-container experiment-content-grid">
		<img v-if="hasHelperImage" id="helper-img" :src="urlExperimentRessource(helperImageName)" alt="Helper" class="helper" />

		<skip-button v-if="hasSkipOption && !isSkipButtonInFootnote" class="skip-button" />

		<router-view
			style="background-color: pink"
			:class="hasFootnote ? 'content-size-limit-with-footnote' : 'content-size-limit-no-footnote'"
			:lastPressedKey="lastPressedKey"
			:isSpaceBarPressed="isSpaceBarPressed"
		/>

		<footnote
			style="background-color: green"
			v-if="hasFootnote"
			class="experiment-state-division state-division-text"
			v-on:footnote="handleFootnote"
			:message="footnote"
		/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import Footnote from '@/components/experiment/footnote/Footnote.vue';
import SkipButton from '@/components/experiment/element/skip-button.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		skipButton: SkipButton,
		footnote: Footnote,
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
	data() {
		return {
			footnote: 'abc',
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['pressedKeys']),
		...mapGetters('experiment', ['hasFootnote', 'hasHelperImage', 'hasSkipOption', 'helperImageName', 'isSkipButtonInFootnote']),
		footnoteGridClass() {
			if (this.hasFootnote) return 'grid-with-footnote';
			else return 'grid-without-footnote';
		},
	},
	methods: {
		handleFootnote(footNote) {
			if (this.footnoteMessage) this.footnote = this.footnoteMessage;
			else this.footnote = footNote;
		},
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

.footnot-size {
	max-height: 12.5%;
	height: 12.5%;
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
</style>
