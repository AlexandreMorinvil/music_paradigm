<template>
	<div id="survey-area" class="state-section state-division-text">
		<textarea
			class="text-input"
			id="text-input"
			name="text-input"
			cols="50"
			autofocus
			:rows="rowsOfInput"
			:maxlength="maxNumberCharacters"
			:placeholder="placeHolder"
			v-model="text"
		/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			text: '',
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
		]),
		isTextInput() {
			return !this.writtingIsNumber;
		},
		rowsOfInput() {
			return this.writtingIsMultiline ? this.multipleLinesCount : 1;
		},
		maxNumberCharacters() {
			return this.writtingMaxCharacters;
		},
		placeHolder() {
			return this.writtingTextPlaceHolder || '...';
		},
		textLength() {
			return this.text.length;
		},
		context() {
			return {
				writtingMaxCharacters: this.writtingMaxCharacters,
				writtingMinCharacters: this.writtingMinCharacters,
				writtingIsNumber: this.writtingIsNumber,
			};
		},
		answer() {
			return this.text;
		},
	},
	methods: {
		removeNonNumberCaracters() {
			const invalidChars = /[^0-9]/gi;
			if (invalidChars.test(this.text)) {
				this.text = this.text.replace(invalidChars, '');
			}
		},
	},
	watch: {
		text: {
			handler: function () {
				if (!this.isTextInput) this.removeNonNumberCaracters();
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
