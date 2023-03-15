<template>
	<div id="survey-area" class="state-section state-division-text">
		<table class="survey-table">
			<tr v-if="hasColumnHeaders">
				<th class="survey-header" v-for="(header, index) in columnHeaders" :key="index">{{ header }}</th>
			</tr>
			<tr v-for="rowNumber in rowsCount" :key="rowNumber">
				<td v-if="hasLeftSideColumn" class="left-title">{{ leftSideText[rowNumber - 1] }}</td>
				<td v-for="columnNumber in columnsCount" :key="columnNumber">
					<input
						:type="isRadioOptions ? 'radio' : 'checkbox'"
						:name="'question-' + rowNumber"
						:value="valueOptions[columnNumber - 1]"
						class="survey-input"
						v-model="selectionPerRow[rowNumber - 1]"
					/>
				</td>
				<td v-if="hasRightSideColumn" class="right-title">{{ rightSideText[rowNumber - 1] }}</td>
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
		columnHeaders() {
			const columnTitles = [];
			if (this.hasLeftSideColumn) columnTitles.push(''); // Add empty title if there is a leftside column
			for (let i = 0; i < this.columnsCount; i++) columnTitles.push(this.surveyInputOptionsText[i] || ''); // Add the specified column titles
			if (this.hasRightSideColumn) columnTitles.push(''); // Add enpty title if there is a rightside column

			return columnTitles;
		},
		rowsCount() {
			return Math.max(this.surveyLeftSideText.length, this.surveyRightSideText.length);
		},
		columnsCount() {
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
				isSurveyRadio: this.surveyOptionsAreRadio,
				surveyOptions: this.surveyInputOptionsValues,
				surveyHeader: this.surveyInputOptionsText,
				surveySideText: this.sideText,
			};
		},
		answers() {
			return this.selectionPerRow;
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
				let allAnswersAreGiven = true;
				for (const answer of this.selectionPerRow) {
					if (this.isRadioOptions && answer === null) allAnswersAreGiven = false;
					else if (!this.isRadioOptions && !answer.length > 0) allAnswersAreGiven = false;
				}
				this.allAnswersAreGiven = allAnswersAreGiven;
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
	padding-left: 20px;
	padding-right: 20px;
}

.survey-table {
	margin: 30px 0;
	max-width: 90%;
}

.survey-input {
	width: 1em;
	height: 1em;
	margin: 10px 20px;
}

.left-title {
	padding-right: 20px;
}

.right-title {
	padding-left: 20px;
}
</style>
