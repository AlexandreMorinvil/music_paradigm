<template>
	<div id="app" class="app-grid">
		<alert-component id="alert" v-if="hasAlert" />
		<component :is="navigationBarType" class="app-header app-header-position navigatiobn-bar" id="app-navigation-bar" />
		<router-view class="app-main-position" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertComponent from '@/components/application-component/alert.component.vue';
import NavigationBarDefaultComponent from '@/components/navigation-bar/navigation-bar-default.component.vue';
import NavigationBarExperimentComponent from '@/components/navigation-bar/navigation-bar-experiment.component.vue';

export default {
	components: {
		'default-navigation-bar': NavigationBarDefaultComponent,
		'experiment-navigation-bar': NavigationBarExperimentComponent,
		AlertComponent,
	},
	data() {
		return {
			appInited: false,
			appState: 'default',
		};
	},
	computed: {
		...mapGetters('alert', ['hasAlert']),
		navigationBarType() {
			switch (this.appState) {
				case 'experiment':
					return 'experiment-navigation-bar';
				default:
					return 'default-navigation-bar';
			}
		},
	},
	methods: {
		...mapActions('account', ['resumeLoginStatus']),
		...mapActions('alert', ['clearAlert']),
	},
	created() {
		this.resumeLoginStatus();
	},
	watch: {
		// On change of the route, we reevaluate the state of the application
		$route(to) {
			let state = 'default';
			if (to.matched.some((m) => m.name === 'admin')) state = 'admin';
			else if (to.matched.some((m) => m.name === 'experiment')) state = 'experiment';
			this.appState = state;
		},
	},
};
</script>

<style>
/* To get the application on full screen */
html,
body,
#app {
	height: 100vh;
	overflow: auto;
}

html {
	overflow: auto !important;
}

body {
	font-size: 1.3rem;
	font-family: Arial, Helvetica, sans-serif;
	line-height: 1.4;
	background-color: rgb(0, 0, 0);
	color: white;
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.app-header-position {
	grid-area: header;
	position: sticky;
	top: 0;
	z-index: 1000;
}

.app-main-position {
	grid-area: main;
}

.app-grid {
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'header'
		'main';
	grid-gap: 0px;
}

.app-header {
	width: 100%;
	height: 56px;
	box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0);
	background-color: rgb(25, 25, 25);
}

.navigatiobn-bar {
	border-bottom-color: rgb(35, 35, 35);
	border-bottom-width: 1px;
	border-bottom-style: solid;
}
</style>
