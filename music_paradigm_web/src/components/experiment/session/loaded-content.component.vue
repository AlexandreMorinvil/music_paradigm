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
		...mapGetters('experiment', ['midiName', 'referenceKeyboardKeys', 'audioFirstPart', 'audioSecondPart']),
	},
	methods: {
		...mapActions('piano', ['loadMidiFile']),
		...mapActions('keyboard', ['loadReferenceKeyboardKeys']),
		...mapActions('soundGenerator', ['loadQuestionFirstAudio', 'loadQuestionSecondAudio']),
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

		audioFirstPart: {
			immediate: true,
			handler: function (fileName) {
				if (fileName) this.loadQuestionFirstAudio(fileName);
			},
		},

		audioSecondPart: {
			immediate: true,
			handler: function (fileName) {
				if (fileName) this.loadQuestionSecondAudio(fileName);
			},
		},
	},
};
</script>

<style scoped></style>
