<template>
	<div id="text-area" class="state-section">
		<div class="choices-area" :class="{ 'vertical-direction': isVertical }">
			<button
				v-for="(text, index) in listOptionValues"
				v-bind:key="index"
				v-on:click="handleSelection(index)"
				:style="'background-color:' + listOptionColors[index]"
				:class="{
					'not-clickable': !areChoicesClickable,
					'revealed-box': index <= revealedChoiceLastIndex,
					'selected-box': index === selectedChoiceIndex,
				}"
				class="choice"
			>
				<img :src="getImageOfOption(index)" alt="No image" />
				{{ getTextOfOption(index) }}
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
			selectedChoiceIndex: -1,
			revealedChoiceLastIndex: -1,
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
			const images = [];
			for (const i in this.listOptionValues) images[i] = this.answerChoicesImage[i]; // TODO: Put a placeholder image
			for (const i in this.answerChoicesImage) if (this.answerChoicesImage[i]) images[i] = this.answerChoicesImage[i];
			return images;
		},
		listOptionColors() {
			const colors = [];
			if (typeof this.answerChoicesColor === 'string') for (const i in this.optionsValues) colors[i] = this.listOptionValues[i];
			else if (Array.isArray(this.answerChoicesColor)) for (const i in this.answerChoicesColor) colors[i] = this.answerChoicesColor[i];
			return colors;
		},
		numberOptions() {
			return this.listOptionValues.length;
		},
		isChoiceMade() {
			return this.selectedChoiceIndex > 0;
		},
		areChoicesClickable() {
			return this.isReadyToTakeAnswers && !this.isChoiceMade;
		},
	},
	methods: {
		getTextOfOption(index) {
			return this.listOptionText[index];
		},
		getImageOfOption(index) {
			return this.urlExperimentResource(this.listOptionImage[index]); // this.listOptionText[index];
		},
		indicateReadyToTakeAnswers() {
			this.isReadyToTakeAnswers = true;
			this.$emit('questionAsked');
		},
		revealTheCoices() {
			const stepsInMilliseconds = 10;
			const numberSteps = this.numberOptions;
			for (let index = 0; index < numberSteps; index++)
				setTimeout(() => {
					this.revealedChoiceLastIndex += 1;
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
		handleSelection(index) {
			if (!this.areChoicesClickable) return;
			this.selectedChoiceIndex = index;
			this.$emit('answered', this.bundleAnswer(this.selectedChoiceIndex));
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

.choice {
	background-color: lightgray;
	margin: 10px;
	border: none;
}

.not-clickable {
	cursor: default;
}

.revealed-box {
	background-color: grey;
}

.revealed-box.selected-box {
	background-color: orange;
}

.vertical-direction {
	flex-direction: column;
}
</style>
