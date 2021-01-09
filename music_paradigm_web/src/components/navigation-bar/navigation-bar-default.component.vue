<template>
	<div id="navigation-bar">
		<div v-if="isLoggedIn" class="navigation-bar-left navigation-bar-wrapper">
			<svg class="home-button app-navigation-bar-button" v-on:click="goToHomePage">
				<use xlink:href="app-sprites.svg#icon-home" />
			</svg>
			<p>Welcome {{ fullName }}</p>
		</div>

		<div class="navigation-bar-center navigation-bar-wrapper">
			<p>Music Paradigm</p>
		</div>

		<div v-if="isLoggedIn" class="navigation-bar-right navigation-bar-wrapper">
			<div id="button-leave" class="app-navigation-bar-button" v-on:click="handleLogout">Logout</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { routerNavigation } from '@/_helpers';

import '@/styles/navigation-bar-template.css';

export default {
	computed: {
		...mapGetters('account', ['isLoggedIn', 'fullName']),
	},
	methods: {
		...mapActions('account', ['logout']),
		handleLogout() {
			this.logout();
		},
		goToHomePage() {
			routerNavigation.goToRootPage();
		},
	},
};
</script>

<style scoped>
.home-button {
	padding: 10px;
	height: 100%;
	width: 80px;
	margin-right: 10px;
	border-left-style: none;
	fill: rgb(200, 200, 0);
}
</style>
