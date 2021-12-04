<template>
	<div id="navigation-bar" :class="{ 'clear-navigation-bar': isClearVersion }">
		<div class="navigation-bar-wrapper navigation-bar-center"></div>

		<div class="navigation-bar-wrapper navigation-bar-right">
			<div id="button-leave" class="app-navigation-bar-button" v-on:click="gotToHomePage">{{ $t('navigation-bar.leave') }}</div>
		</div>
	</div>
</template>

<script>
import '@/styles/navigation-bar-template.css';
import { mapGetters } from 'vuex';
import { routerNavigation } from '@/_helpers';

export default {
	computed: {
		...mapGetters('experiment', ['hasClearBackground']),
		isClearVersion() {
			return this.hasClearBackground;
		}
	},
	methods: {
		gotToHomePage() {
			routerNavigation.goToRootPage();
		},
	},
};
</script>

<style scoped>
.clear-navigation-bar  {
	background-color: rgb(215, 215, 215);
	border-color: rgb(205, 205, 205);
	color: rgb(15, 15, 15);
	border-bottom-color: rgb(220, 220, 220);
}

.clear-navigation-bar * {
	border-color: rgb(205, 205, 205);
	color: rgb(155, 155, 155);
}
</style>
