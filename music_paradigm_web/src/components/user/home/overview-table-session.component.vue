<template>
	<button class="container">
		<div class="number-label">{{ index + 1 }}</div>
		<div>{{ title }}</div>
	</button>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		index: { type: Number, default: -1 },
		session: { type: Object, default: null },
	},
	computed: {
		title() {
			return this.session.title;
		},
	},
};
</script>

<style scoped>
.container {
	width: 200px;
	height: 200px;
}
</style>
