<template>
	<div id="navigation-bar">
		<div class="navigation-bar-wrapper navigation-bar-center">{{ $t('navigation-bar.session-in-progress') }}</div>

		<div class="navigation-bar-wrapper navigation-bar-right">
			<div id="button-leave" class="app-navigation-bar-button" v-on:click="gotToHomePage">{{ $t('navigation-bar.leave') }}</div>
		</div>
	</div>
</template>

<script>
import '@/styles/navigation-bar-template.css';
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
