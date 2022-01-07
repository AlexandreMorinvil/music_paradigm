<template>
	<div id="image-options-area" class="image-options-area">
		<div class="options-list">
			<div v-for="row in numberRows" v-bind:key="row" class="choices-row" :class="{ 'vertical-direction': isVertical }">
				<div
					v-for="column in getNumberElementsInRow(row)"
					v-bind:key="column"
					:class="{
						'not-clickable': !areChoicesClickable,
						'not-revealed-box': !(getNumber(row, column) <= revealedChoiceLastNumber),
					}"
					class="choice"
				>
					<img
						v-if="isOptionWithImage(getNumber(row, column))"
						v-on:click="handleSelection(getNumber(row, column))"
						:src="getImageOfOption(getNumber(row, column))"
						:class="{
							'is-active': isValidSelection(getNumber(row, column)),
							'selected-image': getNumber(row, column) === selectedChoiceNumber,
						}"
						alt="No image"
					/>
					<p>
						<span
							v-on:click="handleSelection(getNumber(row, column))"
							:class="{
								'is-active': isValidSelection(getNumber(row, column)),
								'selected-text': getNumber(row, column) === selectedChoiceNumber,
							}"
						>
							{{ getTextOfOption(getNumber(row, column)) }}
						</span>
					</p>
				</div>
			</div>
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
			// DOM rules
			NUMBER_CHOICES_PER_ROW: 3,

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
		...mapGetters(['urlExperimentResource']),
		...mapGetters('experiment', [
			'textSpecification',
			'answerChoicesValue',
			'answerChoicesImage',
			'answerChoicesText',
			'answerChoicesColor',
			'areAnswerOptionsVertical',
			'areInactiveAnswersDisplayed',
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
		listOptionImage() {
			return this.answerChoicesImage;
		},
		listOptionColors() {
			const colors = [];
			if (typeof this.answerChoicesColor === 'string') for (const i in this.optionsValues) colors[i] = this.listOptionValues[i];
			else if (Array.isArray(this.answerChoicesColor)) for (const i in this.answerChoicesColor) colors[i] = this.answerChoicesColor[i];
			return colors;
		},
		numberOptions() {
			if (this.areInactiveAnswersDisplayed) return Math.max(this.listOptionValues.length, this.listOptionText.length, this.listOptionImage.length);
			else return this.listOptionValues.length;
		},
		numberValidOptions() {
			return this.listOptionValues.length;
		},
		isChoiceMade() {
			return this.selectedChoiceNumber > 0;
		},
		areChoicesClickable() {
			return this.isReadyToTakeAnswers && !this.isChoiceMade;
		},
		numberRows() {
			return Math.ceil(this.numberOptions / this.NUMBER_CHOICES_PER_ROW);
		},
	},
	methods: {
		getTextOfOption(number) {
			const index = number - 1;
			return this.listOptionText[index];
		},
		getImageOfOption(number) {
			const index = number - 1;
			return this.urlExperimentResource(this.listOptionImage[index]); // this.listOptionText[index];
		},
		indicateReadyToTakeAnswers() {
			this.isReadyToTakeAnswers = true;
			this.$emit('questionAsked');
		},
		revealTheCoices() {
			const stepsInMilliseconds = 10;
			const numberSteps = this.numberValidOptions;
			for (let index = 0; index < numberSteps; index++)
				setTimeout(() => {
					this.revealedChoiceLastNumber += 1;
				}, index * stepsInMilliseconds);
			setTimeout(() => this.indicateReadyToTakeAnswers(), numberSteps * stepsInMilliseconds);
		},
		bundleAnswer(answerIndex) {
			return {
				answerIndex: answerIndex,
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
		getNumberElementsInRow(row) {
			if (row < this.numberOptions / this.NUMBER_CHOICES_PER_ROW) return this.NUMBER_CHOICES_PER_ROW;
			else return this.numberOptions % this.NUMBER_CHOICES_PER_ROW || this.NUMBER_CHOICES_PER_ROW;
		},
		getNumber(row, column) {
			return (row - 1) * this.NUMBER_CHOICES_PER_ROW + column;
		},
		isValidSelection(number) {
			return number <= this.numberValidOptions;
		},
		isOptionWithImage(number) {
			const index = number - 1;
			return Boolean(this.listOptionImage[index]);
		},
	},
	mounted() {
		setTimeout(() => this.revealTheCoices(), this.DELAY_INITIAL);
	},
};
</script>

<style scoped>
.image-options-area {
	display: flex;
	flex-direction: column;
}

.options-list {
	display: flex;
	flex-direction: column;
	height: 100%;
	flex-grow: 1;
	background-color: rebeccapurple;
}

.choices-row {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	align-content: center;
	justify-content: space-between;
	align-items: center;
	flex-grow: 1;
	align-items: stretch;
}

.specification-text {
	margin: 20px;
	height: 50px;
	text-align: center;
}

.choice {
	background-color: rgb(183, 255, 0);
	margin: 10px;
	border: none;
	display: grid;
	grid-template-rows: 1fr auto;
	text-align: center;
	flex: 1 1 0px;
}

.not-clickable {
	cursor: default;
}

.not-revealed-box {
	opacity: 0.4;
	filter: alpha(opacity=40);
}

.selected-image {
	box-shadow: 0 0 10px orange;
}

.selected-text {
	color: orange;
}

.vertical-direction {
	flex-direction: column;
}

.is-active {
	cursor: pointer;
}

img {
	height: 100%;
	object-fit: contain;
	margin: auto;
}

p {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
