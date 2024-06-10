<template>
	<div id="survey-area" class="state-section state-division-text">
		<template v-for="(_, index) in texts">
			<textarea
				:key="index"
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
		</template>
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
				this.texts = new Array(this.writtingTextAreasNumber || 1).fill("");
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

.centering {
	width: 60%;
}
</style>
