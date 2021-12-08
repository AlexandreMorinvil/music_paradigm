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
		...mapGetters('experiment', ['midiName', 'referenceKeyboardKeys', 'audioFirst', 'audioSecond']),
	},
	methods: {
		...mapActions('piano', ['loadMidiFile']),
		...mapActions('keyboard', ['loadReferenceKeyboardKeys']),
		...mapActions('soundGenerator', ['loadFirstAudio', 'loadSecondAudio']),
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

		audioFirst: {
			immediate: true,
			handler: function (fileName) {
				if (fileName) this.loadFirstAudio(fileName);
			},
		},

		audioSecond: {
			immediate: true,
			handler: function (fileName) {
				if (fileName) this.loadSecondAudio(fileName);
			},
		},
	},
};
</script>

<style scoped></style>
