<template>
	<div id="text-area" class="state-section">
		<sound-generator-component v-on:triggeredNoteCount="updateTriggeredNoteIndex" v-on:finished="handleAudioEnd" ref="audioManager" />
		<div class="choices-area">
			<button
				v-for="index in numberBoxes"
				v-bind:key="index"
				:class="{
					'playing-box': index === triggeredChoiceIndex,
					'revealed-box': index < revealedChoiceLastIndex,
					'last-audio': reachedLastAudio,
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
			// Delays
			DELAY_INITIAL: 1000,
			DELAY_FIRST_AUDIO_MILISECONDS: 100,
			DELAY_SECOND_AUDIO_MILISECONDS: 750,

			// DOM manipulation indexes
			revealedChoiceLastIndex: 0,
			triggeredChoiceIndex: 0,

			// Flags for the sequnce of events
			isReadyToPlayFirstAudio: false,
			isReadyToPlaySecondAudio: false,
			hasPlayedFirstAudio: false,
			hasPlayedSecondAudio: false,
			isReadyToTakeAnswers: false,
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
			return this.isReadyToTakeAnswers ? this.textSpecification : '';
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
		reachedLastAudio() {
			const numberAudio = Number(this.hasAudioFirst) + Number(this.hasAudioSecond);
			const numberAudioFinished = Number(this.hasPlayedFirstAudio) + Number(this.hasPlayedSecondAudio);
			return numberAudioFinished >= (numberAudio - 1);
		},
	},
	methods: {
		playFirstAudio() {
			setTimeout(() => this.$refs.audioManager.playAudioFirst(), this.DELAY_FIRST_AUDIO_MILISECONDS);
		},
		playSecondAudio() {
			setTimeout(() => this.$refs.audioManager.playAudioSecond(), this.DELAY_SECOND_AUDIO_MILISECONDS);
		},
		getTextOfBox(index) {
			const imposedText = this.answerChoicesText[index];
			return imposedText || index;
		},
		updateTriggeredNoteIndex(number) {
			this.triggeredChoiceIndex = number;
		},
		revealTheCoices() {
			const stepsInMilliseconds = 70;
			const numberSteps = this.numberBoxes + 1;
			for (let index = 0; index < numberSteps; index++)
				setTimeout(() => {
					this.revealedChoiceLastIndex += 1;
				}, index * stepsInMilliseconds);
			setTimeout(() => {
				this.isReadyToPlayFirstAudio = true;
			}, numberSteps * stepsInMilliseconds);
		},
		handleAudioEnd() {
			this.triggeredChoiceIndex = -1;
			if (this.hasAudioFirst && !this.hasPlayedFirstAudio) {
				this.hasPlayedFirstAudio = true;
				this.isReadyToPlaySecondAudio = true;
			} else if (this.hasAudioSecond && !this.hasPlayedSecondAudio) {
				this.hasPlayedSecondAudio = true;
				this.isReadyToTakeAnswers = true;
			}
		},
	},
	mounted() {
		setTimeout(() => this.revealTheCoices(), this.DELAY_INITIAL);
	},
	watch: {
		isReadyToPlayFirstAudio(isReady) {
			if (isReady && this.hasAudioFirst) this.playFirstAudio();
			else this.isReadyToPlaySecondAudio = true;
		},
		isReadyToPlaySecondAudio(isReady) {
			if (isReady && this.hasAudioSecond) this.playSecondAudio();
			else this.isReadyToTakeAnswers = true;
		},
	},
};
</script>

<style scoped>
.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.choices-area {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;
}

.specification-text {
	margin: 20px;
}

.midi-choice {
	background-color: lightgray;
	color: white;
	border: none;
	width: 125px;
	height: 125px;
	margin: 20px;
}

.revealed-box {
	background-color: grey;
}

.revealed-box.last-audio {
	background-color: maroon;
}

.playing-box {
	opacity: 0.5;
}
</style>
