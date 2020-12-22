<template>
	<div>
		{{ message }}
	</div>
</template>

<script>
export default {
	props: {
		message: {
			type: String,
			default() {
				return '';
			},
		},
	},
};
</script>

<style scoped></style>
