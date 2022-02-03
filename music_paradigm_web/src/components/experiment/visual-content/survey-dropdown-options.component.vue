<template>
	<div id="survey-area" class="state-section state-division-text">
		<table class="survey-table">
			<tr v-for="rowNumber in rowsCount" :key="rowNumber">
				<td v-if="hasLeftSideColumn">{{ leftSideText[rowNumber - 1] }}</td>
				<td>
					<select class="survey-input" v-model="selectionPerRow[rowNumber - 1]">
						<option :value="null" style="text-align: center">&#x25BC;</option>
						<option v-for="(value, index) in valueOptions" :key="index" :value="value" class="survey-option">{{ getOptionText(index) }}</option>
					</select>
				</td>
				<td v-if="hasRightSideColumn">{{ rightSideText[rowNumber - 1] }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			allAnswersAreGiven: false,
			selectionPerRow: [],
		};
	},
	computed: {
		...mapGetters('experiment', [
			'surveyOptionsAreRadio',
			'surveyInputOptionsValues',
			'surveyInputOptionsText',
			'surveyLeftSideText',
			'surveyRightSideText',
		]),
		hasSurvey() {
			return this.surveyInputOptionsValues.length > 0;
		},
		hasColumnHeaders() {
			return this.surveyInputOptionsText.length > 0;
		},
		hasLeftSideColumn() {
			return this.surveyLeftSideText.length > 0;
		},
		hasRightSideColumn() {
			return this.surveyRightSideText.length > 0;
		},
		rowsCount() {
			return Math.max(this.surveyLeftSideText.length, this.surveyRightSideText.length);
		},
		optionsCount() {
			return this.surveyInputOptionsValues.length;
		},
		leftSideText() {
			const leftSideText = [];
			for (let i = 0; i < this.rowsCount; i++) leftSideText.push(this.surveyLeftSideText[i] || '');
			return leftSideText;
		},
		rightSideText() {
			const rightSideText = [];
			for (let i = 0; i < this.rowsCount; i++) rightSideText.push(this.surveyRightSideText[i] || '');
			return rightSideText;
		},
		valueOptions() {
			return this.surveyInputOptionsValues;
		},
		isRadioOptions() {
			return this.surveyOptionsAreRadio;
		},
		sideText() {
			const sideText = [];
			for (let i = 0; i < this.rowsCount; i++) {
				const leftSideText = String(this.surveyLeftSideText[i] || '');
				const rightSideText = String(this.surveyRightSideText[i] || '');
				if (Boolean(leftSideText) || Boolean(rightSideText)) sideText.push(leftSideText + '||' + rightSideText);
				else sideText.push('');
			}
			return sideText;
		},
		context() {
			return {
				surveyOptions: this.surveyInputOptionsValues,
				surveyHeader: this.surveyInputOptionsText,
				surveySideText: this.sideText,
			};
		},
		answers() {
			return this.selectionPerRow;
		},
	},
	methods: {
		getOptionText(index) {
			return index > this.surveyInputOptionsText.length ? this.surveyInputOptionsText[index] : this.surveyInputOptionsValues[index];
		},
	},
	beforeMount() {
		if (this.isRadioOptions) this.selectionPerRow = new Array(this.rowsCount).fill(null);
		else this.selectionPerRow = new Array(this.rowsCount).fill([]);
	},
	watch: {
		selectionPerRow: {
			immediate: true,
			deep: true,
			handler: function () {
				if (this.selectionPerRow.includes(null)) this.allAnswersAreGiven = false;
				else this.allAnswersAreGiven = true;
			},
		},
	},
};
</script>

<style scoped>
.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}

.centering {
	width: 60%;
}

.survey-header {
	padding-bottom: 25px;
}

.survey-table {
	width: 90%;
	margin: 30px 0;
}

.survey-input {
	width: 75%;
	max-width: 700px;
	font-size: 0.8em;
	text-align: center;
	margin: 10px;
	padding-left: 20px;
	padding-right: 20px;
}
</style>
