<template>
	<div id="status-bar" class="status-bar-grid" :class="hasMainArea ? 'grid-with-main-area' : 'grid-without-main-area'">
		<div id="status-bar-header" v-show="hasMainArea" class="status-bar-header-position" :class="{ 'status-bar-clear': isClearVersion }">
			<time-status-component
				v-show="mustDisplayTime"
				class="status-bar-display-box status-wrapper-left"
				:class="{ 'status-bar-display-box-clear': isClearVersion }"
				ref="timer"
			/>
			<piano-status-component
				v-if="hasPianoStatus"
				class="status-bar-display-box status-wrapper-right"
				:class="{ 'status-bar-display-box-clear': isClearVersion }"
			/>
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
		...mapGetters('experiment', ['midiName', 'referenceKeyboardKeys', 'controlType', 'withProgressionBar', 'withTimer', 'hasClearBackground']),
		hasPianoStatus() {
			return this.controlType === 'piano';
		},
		mustDisplayTime() {
			return this.withTimer;
		},
		hasProgressionBar() {
			if (typeof this.withProgressionBar !== 'boolean') return true;
			else return this.withProgressionBar;
		},
		hasMainArea() {
			return this.hasPianoStatus || this.mustDisplayTime;
		},
		isClearVersion() {
			return this.hasClearBackground;
		},
	},
	methods: {
		start() {
			this.$refs.timer.startTimer();
		},
		recordTime() {
			this.$refs.timer.recordTime();
		},
	},
};
</script>

<style>
.status-bar-grid {
	display: grid;
	grid-template-columns: auto;
	grid-gap: 0px;
}

.grid-with-main-area {
	grid-template-rows: 64px 10px;
	grid-template-areas:
		'header'
		'progress';
}

.grid-without-main-area {
	grid-template-rows: 10px;
	grid-template-areas: 'progress';
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

.status-bar-display-box-clear {
	background-color: rgb(250, 250, 255);
	border-color: rgb(235, 235, 235);
	color: rgb(150, 150, 150);
}

.status-bar-clear {
	background-color: rgb(235, 235, 235);
}
</style>
