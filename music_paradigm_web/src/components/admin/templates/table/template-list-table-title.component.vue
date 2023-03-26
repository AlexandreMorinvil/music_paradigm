<template>
	<div class="table-title-header">
		<h3>
			{{ title }}
		</h3>
	</div>
</template>

<script>
import '@/styles/table-template.css';

export default {
	props: {
		title: {
			type: String,
			default: 'Title',
		},
	},
};
</script>

<style scoped></style>
