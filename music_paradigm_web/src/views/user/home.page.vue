<template>
	<user-page-content-frame-component title="Home">
		<div class="home-page-grid">
			<div class="area-button">
				<due-experiment-button-component class="button" />
			</div>
			<div class="area-overview">
				<overview-table />
			</div>
		</div>
	</user-page-content-frame-component>
</template>

<script>
import { mapActions } from 'vuex';

import DueExperimentButtonComponent from '@/components/user/home/due-experiment-button.component.vue';
import OverviewTable from '@/components/user/home/overview-table.vue';
import UserPageContentFrameComponent from '@/components/content-frame/user-page-content-frame.component.vue';

export default {
	components: {
		UserPageContentFrameComponent,
		overviewTable: OverviewTable,
		DueExperimentButtonComponent,
	},
	data() {
		return {};
	},
	computed: {},
	methods: {
		...mapActions('account', ['fetchProgressionSummary']),
	},
	beforeMount() {
		this.fetchProgressionSummary();
	},
};
</script>

<style scoped>
.home-page-grid {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: 1fr;
	grid-template-rows: 4fr 6fr;
	grid-template-areas:
		'button'
		'overview';
	height: 100%;
	width: 100%;
}

.area-overview {
	grid-area: overview;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
}

.area-button {
	grid-area: button;
	display: flex;
	justify-content: center;
	align-items: center;
}

.button {
	width: 75%;
}
</style>
