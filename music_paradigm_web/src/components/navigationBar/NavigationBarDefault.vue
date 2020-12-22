<template>
	<div id="navigation-bar">
		<div id="wrapper-left" class="navigation-bar-wrapper">
			<div id="connected-user" v-if="isLoggedIn">Welcome {{ fullName }}</div>
		</div>

		<div id="wrapper-center" class="navigation-bar-wrapper">Music Paradigm</div>

		<div id="wrapper-right" class="navigation-bar-wrapper">
			<div id="button-leave" v-if="isLoggedIn" class="app-navigation-bar-button" v-on:click="handleLogout">Logout</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
	},
};
</script>

<style scoped>
#wrapper-left:first-child div {
	padding-left: 20px;
	font-size: inherit;
}
</style>
