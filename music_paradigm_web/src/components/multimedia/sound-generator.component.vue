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
import { ressourceName } from '@/_helpers';

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
		...mapGetters('soundGenerator', ['hasAudioFirst', 'audioFirstName', 'audioFirstContent', 'audioFirstParsed']),
		...mapGetters('soundGenerator', ['hasAudioSecond', 'audioSecondName', 'audioSecondContent', 'audioSecondParsed']),
		numberNotesPlayed() {
			if (this.$refs.midiPlayer) return this.$refs.midiPlayer.numberNotesPlayed;
			else return 0;
		},
	},
	methods: {
		test() {
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
			const isMidiFile = ressourceName.isMidiFile(this.audioFirstName);
			const content = isMidiFile ? this.audioFirstParsed : this.audioFirstContent;
			this.playContent(content, isMidiFile);
		},
		playAudioSecond() {
			if (!this.hasAudioSecond) return;
			const isMidiFile = ressourceName.isMidiFile(this.audioSecondName);
			const content = isMidiFile ? this.audioSecondParsed : this.audioSecondContent;
			this.playContent(content, isMidiFile);
		},
	},
	mounted() {
		setTimeout(() => {
			this.playAudioFirst();
		}, 5000);
	}
};
</script>

<style scoped></style>
