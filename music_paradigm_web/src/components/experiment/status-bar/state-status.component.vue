<template>
	<div>
		<svg id="icon-current-state" class="icon-state">
			<use :xlink:href="icon" />
		</svg>
		{{ text }}
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
	computed: {
		...mapGetters('experiment', ['currentStateType', 'nextStateType']),
		stateQueried() {
			if (this.isCurrentStateRequested) return this.currentStateType;
			else return this.nextStateType;
		},
		icon() {
			return this.getIconReference(this.stateQueried);
		},
		text() {
			return this.stateQueried;
		},
	},
	methods: {
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
