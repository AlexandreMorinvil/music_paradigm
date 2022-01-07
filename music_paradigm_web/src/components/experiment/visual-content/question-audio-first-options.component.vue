<template>
	<div id="text-area" class="state-section">
		<sound-generator-component v-on:finished="handleAudioEnd" ref="audioManager" />
		<div class="choices-area" :class="{ 'vertical-direction': isVertical }">
			<button
				v-for="number in numberOptions"
				v-bind:key="number"
				v-on:click="handleSelection(number)"
				:style="reachedLastAudio && !(number === selectedChoiceNumber) && 'background-color:' + getAnswerColor(number)"
				:class="{
					'not-clickable': !areChoicesClickable,
					'revealed-box': number <= revealedChoiceLastNumber,
					'last-audio': reachedLastAudio,
					'selected-box': number === selectedChoiceNumber,
					'is-inactive': !isValidSelection(number),
				}"
				class="midi-choice"
			>
				{{ getTextOfBox(number) }}
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

			// Flags for the sequnce of events
			isReadyToPlayFirstAudio: false,
			isReadyToPlaySecondAudio: false,
			hasPlayedFirstAudio: false,
			hasPlayedSecondAudio: false,
			isReadyToTakeAnswers: false,

			// Selection
			selectedChoiceNumber: -1,
			revealedChoiceLastNumber: 0,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['hasAudioFirst', 'hasAudioSecond']),
		...mapGetters('experiment', [
			'textSpecification',
			'answerChoicesValue',
			'answerChoicesText',
			'answerChoicesColor',
			'areAnswerOptionsVertical',
			'areInactiveAnswersDisplayed',
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
		listOptionValues() {
			const options = ['A', 'B'];
			for (const i in this.answerChoicesValue) if (this.answerChoicesValue[i]) options[i] = this.answerChoicesValue[i];
			return options;
		},
		listOptionText() {
			const options = [];
			for (const i in this.listOptionValues) options[i] = this.listOptionValues[i];
			for (const i in this.answerChoicesText) if (this.answerChoicesText[i]) options[i] = this.answerChoicesText[i];
			return options;
		},
		listOptionColors() {
			const colors = [];
			if (typeof this.answerChoicesColor === 'string') for (const i in this.optionsValues) colors[i] = this.listOptionValues[i];
			else if (Array.isArray(this.answerChoicesColor)) for (const i in this.answerChoicesColor) colors[i] = this.answerChoicesColor[i];
			return colors;
		},
		numberOptions() {
			if (this.areInactiveAnswersDisplayed) return Math.max(this.listOptionText.length, this.listOptionValues.length);
			return this.listOptionValues.length;
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
			return this.isReadyToTakeAnswers && !this.isChoiceMade;
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
		revealTheCoices() {
			const stepsInMilliseconds = 10;
			const numberSteps = this.numberValidChoices;
			for (let index = 0; index < numberSteps; index++)
				setTimeout(() => {
					this.revealedChoiceLastNumber += 1;
					console.log(this.revealedChoiceLastNumber);
				}, index * stepsInMilliseconds);
			setTimeout(() => {
				this.isReadyToPlayFirstAudio = true;
			}, numberSteps * stepsInMilliseconds);
		},
		handleAudioEnd() {
			if (this.reachedLastAudio) this.$emit('questionAsked');
			if (this.hasAudioFirst && !this.hasPlayedFirstAudio) {
				this.hasPlayedFirstAudio = true;
				this.isReadyToPlaySecondAudio = true;
			} else if (this.hasAudioSecond && !this.hasPlayedSecondAudio) {
				this.hasPlayedSecondAudio = true;
				this.isReadyToTakeAnswers = true;
			}
		},
		bundleAnswer(answerNumber) {
			return {
				answerIndex: answerNumber,
				optionsValues: this.listOptionValues,
				optionsText: this.listOptionText,
			};
		},
		handleSelection(number) {
			if (!this.areChoicesClickable) return;
			if (!this.isValidSelection(number)) return;
			this.selectedChoiceNumber = number;
			this.$emit('answered', this.bundleAnswer(this.selectedChoiceNumber));
		},
		getAnswerColor(number) {
			const index = number - 1;
			return this.listOptionColors[index];
		},
		isValidSelection(number) {
			return number <= this.numberValidChoices;
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
	height: 50px;
}

.midi-choice {
	background-color: lightgray;
	color: white;
	border: none;
	width: 300px;
	height: 100px;
	margin: 20px;
}

.not-clickable {
	cursor: default;
}

.revealed-box {
	background-color: grey;
}

.revealed-box.last-audio {
	background-color: green;
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
