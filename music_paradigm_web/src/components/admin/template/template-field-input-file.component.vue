<template>
	<div class="template-field-input-area">
		<input class="input-spacing" :class="{
			'invalid-input': isInvalid,
		}" type="text" readonly value="fileName" v-on:click="handleClick" :value="fileName" />
		<input type='file' v-on:input="(event) => edit(event)" v-bind="inputAttributes" ref="fileInput" />
	</div>
</template>

<script>
import '@/styles/field-template.css';

export default {
	emits: ['edit'],
	props: {
		file: {
			type: File,
			default: null,
		},
		inputAttributes: {
			type: Object,
			default() {
				return {
					type: 'file',
					name: 'file-input',
					placeholder: ''
				}
			}
		},
		isNullValid: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		hasNoValue() {
			return this.value === null || this.value === undefined || this.value === '';
		},
		isInvalid() {
			return this.hasNoValue && !this.isNullValid;
		},
		fileName() {
			return this.file?.name ?? 'No file chosen';
		},
	},
	methods: {
		edit(event) {
			const filesList = event.target.files;
			console.log(filesList[0]);
			this.$emit('edit', filesList);
		},
		handleClick() {
			this.$refs.fileInput.click();
		},
	}
};
</script>

<style scoped>
input[type=file] {
	display: none;
}

input {
	width: 100%;
}

.template-field-input-area {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
}
</style>
