<template>
	<div id="status-bar" class="status-bar-grid">
		<div id="status-bar-header" class="status-bar-header-position">
			<time-status-component class="status-bar-display-box status-wrapper-left" ref="timer" />
			<piano-status-component v-if="hasPianoStatus" class="status-bar-display-box status-wrapper-right" />
		</div>

		<progress-status-component v-if="hasProgressionBar" class="status-bar-progress-position" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import PianoStatusComponent from './piano-status.component.vue';
import ProgressStatusComponent from './progress-status.component.vue';
import TimeStatusComponent from './time-status.component.vue';

export default {
	components: {
		PianoStatusComponent,
		TimeStatusComponent,
		ProgressStatusComponent,
	},
	computed: {
		...mapGetters('experiment', ['midiName', 'referenceKeyboardKeys', 'controlType', 'withProgressionBar']),
		hasPianoStatus() {
			return this.controlType === 'piano';
		},
		hasProgressionBar() {
			if (typeof this.withProgressionBar !== 'boolean') return true;
			else return this.withProgressionBar;
		},
	},
	methods: {
		start() {
			this.$refs.timer.startTimer();
		},
	},
};
</script>

<style>
.status-bar-grid {
	display: grid;
	grid-template-columns: auto;
	grid-template-rows: 64px 10px;
	grid-template-areas:
		'header'
		'progress';
	grid-gap: 0px;
}

.status-bar-header-position {
	grid-area: header;
	background-color: rgb(30, 30, 30);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.status-bar-progress-position {
	grid-area: progress;
}

.status-bar-display-box {
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	overflow: hidden;

	border-radius: 5px;
	border-color: rgb(35, 35, 35);
	border-width: 0 2px 0;
	border-style: solid;

	background-color: rgb(15, 15, 15);
	color: rgb(220, 220, 220);

	height: 85%;
	width: 15%;
	min-width: 100px;
	padding: 0 20px 0;
	margin: 0 10px 0;

	font-size: 25px;
	line-height: 0.7;
}

.status-wrapper {
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: space-between;

	height: 100%;
	width: 100%;
}
</style>
