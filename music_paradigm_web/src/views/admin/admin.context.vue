<template>
	<div class="page-grid">
		<div id="sidebar" class="sidebar-position sidebar">
			<router-link :to="{ name: 'admin.home' }" :class="{ currentLink: activePage === 'home' }">Home</router-link>
			<router-link :to="{ name: 'admin.users' }" :class="{ currentLink: activePage === 'users' }">Users</router-link>
			<router-link :to="{ name: 'admin.experiments' }" :class="{ currentLink: activePage === 'experiments' }">Experiments</router-link>
			<router-link :to="{ name: 'admin.curriculums' }" :class="{ currentLink: activePage === 'curriculums' }">Curriculums</router-link>
			<router-link :to="{ name: 'admin.ressources' }" :class="{ currentLink: activePage === 'ressources' }">Ressources</router-link>
			<!-- <router-link :to="{ name: 'admin.data' }" :class="{ currentLink: activePage === 'data' }">Data</router-link>
			<router-link :to="{ name: 'admin.account' }" :class="{ currentLink: activePage === 'account' }">Account</router-link> -->
		</div>
		<div id="user-main" class="main-position">
			<router-view class="main-display" />
		</div>
	</div>
</template>

<script>
import '@/styles/loggedInPageTemplate.css';

export default {
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
				const pageList = ['home', 'users', 'experiments', 'curriculums', 'ressources', 'data', 'account'];
				for (const i in pageList) {
					const page = pageList[i];
					if (to.name === `admin.${page}`) {
						currentPage = page;
					}
				}
				this.activePage = currentPage;
			},
		},
	},
};
</script>

<style scoped></style>
