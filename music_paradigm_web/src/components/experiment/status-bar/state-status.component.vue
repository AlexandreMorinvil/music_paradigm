<template>
	<div class="state-status-display">
		<svg id="icon-current-state" class="icon-state">
			<use :xlink:href="icon" />
		</svg>
		{{ stateText }}
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		// If true, will indicate the current state, otherwise, will indicate the next state
		isCurrentStateRequested: {
			type: Boolean,
			default() {
				return true;
			},
		},
	},
	data() {
		return {
			iconFileName: 'icon-three-dots',
			stateText: '',
		};
	},
	computed: {
		...mapGetters('experiment', ['currentStateType', 'nextStateType', 'playingMode', 'nextPlayingMode']),
		stateQueried() {
			if (this.isCurrentStateRequested) return this.currentStateType;
			else return this.nextStateType;
		},
		icon() {
			return 'sprites.svg#' + this.iconFileName;
		},
	},
	methods: {
		updateStatus() {
			switch (this.stateQueried) {
				case 'cue':
					this.iconFileName = 'icon-volume-high';
					this.stateText = this.$t('experiment.status-bar.state.cue');
					break;
				case 'end':
					this.iconFileName = 'icon-finish';
					this.stateText = this.$t('experiment.status-bar.state.end');
					break;
				case 'feedback':
					this.iconFileName = 'icon-check-circle';
					this.stateText = this.$t('experiment.status-bar.state.feedback');
					break;
				case 'instruction':
					this.iconFileName = 'icon-info';
					this.stateText = this.$t('experiment.status-bar.state.instruction');
					break;
				case 'playing':
					this.iconFileName = this.getIconPlaying();
					this.stateText = this.$t('experiment.status-bar.state.perform');
					break;
				case 'rest':
					this.iconFileName = 'icon-pause';
					this.stateText = this.$t('experiment.status-bar.state.rest');
					break;
				case 'video':
					this.iconFileName = 'icon-film';
					this.stateText = this.$t('experiment.status-bar.state.video');
					break;
				default:
					this.iconFileName = 'icon-three-dots';
					this.stateText = '';
					break;
			}
		},
		getIconPlaying() {
			const playingMode = this.isCurrentStateRequested ? this.playingMode : this.nextPlayingMode;
			if (playingMode.includes('keyboard')) return 'icon-keyboard';
			else return 'icon-piano';
		},
	},
	watch: {
		stateQueried: {
			immediate: true,
			handler: function () {
				this.updateStatus();
			},
		},
	},
};
</script>

<style scoped>
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

.state-status-display {
	display: flex;
	align-items: center;
	width: 250px;
	height: 85%;
}
</style>
