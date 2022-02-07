<template>
	<div style="display: none"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters('experiment', ['hasKeyboardToMidiInputMapping', 'keyboardToMidiInputMapping']),
		...mapGetters('piano', ['pressedKeys', 'midiFileTriggeredKeys', 'midiFileNotesMidi']),
		hasMapping() {
			return this.hasKeyboardToMidiInputMapping;
		},
		mapping() {
			return this.keyboardToMidiInputMapping;
		},
	},
	methods: {
		...mapActions('keyboard', ['updateMidiFileTriggeredAssociatedKeys', 'updateMidiFileAssociatedKeys']),
		toKey(midiNumber) {
			return Object.keys(this.mapping).find((key) => this.mapping[key] == midiNumber);
		},
		converMidiToKeyboardKey(listNote) {
			return listNote.map((midiNumber) => {
				return this.toKey(midiNumber);
			});
		},
	},
	watch: {
		midiFileTriggeredKeys: {
			deep: true,
			immediate: true,
			handler: function (list) {
				if (!this.hasMapping) return;
				const listKeysIndicated = this.converMidiToKeyboardKey(list);
				this.updateMidiFileTriggeredAssociatedKeys(listKeysIndicated);
			},
		},
		midiFileNotesMidi: {
			deep: true,
			immediate: true,
			handler: function (list) {
				if (!this.hasMapping) return;
				const listKeysIndicated = this.converMidiToKeyboardKey(list);
				this.updateMidiFileAssociatedKeys(listKeysIndicated);
			},
		},
	},
};
</script>

<style></style>
