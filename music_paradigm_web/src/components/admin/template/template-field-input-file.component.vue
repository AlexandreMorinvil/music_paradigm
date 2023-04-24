<template>
	<div class="template-field-input-area">
		<input class="input-spacing" :class="{
			'invalid-input': isInvalid,
		}" type="text" readonly v-on:click="handleClick" :value="name" />
		<input type='file' v-on:input="(event) => edit(event)" v-bind="inputAttributes" ref="fileInput" />
	</div>
</template>

<script>
import '@/styles/field-template.css';

export default {
	emits: ['edit'],
	props: {
		// The file or the filename can be provided. (They should not be used both at the same time)
		file: {
			type: File,
			default: null,
		},
		fileName: {
			type: String,
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
		name() {
			return this.file?.name ?? this.fileName ?? 'No file chosen';
		},
	},
	methods: {
		edit(event) {
			const filesList = event.target.files;
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
