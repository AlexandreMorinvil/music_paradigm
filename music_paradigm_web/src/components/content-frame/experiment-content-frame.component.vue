<template>
	<div id="content-frame" class="experiment-content-container experiment-content-grid" :class="footnoteGridClass">
		<img
			v-if="hasHelperImage"
			id="helper-img"
			:src="urlExperimentRessource(helperImageName)"
			alt="Helper"
			class="helper"
		/>

		<skip-button v-if="hasSkipOption && !isSkipButtonInFootnote" class="skip-button" />

		<router-view 
			style="background-color: pink"
			id="experiment-content"
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
#experiment-content {
	height: 100%;
}
</style>
