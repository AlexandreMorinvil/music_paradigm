<template>
	<label class="form-label"> {{ text }} </label>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default() {
				return '';
			},
		}
	}
};
</script>

<style scoped>
.form-label{
	width: 300px;
	text-align: right;
	padding-right: 25px;
}
</style>
