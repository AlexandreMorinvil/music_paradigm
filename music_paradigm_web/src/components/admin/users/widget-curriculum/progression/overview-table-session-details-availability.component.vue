<template>
	<div v-show="shouldShow">
		<b class="center-align">Unavailability:</b>
		<span class="center-align"> {{ message }} </span>
	</div>
</template>

<script>
export default {
	props: {
		session: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {};
	},
	computed: {
		message() {
			if (this.isAvailable) return 'Is available';
			else if (this.delayPreAvailabilityInDays > 0) return this.makeDaysDelayMessage();
			else if (this.delayPreAvailabilityInHours != '00:00') return this.makeHoursDelayMessage();
			// else if (this.isLockedByCompletionLimit) return this.makeCompletionLimitMessage();
			else if (this.isDelayedByPreviousSequential) return this.makeIsDelayedByPreviousSequential();
			else if (this.isDelayedByPreviousUniqueInDay) return this.makeIsDelayedByPreviousUniqueInDay();
			else return '';
		},
		shouldShow() {
			return !this.isAvailable && !this.isLockedByCompletionLimit;
		},
		isAvailable() {
			return (this.session && this.session.isAvailable) || false;
		},
		delayPreAvailabilityInDays() {
			return (this.session && this.session.delayPreAvailabilityInDays) || 0;
		},
		delayPreAvailabilityInHours() {
			return (this.session && this.session.delayPreAvailabilityInHours) || '00:00';
		},
		isLockedByCompletionLimit() {
			return (this.session && this.session.isLockedByCompletionLimit) || false;
		},
		isDelayedByPreviousSequential() {
			return (this.session && this.session.isDelayedByPreviousSequential) || false;
		},
		isDelayedByPreviousUniqueInDay() {
			return (this.session && this.session.isDelayedByPreviousUniqueInDay) || false;
		},

		// Used to construct delays justification
		isInSequentialCurriculum() {
			return (this.session && this.session.isInSequentialCurriculum) || undefined;
		},
		delayInDays() {
			return (this.session && this.session.delayInDays) || '?';
		},
	},
	methods: {
		makeDaysDelayMessage() {
			if (this.isInSequentialCurriculum) return `${this.delayInDays} day(s) after last advance`;
			else return `Until ${this.delayInDays} day(s) from start`;
		},
		makeHoursDelayMessage() {
			return `At ${this.releaseTime}`;
		},
		makeCompletionLimitMessage() {
			return 'Completion limit reached';
		},
		makeIsDelayedByPreviousSequential() {
			return 'Wait for preceding session';
		},
		makeIsDelayedByPreviousUniqueInDay() {
			return 'Can\'t do the same day';
		},
	},
};
</script>

<style scoped>
.center-title {
	justify-content: center;
}

.center-align {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	align-content: center;
	text-align: center;
}
</style>
