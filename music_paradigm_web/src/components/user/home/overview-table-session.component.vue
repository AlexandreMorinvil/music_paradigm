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
import '@/styles/color-palette.css';

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
			if (this.detrmineIsCompleted()) return 'completed';
			else if (this.detrmineIsUnavailable()) return 'unavailable';
			else if (this.detrmineIsAlmostAvailable()) return 'almost-available';
			else if (this.detrmineIsNewAvailable()) return 'new-available';
			else if (this.detrmineIsCompletedvailable()) return 'completed-available';
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
					return this.$t('user.progression-board.available');
				default:
					return '';
			}
		},
		delay() {
			const delayInDays = this.session.delayPreAvailabilityInDays;
			const delayInHours = this.session.delayPreAvailabilityInHours;
			const isDelayedByPreviousUniqueInDay = this.session.isDelayedByPreviousUniqueInDay;
			if (delayInDays > 0) {
				if (delayInDays === 1) return this.$t('user.progression-board.tomorrow');
				else return this.$tc('user.progression-board.in-x-days', delayInDays, { number: delayInDays });
			} else if (delayInHours !== '00:00') return this.$tc('user.progression-board.in-x-hours', { time: delayInHours });
			else if (isDelayedByPreviousUniqueInDay) return this.$t('user.progression-board.tomorrow');
			else return this.$t('user.progression-board.undetermined'); // This shsould never happen
		},
		hasCaption() {
			return Boolean(this.caption);
		},
		completionsNeeded() {
			return 1 + this.session.adjustmentAdditionalCompletionsRequired;
		},
		wasCompleted() {
			return this.session.completionCount >= this.completionsNeeded || this.session.adjustmentConsiderCompleted;
		},
		isBlocked() {
			return this.session.adjustmentBlockAvailability;
		}
	},
	methods: {
		startSession() {
			if (this.session.isAvailable)
				this.$emit('start-session', {
					associativeId: this.session.associativeId,
					associativeIdOrdinalNumber: this.session.associativeIdOrdinalNumber,
				});
		},
		detrmineIsCompleted() {
			return !this.session.isAvailable && this.wasCompleted;
		},
		detrmineIsUnavailable() {
			return !this.session.isAvailable && this.session.isDelayedByPreviousSequential;
		},
		detrmineIsAlmostAvailable() {
			return !this.session.isAvailable && !this.wasCompleted && !this.isBlocked;
		},
		detrmineIsNewAvailable() {
			return this.session.isAvailable && !this.wasCompleted;
		},
		detrmineIsCompletedvailable() {
			return this.session.isAvailable && this.wasCompleted;
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
	width: 220px;
	height: 220px;
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
	background-color: var(--color-dark-grey-board-item-background);
	border-color: var(--color-dark-grey-board-item-border);
	color: var(--color-dark-grey-board-item-text);
	stroke: var(--color-dark-grey-board-item-stroke);
	fill: var(--color-dark-grey-board-item-stroke);
	cursor: default;
	outline: none;
}

.almost-available {
	background-color: var(--color-grey-board-item-background);
	border-color: var(--color-grey-board-item-border);
	color: var(--color-grey-board-item-text);
	fill: var(--color-grey-board-item-stroke);
	cursor: default;
	outline: none;
}

.new-available {
	background-color: var(--color-yellow-board-item-background);
	border-color: var(--color-yellow-board-item-border);
	color: var(--color-yellow-board-item-text);
	stroke: var(--color-yellow-board-item-stroke);
	fill: var(--color-yellow-board-item-stroke);
}

.completed-available {
	background-color: var(--color-blue-board-item-background);
	border-color: var(--color-blue-board-item-border);
	color: var(--color-blue-board-item-text);
	fill: var(--color-blue-board-item-stroke);
}

.completed {
	background-color: var(--color-green-board-item-background);
	border-color: var(--color-green-board-item-border);
	color: var(--color-green-board-item-text);
	fill: var(--color-green-board-item-stroke);
	cursor: default;
	outline: none;
}

.icon {
	display: block;
	margin: auto;
	height: 100%;
	width: 100%;
}
</style>
