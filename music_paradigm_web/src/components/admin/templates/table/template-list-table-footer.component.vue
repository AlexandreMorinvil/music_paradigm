<template>
	<div class="table-results-footer">
		<span>
			Showing {{ entitiesCount }} item(s)
		</span>
	</div>
</template>

<script>
import '@/styles/table-template.css';

export default {
	props: {
		entitiesCount: {
			type: Number,
			default: null,
		},
	},
	computed: {
		
	}
};
</script>

<style scoped></style>
