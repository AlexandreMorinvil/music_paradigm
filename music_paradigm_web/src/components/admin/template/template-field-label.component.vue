<template>
	<label class="form-label output-spacing"> {{ text }} </label>
</template>

<script>
import '@/styles/field-template.css';

export default {
	props: {
		text: {
			type: String,
			default: '',
		}
	}
};
</script>

<style scoped>
.form-label {
	width: 400px;
	text-align: right;
	padding-right: 25px;
}
</style>
