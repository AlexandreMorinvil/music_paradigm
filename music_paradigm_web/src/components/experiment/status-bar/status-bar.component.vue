<template>
	<div id="status-bar" class="status-bar-grid">
		<div id="status-bar-header" class="status-bar-header-position">
			<div id="timer-box" class="status-bar-display-box">
				<time-status-component ref="timer" />
			</div>

			<div id="center-wrapper">
				<div id="current-state-box" class="status-bar-display-box wrapped-display">
					<svg id="icon-current-state" class="icon-state">
						<use :xlink:href="currentStateIcon" />
					</svg>
					{{ currentStateType }}
				</div>
				<div id="next-state-box" class="status-bar-display-box wrapped-display">
					<svg id="icon-current-state" class="icon-state">
						<use :xlink:href="nextStateIcon" />
					</svg>
					{{ nextStateType }}
				</div>
			</div>

			<div id="piano-box" class="status-bar-display-box">
				<piano :display="true" />
			</div>
		</div>

		<progress-status-component class="status-bar-progress-position" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import ExperimentPiano from '@/components/piano/piano-input-handler.component.vue';
import ProgressStatusComponent from './progress-status.component.vue';
import TimeStatusComponent from './time-status.component.vue';

export default {
	components: {
		piano: ExperimentPiano,
		TimeStatusComponent,
		ProgressStatusComponent,
	},
	computed: {
		...mapGetters('experiment', ['currentStateType', 'nextStateType', 'midiName', 'timeLimitInSeconds']),
		currentStateIcon() {
			return this.getIconReference(this.currentStateType);
		},
		nextStateIcon() {
			return this.getIconReference(this.nextStateType);
		},
	},
	methods: {
		start() {
			this.$refs.timer.startTimer();
		},
		getIconReference(stateType) {
			const iconFileName = 'sprites.svg#';
			switch (stateType) {
				case 'cue':
					return iconFileName + 'icon-volume-high';
				case 'end':
					return iconFileName + 'icon-finish';
				case 'feedback':
					return iconFileName + 'icon-check-circle';
				case 'introduction':
					return iconFileName + 'icon-location';
				case 'instruction':
					return iconFileName + 'icon-info';
				case 'playing':
					return iconFileName + 'icon-piano';
				case 'rest':
					return iconFileName + 'icon-pause';
				case 'video':
					return iconFileName + 'icon-film';
				default:
					return iconFileName + 'icon-three-dots';
			}
		},
	},
};
</script>

<style>
.status-bar-header-position {
	grid-area: header;
}
.status-bar-progress-position {
	grid-area: progress;
}
.status-bar-grid {
	display: grid;
	grid-template-columns: auto;
	grid-template-rows: 64px 10px;
	grid-template-areas:
		'header'
		'progress';
	grid-gap: 0px;
}

#status-bar-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgb(30, 30, 30);
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
#center-wrapper {
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;

	height: 100%;
	width: 50%;
}

.wrapped-display {
	width: 30%;
}

.icon-state {
	display: inline-block;
	margin: 0 5px 0;
	min-height: 35px;
	min-width: 35px;
	width: 35px;
	height: 35px;
	stroke: rgb(220, 220, 220);
	fill: rgb(220, 220, 220);
}
</style>
