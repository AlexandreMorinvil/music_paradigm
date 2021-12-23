<template>
	<div class="form-grid" @submit.prevent>
		<overview-table-component :overWrittingProgressionHistory="history" v-on:sessionSelected="setSession" ref="progressionHistory" />
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
		return {
			wasAdjustmentModified: false,
		};
	},
	computed: {
		...mapGetters('users', ['userSelectedProgressionHistory']),
		history() {
			return this.userSelectedProgressionHistory;
		},
	},
	methods: {
		setSession(session) {
			console.log(session);
		},
	},
};
</script>

<style scoped></style>
