<template>
	<div style="display: none">
		<sound-generator-midi-component ref="midiPlayer" />
		<sound-generator-other-component ref="otherPlayer" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventEmitter from 'events';
import SoundGeneratorMidiComponent from '@/components/multimedia/sound-generator-midi.component.vue';
import SoundGeneratorOtherComponent from '@/components/multimedia/sound-generator-other.component.vue';

export default {
	components: {
		SoundGeneratorMidiComponent,
		SoundGeneratorOtherComponent,
	},
	data() {
		return {
			lock: new EventEmitter(),
			isMidiPlayerReady: false,
			isOtherPlayerReady: false,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['hasAudioFirst', 'isAudioFirstMidi', 'audioFirstContent', 'audioFirstParsed']),
		...mapGetters('soundGenerator', ['hasAudioSecond', 'isAudioSecondMidi', 'audioSecondContent', 'audioSecondParsed']),
		numberNotesPlayed() {
			if (this.$refs.midiPlayer) return this.$refs.midiPlayer.numberNotesPlayed;
			else return 0;
		},
	},
	methods: {
		async test() {
			this.$refs.midiPlayer.play([
				{ time: 0.0, midi: 60, duration: 1 },
				{ time: 0.5, midi: 61, duration: 1 },
				{ time: 1.0, midi: 62, duration: 1 },
				{ time: 1.5, midi: 63, duration: 1 },
				{ time: 2.0, midi: 64, duration: 1 },
				{ time: 2.5, midi: 65, duration: 1 },
			]);
		},
		playContent(content, isMidi = false) {
			if (isMidi) {
				this.$refs.otherPlayer.stop();
				this.$refs.midiPlayer.play(content);
			}
			else {
				this.$refs.midiPlayer.stop();
				this.$refs.otherPlayer.play(content);
			}
		},
		playAudioFirst() {
			if (!this.hasAudioFirst) return;
			const content = this.isAudioFirstMidi ? this.audioFirstParsed : this.audioFirstContent;
			this.playContent(content, this.isAudioFirstMidi);
		},
		playAudioSecond() {
			if (!this.hasAudioSecond) return;
			const content = this.isAudioSecondMidi ? this.audioSecondParsed : this.audioSecondContent;
			this.playContent(content, this.isAudioSecondMidi);
		},
	},
	mounted() {
		this.test();
	}
};
</script>

<style scoped></style>
