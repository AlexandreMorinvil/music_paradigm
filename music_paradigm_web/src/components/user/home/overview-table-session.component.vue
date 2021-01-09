<template>
	<button v-if="session.associativeId" v-on:click="startSession" class="session-container container-flex" :class="state">
		<h3 class="title-area">{{ title }}</h3>
		<svg id="icon" class="icon icon-area">
			<use :xlink:href="iconReference" />
		</svg>
		<p v-if="hasCaption" class="caption-area">{{ caption }}</p>
	</button>
</template>

<script>
export default {
	data() {
		return {
			isAvailable: false,
			captionType: 'none',
			icon: 'lock',
		};
	},
	props: {
		index: { type: Number, default: -1 },
		session: { type: Object, default: null },
	},
	computed: {
		state() {
			if (this.detrmineIsUnavailable()) return 'unavailable';
			else if (this.detrmineIsAlmostAvailable()) return 'almost-available';
			else if (this.detrmineIsNewAvailable()) return 'new-available';
			else if (this.detrmineIsCompletedvailable()) return 'completed-available';
			else if (this.detrmineIsCompleted()) return 'completed';
			else return 'unavailable';
		},
		title() {
			return this.session.title;
		},
		iconReference() {
			return 'user-sprites.svg#' + this.icon;
		},
		caption() {
			switch (this.captionType) {
				case 'timer-left':
					return this.delay;
				case 'available':
					return 'available';
				default:
					return '';
			}
		},
		delay() {
			if (this.session.delayPreAvailabilityInDays > 0) {
				if (this.session.delayPreAvailabilityInDays === 1) return 'Tomorrow';
				else return `In ${this.session.delayPreAvailabilityInDays} days`;
			} else if (this.session.delayPreAvailabilityInHours !== '00:00') return `In ${this.session.delayPreAvailabilityInHours} hours`;
			else if (this.session.isDelayedByPreviousUniqueInDay) return 'Tomorrow';
			else return 'Soon'; // THis shsould never happen
		},
		hasCaption() {
			return Boolean(this.caption);
		},
	},
	methods: {
		startSession() {
			if (this.session.isAvailable) this.$emit('start-session', this.session.associativeId);
		},
		detrmineIsUnavailable() {
			return !this.session.isAvailable && this.session.isDelayedByPreviousSequential;
		},
		detrmineIsAlmostAvailable() {
			return !this.session.isAvailable && this.session.completionCount <= 0;
		},
		detrmineIsNewAvailable() {
			return this.session.isAvailable && this.session.completionCount <= 0;
		},
		detrmineIsCompletedvailable() {
			return this.session.isAvailable && this.session.completionCount > 0;
		},
		detrmineIsCompleted() {
			return !this.session.isAvailable && this.session.completionCount > 0;
		},
	},
	watch: {
		state: {
			immediate: true,
			handler: function (state) {
				switch (state) {
					case 'unavailable':
						this.isAvailable = false;
						this.captionType = 'none';
						this.icon = 'closed-lock';
						break;
					case 'almost-available':
						this.isAvailable = false;
						this.captionType = 'timer-left';
						this.icon = 'icon-clock';
						break;
					case 'new-available':
						this.isAvailable = true;
						this.captionType = 'available';
						this.icon = 'opened-lock';
						break;
					case 'completed-available':
						this.isAvailable = true;
						this.captionType = 'available';
						this.icon = 'check-circle';
						break;
					case 'completed':
						this.isAvailable = false;
						this.captionType = 'none';
						this.icon = 'check-circle';
						break;
					default:
						break;
				}
			},
		},
	},
};
</script>

<style scoped>
.session-container {
	width: 180px;
	height: 180px;
	margin: 10px;
	background-color: gray;
	box-shadow: 5px 5px 5px rgb(15, 15, 15);
	border-style: solid;
	border-radius: 10px;
	border-width: 4px;
	text-align: center;
	padding: 10px;
}

.container-flex {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}

.title-area {
	height: 4em;
	font-size: 1em;
	text-align: center;
	width: 100%;
}

.icon-area {
	grid-area: icon;
}

.caption-area {
	grid-area: caption;
	font-size: 0.9em;
	height: auto;
	width: 100%;
}

.unavailable {
	background-color: rgb(40, 40, 40);
	border-color: rgb(35, 35, 35);
	color: rgb(80, 80, 80);
	stroke: rgb(20, 20, 20);
	fill: rgb(20, 20, 20);
	cursor: default;
	outline: none;
}

.almost-available {
	background-color: rgb(60, 60, 60);
	border-color: rgb(55, 55, 55);
	color: rgb(100, 100, 100);
	fill: rgb(40, 40, 40);
	cursor: default;
	outline: none;
}

.new-available {
	background-color: rgb(200, 180, 0);
	border-color: rgb(195, 175, 0);
	color: rgb(250, 250, 250);
	stroke: rgb(100, 100, 60);
	fill: rgb(100, 100, 60);
}

.completed-available {
	background-color: rgb(0, 100, 200);
	border-color: rgb(0, 95, 195);
	color: rgb(160, 180, 250);
	fill: rgb(0, 60, 130);
}

.completed {
	background-color: rgb(0, 190, 50);
	border-color: rgb(0, 185, 45);
	color: rgb(0, 130, 0);
	fill: rgb(0, 130, 0);
	cursor: default;
	outline: none;
}

.label {
	background-color: rgb(40, 40, 40);
	border-color: rgb(35, 35, 35);
	color: rgb(80, 80, 80);
}

.icon {
	display: block;
	margin: auto;
	height: 100%;
	width: 100%;
}
</style>