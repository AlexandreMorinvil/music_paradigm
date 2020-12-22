<template>
	<div class="user-page-grid">
		<div id="user-main" class="fill">
			<router-view />
		</div>
		<application-footer> </application-footer>
	</div>
</template>

<script>
import ApplicationFooter from '@/components/ApplicationFooter.vue';

export default {
	components: {
		applicationFooter: ApplicationFooter,
	},
	data() {
		return {
			activePage: 'undefined',
		};
	},
	watch: {
		// On change of the route, we reevaluate the current page
		$route: {
			immediate: true,
			handler(to) {
				let currentPage = 'undefined';
				const pageList = ['home', 'experiments', 'account'];
				for (const i in pageList) {
					const page = pageList[i];
					if (to.name === `user.${page}`) {
						currentPage = page;
					}
				}
				this.activePage = currentPage;
			},
		},
	},
};
</script>

<style scoped>
.user-page-grid {
	display: grid;
	height: 100%;
	width: 100%;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr auto;
}

.fill {
	height: 100%;
	width: 100%;
}
</style>
