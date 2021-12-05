<template>
	<div />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters('experiment', ['midiName', 'referenceKeyboardKeys', 'questionAudioFirstPart', 'questionAudioSecondPart']),
	},
	methods: {
		...mapActions('keyboard', ['loadReferenceKeyboardKeys']),
		...mapActions('piano', ['loadMidiFile']),
	},
	watch: {
		midiName: {
			immediate: true,
			handler: function (midiName) {
				if (midiName) this.loadMidiFile(midiName);
			},
		},

		referenceKeyboardKeys: {
			deep: true,
			immediate: true,
			handler: function (sequence) {
				if (sequence) this.loadReferenceKeyboardKeys();
			},
		},

		questionAudioFirstPart: {
			immediate: true,
			handler: function (fileName) {
				if (fileName) this.loadQuestionFirstAudio(fileName);
			},
		},

		questionAudioSecondPart: {
			immediate: true,
			handler: function (fileName) {
				if (fileName) this.loadQuestionSecondAudio(fileName);
			},
		},
	},
};
</script>

<style scoped></style>
