<template>
	<div id="prelude-state" class="experiment-state-container grid-area-note">
		<div id="text-area" class="experiment-state-division state-division-text">
			{{ textToDisplay }}
		</div>

		<div id="note-area" class="experiment-state-division state-division-text">
			{{ footnote }}
		</div>
	</div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapGetters } from 'vuex';

export default {
	components: {},
	props: {
		isSpaceBarPressed: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('piano', ['isPianoInitialized']),
		footnote() {
			return 'Please wait a moment';
		},
		textToDisplay() {
			if (!this.isPianoInitialized) return 'Loading...';
			else return 'Ready';
		},
	},
	watch: {
		isPianoInitialized: {
			immediate: true,
			handler: function (isReady) {
				if (isReady) this.$emit('experimentReady');
			},
		},
	},
};
</script>

<style scoped></style>
