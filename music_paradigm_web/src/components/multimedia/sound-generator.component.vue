<template>
	<div style="display: none">
		<sound-generator-midi-component v-on:finished="indicateFinished" ref="midiPlayer" />
		<sound-generator-other-component ref="otherPlayer" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventEmitter from 'events';
import SoundGeneratorMidiComponent from '@/components/multimedia/sound-generator-midi.component.vue';
import SoundGeneratorOtherComponent from '@/components/multimedia/sound-generator-other.component.vue';
import { ressourceName } from '@/_helpers';

export default {
	components: {
		SoundGeneratorMidiComponent,
		SoundGeneratorOtherComponent,
	},
	data() {
		return {
			waitAudio: new EventEmitter(),
			firstAudioFlag: 'audio-1-ready',
			secondAudioFlag: 'audio-2-ready',
			isMidiPlayerReady: false,
			isOtherPlayerReady: false,
			lastPlayedIsMidi: false,
			triggeredNoteCount: 0,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['hasAudioFirst', 'isAudioFirstLoading', 'audioFirstName', 'audioFirstContent', 'audioFirstParsed']),
		...mapGetters('soundGenerator', ['hasAudioSecond', 'isAudioSecondLoading', 'audioSecondName', 'audioSecondContent', 'audioSecondParsed']),
		isFirstAudioReady() {
			return !this.isAudioFirstLoading;
		},
		isSecondAudioReady() {
			return !this.isAudioSecondLoading;
		},
		isPlaying() {
			if (this.lastPlayedIsMidi) return this.$refs.midiPlayer ? this.$refs.midiPlayer.isPlaying : false;
			else return this.$refs.otherPlayer ? this.$refs.otherPlayer.isPlaying : false;
		},
	},
	methods: {
		playContent(content, isMidi = false) {
			if (isMidi) {
				this.$refs.otherPlayer.stop();
				this.lastPlayedIsMidi = true;
				this.$refs.midiPlayer.play(content);
			} else {
				this.$refs.midiPlayer.stop();
				this.lastPlayedIsMidi = false;
				this.$refs.otherPlayer.play(content);
			}
		},
		async playAudioFirst() {
			if (!this.hasAudioFirst) return;
			if (!this.isFirstAudioReady) await new Promise((resolve) => this.waitAudio.once(this.firstAudioFlag, resolve)); // Wait for the ressource to load
			const isMidiFile = ressourceName.isMidiFile(this.audioFirstName);
			const content = isMidiFile ? this.audioFirstParsed : this.audioFirstContent;
			this.playContent(content, isMidiFile);
		},
		async playAudioSecond() {
			if (!this.hasAudioSecond) return;
			if (!this.isSecondAudioReady) await new Promise((resolve) => this.waitAudio.once(this.secondAudioFlag, resolve)); // Wait for the ressource to load
			const isMidiFile = ressourceName.isMidiFile(this.audioSecondName);
			const content = isMidiFile ? this.audioSecondParsed : this.audioSecondContent;
			this.playContent(content, isMidiFile);
		},
		indicateFinished() {
			this.$emit('finished');
		},
	},
	mounted() {
		this.$watch(
			() => this.$refs.midiPlayer.numberNotesTriggered,
			(number) => this.$emit('triggeredNoteCount', number),
		);
	},
	watch: {
		isFirstAudioReady(isReady) {
			if (isReady) this.waitAudio.emit(this.firstAudioFlag);
		},
		isSecondAudioReady(isReady) {
			if (isReady) this.waitAudio.emit(this.secondAudioFlag);
		},
	},
};
</script>

<style scoped></style>
