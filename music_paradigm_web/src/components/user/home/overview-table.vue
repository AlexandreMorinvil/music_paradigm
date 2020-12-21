<template>
	<div class="table-context" :style="'--elements-per-row:' + elementsPerRow">
		<button v-for="(summary, index) in progressionSummary" :key="index" class="summary">
			<span class="number-label">
				{{ index + 1 }}
			</span>

			{{ summary.title }}
		</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'OverviewTable',
	data() {
		return {};
	},
	computed: {
		...mapGetters('account', ['progressionSummary']),
		elementsPerRow() {
			const elementsCount = this.progressionSummary.length;
			if (elementsCount <= 7) return Math.min(7, elementsCount);
			if (elementsCount <= 10) return 5;
			if (elementsCount <= 12) return 6;
			if (elementsCount <= 14) return 7;
			if (elementsCount <= 18) return 6;
			if (elementsCount <= 21) return 7;
			if (elementsCount <= 24) return 6;
			else return 7;
		},
	},
	methods: {},
	beforeMount() {},
	mounted() {},
	watch: {},
};
</script>

<style scoped>
.table-context {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat(var(--elements-per-row), 1fr);
	padding: 20px;
	background-color: rgb(10, 10, 10);

	border-radius: 10px;
	border-style: solid;
	border-width: 5px;
	border-color: rgb(30, 30, 30);
}

.summary {
	position: relative;
	padding: 10px;
}

.number-label {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
