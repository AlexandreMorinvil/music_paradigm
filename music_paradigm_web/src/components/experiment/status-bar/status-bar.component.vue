<template>
	<div id="status-bar" class="status-bar-grid">
		<div id="status-bar-header" class="status-bar-header-position">
			<div class="status-wrapper status-wrapper-left">
				<time-status-component class="status-bar-display-box" ref="timer" />
			</div>

			<div class="status-wrapper status-wrapper-center">
				<state-status-component id="current-state-box" class="status-bar-display-box wrapped-display" :isCurrentStateRequested="true" />
				<state-status-component id="next-state-box" class="status-bar-display-box wrapped-display" :isCurrentStateRequested="false" />
			</div>

			<div class="status-wrapper status-wrapper-right">
				<piano-status-component v-if="hasPianoStatus" class="status-bar-display-box" />
			</div>
		</div>

		<progress-status-component class="status-bar-progress-position" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import PianoStatusComponent from './piano-status.component.vue';
import ProgressStatusComponent from './progress-status.component.vue';
import StateStatusComponent from './state-status.component.vue';
import TimeStatusComponent from './time-status.component.vue';

export default {
	components: {
		PianoStatusComponent,
		StateStatusComponent,
		TimeStatusComponent,
		ProgressStatusComponent,
	},
	computed: {
		...mapGetters('experiment', ['midiName', 'referenceKeyboardKeys', 'controlType']),
		hasPianoStatus() {
			return this.controlType === 'piano';
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
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	background-color: rgb(30, 30, 30);
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
	justify-content: center;

	height: 100%;
	width: 100%;
}

.status-wrapper-left {
	justify-content: flex-start;
}

.status-wrapper-center {
	justify-content: center;
}

.status-wrapper-right {
	justify-content: flex-end;
}
</style>
