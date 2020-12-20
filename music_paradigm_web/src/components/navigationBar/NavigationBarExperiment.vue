<template>
  <div id="navigation-bar">
    <div id="wrapper-left" class="navigation-bar-wrapper"></div>

    <div id="wrapper-center" class="navigation-bar-wrapper">Experiment in progress</div>

    <div id="wrapper-right" class="navigation-bar-wrapper">
      <div id="button-leave" class="app-navigation-bar-button" v-on:click="gotToHomePage">Leave</div>
    </div>
  </div>
</template>

<script>
import'@/styles/navigationBarTemplate.css';
import{ routerNavigation } from'@/_helpers';

export default{
	'name': 'NavigationBarExperiment',
	'components': {},
	data() {
		return{};
	},
	'computed': {},
	'methods': {
		gotToHomePage() {
			routerNavigation.goToRootPage();
		}
	},
	beforeMount() {},
	mounted() {},
	beforeDestroy() {},
	destroyed() {},
	'watch': {}
};
</script>

<style scoped>
</style>
