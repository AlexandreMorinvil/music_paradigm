<template>
	<div id="text-area" class="state-section">
		<sound-generator-component v-on:triggeredNoteCount="updateTriggeredNoteIndex" v-on:finished="handleAudioEnd" ref="audioManager" />
		<div v-for="row in numberRows" v-bind:key="row" class="choices-area" :class="{ 'vertical-direction': isVertical }">
			<button
				v-for="column in getNumberElementsInRow(row)"
				v-bind:key="column"
				v-on:click="handleSelection(getNumber(row, column))"
				:class="{
					'not-clickable': !areChoicesClickable,
					'playing-box': getNumber(row, column) === triggeredChoiceNumber,
					'revealed-box': getNumber(row, column) < revealedChoiceLastNumber,
					'last-audio': reachedLastAudio,
					'selected-box': getNumber(row, column) === selectedChoiceNumber,
					'is-inactive': !isValidSelection(getNumber(row, column)),
				}"
				class="midi-choice"
			>
				{{ getTextOfBox(getNumber(row, column)) }}
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
	props: {
		canSelectionChange: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	data() {
		return {
			// DOM rules
			NUMBER_CHOICES_PER_ROW: 10,

			// Delays
			DELAY_INITIAL: 1000,
			DELAY_FIRST_AUDIO_MILISECONDS: 100,
			DELAY_SECOND_AUDIO_MILISECONDS: 750,

			// DOM manipulation indexes
			revealedChoiceLastNumber: 0,
			triggeredChoiceNumber: 0,
			selectedChoiceNumber: -1,

			// Flags for the sequnce of events
			isReadyToPlayFirstAudio: false,
			isReadyToPlaySecondAudio: false,
			hasPlayedFirstAudio: false,
			hasPlayedSecondAudio: false,
			isReadyToTakeAnswers: false,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['hasAudioFirst', 'hasAudioSecond', 'audioFirstParsed', 'audioSecondParsed', 'audioFirstName', 'audioSecondName']),
		...mapGetters('experiment', [
			'textSpecification',
			'answerChoicesValue',
			'answerChoicesText',
			'areAnswerOptionsVertical',
			'areInactiveAnswersDisplayed',
			'rightAnswers',
		]),
		isVertical() {
			return this.areAnswerOptionsVertical;
		},
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
		listOptionValues() {
			// The minimum box number is 2
			const options = [1, 2];

			// If option values are specified, they dictate the number of options
			if (this.answerChoicesValue.length > 0) {
				for (const i in this.answerChoicesValue) options[i] = this.answerChoicesValue[i];
			}

			// If there is no option values, we take the number of notes of the Midi files loaded
			else {
				const choicesCount = Math.max(this.notesCountFirstAudio || 0, this.notesCountSecondAudio || 0, options.length);
				for (let i = 0; i < choicesCount; i++) options[i] = i + 1;
			}
			return options;
		},
		listOptionText() {
			const options = [];

			// De default text is the value stored for the given value
			for (const i in this.listOptionValues) options[i] = this.listOptionValues[i];

			// If a text is specified for an index, that text is the text for a given value
			for (const i in this.answerChoicesText) if (this.answerChoicesText[i]) options[i] = this.answerChoicesText[i];

			return options;
		},
		correctAnswersIndex() {
			if (this.rightAnswers == null) return null;
			let validRightAnswers = null;
			const lastValidIndex = this.numberValidChoices - 1;
			if (Array.isArray(this.rightAnswers)) {
				validRightAnswers = this.rightAnswers.filter((index) => index <= lastValidIndex);
			} else if (this.rightAnswers <= lastValidIndex) validRightAnswers = this.rightAnswers;
			return validRightAnswers;
		},
		numberBoxes() {
			if (this.areInactiveAnswersDisplayed) return Math.max(this.listOptionText.length, this.listOptionValues.length);
			else return this.listOptionValues.length;
		},
		numberValidChoices() {
			return this.listOptionValues.length;
		},
		reachedLastAudio() {
			const numberAudio = Number(this.hasAudioFirst) + Number(this.hasAudioSecond);
			const numberAudioFinished = Number(this.hasPlayedFirstAudio) + Number(this.hasPlayedSecondAudio);
			return numberAudioFinished >= numberAudio - 1;
		},
		isChoiceMade() {
			return this.selectedChoiceNumber > 0;
		},
		areChoicesClickable() {
			return this.isReadyToTakeAnswers && !this.isChoiceMade || this.canSelectionChange;
		},
		numberRows() {
			return Math.ceil(this.numberBoxes / this.NUMBER_CHOICES_PER_ROW);
		},
	},
	methods: {
		playFirstAudio() {
			setTimeout(() => this.$refs.audioManager.playAudioFirst(), this.DELAY_FIRST_AUDIO_MILISECONDS);
		},
		playSecondAudio() {
			setTimeout(() => this.$refs.audioManager.playAudioSecond(), this.DELAY_SECOND_AUDIO_MILISECONDS);
		},
		getTextOfBox(number) {
			const index = number - 1;
			const imposedText = this.listOptionText[index];
			return imposedText || number;
		},
		updateTriggeredNoteIndex(number) {
			this.triggeredChoiceNumber = number;
		},
		revealTheCoices() {
			const stepsInMilliseconds = 70;
			const numberSteps = this.numberValidChoices + 1;
			for (let index = 0; index < numberSteps; index++)
				setTimeout(() => {
					this.revealedChoiceLastNumber += 1;
				}, index * stepsInMilliseconds);
			setTimeout(() => {
				this.isReadyToPlayFirstAudio = true;
			}, numberSteps * stepsInMilliseconds);
		},
		handleAudioEnd() {
			this.triggeredChoiceNumber = -1;
			if (this.reachedLastAudio) this.$emit('questionAsked');
			if (this.hasAudioFirst && !this.hasPlayedFirstAudio) {
				this.hasPlayedFirstAudio = true;
				this.isReadyToPlaySecondAudio = true;
			} else if (this.hasAudioSecond && !this.hasPlayedSecondAudio) {
				this.hasPlayedSecondAudio = true;
				this.isReadyToTakeAnswers = true;
			}
		},
		bundleAnswer(answerIndex) {
			return {
				answerIndex: answerIndex,
				questionCorrectAnswerIndex: this.correctAnswersIndex,
				questionOptionsValues: this.listOptionValues,
				questionOptionsTexts: this.listOptionText,
				questionRelatedContent: [this.audioFirstName, this.audioSecondName],
			};
		},
		handleSelection(number) {
			if (!this.areChoicesClickable) return;
			if (!this.isValidSelection(number)) return;
			this.selectedChoiceNumber = number;
			const selectedIndex = number - 1;
			this.$emit('answered', this.bundleAnswer(selectedIndex));
		},
		isValidSelection(number) {
			return number <= this.numberValidChoices;
		},
		getNumberElementsInRow(row) {
			if (row < this.numberBoxes / this.NUMBER_CHOICES_PER_ROW) return this.NUMBER_CHOICES_PER_ROW;
			else return this.numberBoxes % this.NUMBER_CHOICES_PER_ROW || this.NUMBER_CHOICES_PER_ROW;
		},
		getNumber(row, column) {
			return (row - 1) * this.NUMBER_CHOICES_PER_ROW + column;
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
	flex-wrap: nowrap;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;
}

.specification-text {
	margin: 20px;
	height: 50px;
}

.midi-choice {
	background-color: lightgray;
	color: white;
	border: none;
	width: 115px;
	height: 115px;
	margin: 20px;
}

.not-clickable {
	cursor: default;
}

.revealed-box {
	background-color: grey;
}

.playing-box {
	opacity: 0.5;
}

.revealed-box.last-audio {
	background-color: maroon;
}

.revealed-box.selected-box {
	background-color: orange;
}

.vertical-direction {
	flex-direction: column;
}

.is-inactive {
	cursor: default;
}
</style>
