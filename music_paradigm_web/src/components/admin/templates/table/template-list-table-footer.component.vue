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

<style scoped>
.table-results-footer {
	display: flex;
	align-items: center;
	background-color: rgb(225, 225, 230);
	border: solid rgb(210, 210, 215) 2px;
	border-radius: 0 0 10px 10px;
	color: rgb(25, 25, 25);
	height: 70px;
	padding: 30px;
}
</style>
