<template>
	<div id="text-area" class="state-section">
		<div class="choices-area" :class="{ 'vertical-direction': isVertical }">
			<button
				v-for="number in numberChoices"
				v-bind:key="number"
				v-on:click="handleSelection(number)"
				:style="!(number === selectedChoiceNumber) && 'background-color:' + getAnswerColor(number)"
				:class="{
					'not-clickable': !areChoicesClickable,
					'revealed-box': number <= revealedChoiceLastNumber,
					'selected-box': number === selectedChoiceNumber,
					'is-inactive': !isValidSelection(number),
				}"
				class="answer-option"
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

export default {
	data() {
		return {
			// Delays
			DELAY_INITIAL: 1000,

			// Flags for the sequnce of events
			isReadyToTakeAnswers: false,

			// Selection
			selectedChoiceNumber: -1,
			revealedChoiceLastNumber: 0,
		};
	},
	computed: {
		...mapGetters('experiment', [
			'textSpecification',
			'answerChoicesValue',
			'answerChoicesText',
			'answerChoicesColor',
			'areAnswerOptionsVertical',
			'areInactiveAnswersDisplayed',
			'rightAnswers',
		]),
		isVertical() {
			return this.areAnswerOptionsVertical;
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
		correctAnswersIndex() {
			if (!this.rightAnswers) return null;
			let validRightAnswers = null;
			const lastValidIndex = this.numberValidChoices - 1;
			if (Array.isArray(this.rightAnswers)) {
				validRightAnswers = this.rightAnswers.filter((index) => index <= lastValidIndex);
			} else if (this.rightAnswers <= lastValidIndex) validRightAnswers = this.rightAnswers;
			return validRightAnswers;
		},
		numberChoices() {
			if (this.areInactiveAnswersDisplayed) return Math.max(this.listOptionText.length, this.listOptionValues.length);
			return this.listOptionValues.length;
		},
		numberValidChoices() {
			return this.listOptionValues.length;
		},
		isChoiceMade() {
			return this.selectedChoiceNumber > 0;
		},
		areChoicesClickable() {
			return this.isReadyToTakeAnswers && !this.isChoiceMade;
		},
	},
	methods: {
		getTextOfBox(number) {
			const index = number - 1;
			return this.listOptionText[index];
		},
		indicateReadyToTakeAnswers() {
			this.isReadyToTakeAnswers = true;
			this.$emit('questionAsked');
		},
		revealTheCoices() {
			const stepsInMilliseconds = 10;
			const numberSteps = this.numberValidChoices;
			for (let index = 0; index < numberSteps; index++)
				setTimeout(() => {
					this.revealedChoiceLastNumber += 1;
				}, index * stepsInMilliseconds);
			setTimeout(() => this.indicateReadyToTakeAnswers(), numberSteps * stepsInMilliseconds);
		},
		bundleAnswer(answerIndex) {
			return {
				answerIndex: answerIndex,
				questionCorrectAnswerIndex: this.correctAnswersIndex,
				questionOptionsValues: this.listOptionValues,
				questionOptionsTexts: this.listOptionText,
			};
		},
		handleSelection(number) {
			if (!this.areChoicesClickable) return;
			if (!this.isValidSelection(number)) return;
			this.selectedChoiceNumber = number;
			const selectedIndex = number - 1;
			this.$emit('answered', this.bundleAnswer(selectedIndex));
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

.answer-option {
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

.answer-option.revealed-box {
	background-color: green;
}

.answer-option.revealed-box.selected-box {
	background-color: orange;
}

.vertical-direction {
	flex-direction: column;
}

.is-inactive {
	cursor: default;
}
</style>
