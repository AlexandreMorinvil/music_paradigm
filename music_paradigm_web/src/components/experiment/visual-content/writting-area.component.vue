<template>
	<div id="survey-area" class="state-section state-division-text">
		<div v-for="(_, index) in texts" :key="index" class="text-input-area">
			<button 
				v-if="hasVariableNumberOfInputs && !hasMinNumberInputs" 
				class="delete-textarea-button"
				v-on:click="() => deleteTextArea(index)"
			>-</button>
			<textarea
				class="text-input"
				id="text-input"
				name="text-input"
				cols="50"
				:autofocus="index == 0"
				:rows="rowsOfInput"
				:maxlength="maxNumberCharacters"
				:placeholder="placeHolder"
				v-model="texts[index]"
			/>
		</div>
		<button 
			v-if="hasVariableNumberOfInputs && !hasMaxNumberInputs" 
			class="add-text-area-button"
			v-on:click="addTextArea"
		>+</button>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			texts: [''],
			text: [''],
			multipleLinesCount: 8,
		};
	},
	computed: {
		...mapGetters('experiment', [
			'writtingMaxCharacters',
			'writtingMinCharacters',
			'writtingIsNumber',
			'writtingIsMultiline',
			'writtingTextPlaceHolder',
			'writtingTextAreasNumber',
			'writtingTextAreasMax',
			'writtingTextAreasMin',
		]),
		isTextInput() {
			return !this.writtingIsNumber;
		},
		rowsOfInput() {
			return this.writtingIsMultiline ? this.multipleLinesCount : 1;
		},
		maxNumberCharacters() {
			return this.writtingMaxCharacters || null;
		},
		placeHolder() {
			return this.writtingTextPlaceHolder || '...';
		},
		textLength() /* Exported */ {
			const lengthOfEachTextArea = this.texts.map((text) => text.length);
			return Math.min(...lengthOfEachTextArea);
		},
		hasVariableNumberOfInputs() {
			return this.writtingMinCharacters > 0 || this.writtingMaxCharacters > 1;
		},
		hasMaxNumberInputs() {
			return this.writtingTextAreasMax && this.texts.length >= this.writtingTextAreasMax;
		},
		hasMinNumberInputs() {
			return this.texts.length <= this.writtingTextAreasMin;
		},
		context() {
			return {
				writtingMaxCharacters: this.writtingMaxCharacters,
				writtingMinCharacters: this.writtingMinCharacters,
				writtingIsNumber: this.writtingIsNumber,
			};
		},
		answer() {
			return this.texts;
		},
	},
	methods: {
		addTextArea() {
			console.log("this.texts.length < this.writtingTextAreasMax", this.texts.length < this.writtingTextAreasMax)
			if (this.texts.length < this.writtingTextAreasMax);
				this.texts.push("");
		},
		deleteTextArea(index) {
			if (this.texts.length > this.writtingTextAreasMin)
				this.texts.splice(index, 1);
		},
		removeNonNumberCaracters() {
			const invalidChars = /[^0-9]/gi;
			for (const index in this.texts) {
				if (invalidChars.test(this.texts[index])) {
					this.texts[index] = this.texts[index].replace(invalidChars, '');
				}
			}
		},
	},
	watch: {
		texts: {
			deep: true,
			handler: function () {
				if (!this.isTextInput) this.removeNonNumberCaracters();
			},
		},
		writtingTextAreasNumber: {
			immediate: true,
			handler: function () {
				const textAreasNumber = this.writtingTextAreasNumber ?? 0;
				this.texts = new Array(textAreasNumber || 1).fill("");
			},
		},
	},
};
</script>

<style scoped>
.state-section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
}

.text-input {
	margin: 20px;
	padding: 10px;
}

textarea {
	resize: none;
	background-color: rgb(245, 245, 245);
}

.add-text-area-button {
	border-radius: 10px;
	height: 40px;
	width: 40px;
	font-size: 20px;
}

.delete-textarea-button {
	border-radius: 10px;
	height: 40px;
	width: 40px;
	font-size: 20px;
}

.text-input-area {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.centering {
	width: 60%;
}
</style>
