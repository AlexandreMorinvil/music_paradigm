<template>
	<user-page-content-frame-component :title="$t('views.user.home.home')">
		<div class="home-page-flex">
			<!-- <due-experiment-button-component class="button" /> -->
			<overview-table-component class="overview-table" />
		</div>
	</user-page-content-frame-component>
</template>

<script>
import { mapActions } from 'vuex';

// import DueExperimentButtonComponent from '@/components/user/home/due-experiment-button.component.vue';
import OverviewTableComponent from '@/components/user/home/overview-table.component.vue';
import UserPageContentFrameComponent from '@/components/content-frame/user-page-content-frame.component.vue';

export default {
	components: {
		UserPageContentFrameComponent,
		OverviewTableComponent,
		// DueExperimentButtonComponent,
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
.home-page-flex {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.button {
	width: 75%;
	margin-bottom: 50px;
	margin-top: 50px;
}

.overview-table {
	width: 95%;
}
</style>
