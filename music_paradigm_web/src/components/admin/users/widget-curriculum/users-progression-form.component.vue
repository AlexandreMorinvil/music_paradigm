<template>
	<div class="form-grid" @submit.prevent>
		<h3>Progression :</h3>
		<overview-table-component :overWrittingProgressionHistory="progressionHistory" />
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapGetters } from 'vuex';

import OverviewTableComponent from '@/components/user/home/overview-table.component.vue';

export default {
	components: {
		OverviewTableComponent,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('users', ['userSelectedProgressionHistory']),
		progressionHistory() {
			return this.userSelectedProgressionHistory;
		}
	},
	methods: {},
};
</script>

<style scoped></style>
