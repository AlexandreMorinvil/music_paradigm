<template>
	<div id="text-area" class="state-section">
		<sound-generator-component v-on:triggeredNoteCount="updateTriggeredNoteIndex" ref="audioManager" />
		<div>
			<button
				v-for="index in numberBoxes"
				v-bind:key="index"
				:class="{
					'green-box': true,
				}"
				class="midi-choice"
			>
				{{ getTextOfBox(index) }}
			</button>
		</div>
		<p v-if="hasSpecification" class="specification-text">{{ textContent }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import SoundGeneratorComponent from '@/components/multimedia/sound-generator.component.vue';

export default {
	components: {
		SoundGeneratorComponent,
	},
	data() {
		return {
			mustDisplaySpecification: false,
			DELAY_FIRST_SECOND_AUDIO: 1,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['hasAudioFirst', 'hasAudioSecond', 'audioFirstParsed', 'audioSecondParsed']),
		...mapGetters('experiment', ['textSpecification', 'answerChoicesValue', 'answerChoicesText']),
		hasAudio() {
			return this.hasAudioFirst || this.hasAudioSecond;
		},
		hasSpecification() {
			return Boolean(this.textSpecification);
		},
		textContent() {
			return this.mustDisplaySpecification ? this.textSpecification : '';
		},
		notesCountFirstAudio() {
			return Array.isArray(this.audioFirstParsed) ? this.audioFirstParsed.length : 0;
		},
		notesCountSecondAudio() {
			return Array.isArray(this.audioSecondParsed) ? this.audioSecondParsed.length : 0;
		},
		numberBoxes() {
			// The minimum box number is 2
			const minBoxNumber = 2;

			// If option values are specified, they dictate the number of options
			if (this.answerChoicesValue.length > 1) return this.answerChoicesValue.length;

			// If there is no option values, we take the number of notes of the Midi files loaded
			return Math.max(this.notesCountFirstAudio || 0, this.notesCountSecondAudio || 0, minBoxNumber);
		},
		// colorOfBox: (number) => () => {
		// 	console.log(number);
		// },
	},
	methods: {
		getTextOfBox(index) {
			const imposedText = this.answerChoicesText[index];
			return imposedText || index;
		},
		updateTriggeredNoteIndex(index) {
			console.log('Chiffre rendu dans les questions options: ', index);
		},
	},
	mounted() {
		// this.$watch(
		// 	() => this.$refs.audioManager.numberNotesTriggered,
		// 	this.updateTriggeredNoteIndex
		// );
		this.$refs.audioManager.playAudioFirst();
	},
};
</script>

<style scoped>
.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
	flex-direction: column;

	background-color: rgb(245, 245, 245);
}

.specification-text {
	margin: 20px;
}

.midi-choice {
	background-color: grey;
	color: white;
	border: none;
	width: 125px;
	height: 125px;
	margin: 20px;
}

.green-box {
	background-color: rgb(50, 255, 50);
}
</style>
