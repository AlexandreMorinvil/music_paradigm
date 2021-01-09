<template>
	<div id="navigation-bar">
		<div v-if="isLoggedIn" class="navigation-bar-wrapper">
			<svg class="home-button app-navigation-bar-button" v-on:click="goToHomePage">
				<use xlink:href="app-sprites.svg#icon-home" />
			</svg>
			<p>Welcome {{ fullName }}</p>
		</div>

		<div id="wrapper-center" class="navigation-bar-wrapper">Music Paradigm</div>

		<div id="wrapper-right" class="navigation-bar-wrapper">
			<div id="button-leave" v-if="isLoggedIn" class="app-navigation-bar-button" v-on:click="handleLogout">Logout</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { routerNavigation } from '@/_helpers';

import '@/styles/navigationBarTemplate.css';

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
#wrapper-left:first-child {
	font-size: inherit;
}

.home-button {
	padding: 10px;
	height: 100%;
	width: 80px;
	margin-right: 10px;
	border-left-style: none;
	fill: rgb(200, 200, 0);
}
</style>
