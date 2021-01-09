<template>
	<div id="navigation-bar">
		<div class="navigation-bar-wrapper navigation-bar-center">Session in progress</div>

		<div class="navigation-bar-wrapper navigation-bar-right">
			<button id="button-leave" class="app-navigation-bar-button" v-on:click="gotToHomePage">Leave</button>
		</div>
	</div>
</template>

<script>
import '@/styles/navigationBarTemplate.css';
import { routerNavigation } from '@/_helpers';

export default {
	methods: {
		gotToHomePage() {
			routerNavigation.goToRootPage();
		},
	},
};
</script>

<style scoped></style>
