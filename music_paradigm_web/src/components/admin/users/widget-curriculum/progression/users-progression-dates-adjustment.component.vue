<template>
	<div class="inner-inner-widget">
		<tbody>
			<tr>
				<td>Duration :</td>
				<td>{{ isCompletedDisplay }}</td>
				<td>{{ duration }}</td>
				<td> {{ adjustedDuration }} </td>
			</tr>
			<tr>
				<td>Start Date :</td>
				<td>{{ startTime }}</td>
				<td>{{ startTimePassed }}</td>
				<td>
					(+
					<input
						type="number"
						v-model="timeSinceStartAdjustment"
						name="start-time-adjustment"
						autocomplete="new-start-time-adjustment"
						class="start-time-adjustment-input"
					/>
					day(s) adjustment {{ adjustedStartDate }})
				</td>
			</tr>
			<tr>
				<td>Last Progression Date :</td>
				<td>{{ lastProgressionDate }}</td>
				<td>{{ lastProgressionTimePassed }}</td>
				<td></td>
			</tr>
		</tbody>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			datesOptions: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
			timeSinceStartAdjustment: 0,
			MAX_ELEMENTS_TO_DURATION: 3,
		};
	},
	computed: {
		...mapGetters('users/progressions', [
			'progressionSelectedStartTime',
			'progressionSelectedStartTimePassed',
			'progressionSelectedLastProgressionDate',
			'progressionSelectedLastProgressionTimePassed',
			'progressionSelectedAdjustmentStartTimeInDays',
			'progressionSelectedDuration',
			'progressionSelectedIsCompleted',
		]),
		wasAdjustmentModified() {
			return Number(this.timeSinceStartAdjustment) !== Number(this.progressionSelectedAdjustmentStartTimeInDays);
		},
		startTime() {
			if (!this.progressionSelectedStartTime) return 'Never';
			else return new Date(this.progressionSelectedStartTime).toLocaleDateString(undefined, this.datesOptions);
		},
		startTimePassed() {
			if (!this.progressionSelectedStartTime) return '---';
			return this.makeDateTimeLapsedDisplay(this.progressionSelectedStartTimePassed);
		},
		lastProgressionDate() {
			if (!this.progressionSelectedLastProgressionDate) return 'Never';
			else return new Date(this.progressionSelectedLastProgressionDate).toLocaleDateString(undefined, this.datesOptions);
		},
		lastProgressionTimePassed() {
			if (!this.progressionSelectedLastProgressionDate) return '---';
			return this.makeDateTimeLapsedDisplay(this.progressionSelectedLastProgressionTimePassed);
		},
		duration() {
			return this.makeDateTimeLapsedDisplay(this.progressionSelectedDuration, false);
		},
		isCompletedDisplay() {
			if (this.progressionSelectedIsCompleted) return 'COMPLETE';
			else return 'CONTINUING';
		},
		hasTimeSinceStartAdjustment() {
			return Number(this.timeSinceStartAdjustment) !== 0;
		},
		adjustedStartDate() {
			if (!this.hasTimeSinceStartAdjustment || !this.progressionSelectedStartTime) return '';
			const daysOffsetInMilliseconds = this.timeSinceStartAdjustment * (1000 * 60 * 60 * 24);
			const adjustedTimePassed = this.progressionSelectedStartTimePassed + daysOffsetInMilliseconds;
			return ' = ' + this.makeDateTimeLapsedDisplay(adjustedTimePassed);
		},
		adjustedDuration() {
			if (!this.hasTimeSinceStartAdjustment || !this.progressionSelectedDuration) return '';
			const daysOffsetInMilliseconds = this.timeSinceStartAdjustment * (1000 * 60 * 60 * 24);
			const adjustedDuration = this.progressionSelectedDuration + daysOffsetInMilliseconds;
			return `(${this.makeDateTimeLapsedDisplay(adjustedDuration, false)} with adjustment)`;
		},
	},
	methods: {
		bundleAdjustments() {
			return { adjustmentStartTimeInDays: this.timeSinceStartAdjustment };
		},
		revert() {
			this.timeSinceStartAdjustment = this.progressionSelectedAdjustmentStartTimeInDays;
		},
		getParsedDuration(durationInMilliseconds) {
			const isPositive = durationInMilliseconds >= 0;
			let durationLeft = durationInMilliseconds;
			const weeks = Math.floor(Math.abs(durationLeft / (1000 * 60 * 60 * 24 * 7)));
			durationLeft %= 1000 * 60 * 60 * 24 * 7;
			const days = Math.floor(Math.abs(durationLeft / (1000 * 60 * 60 * 24)));
			durationLeft %= 1000 * 60 * 60 * 24;
			const hours = Math.floor(Math.abs(durationLeft / (1000 * 60 * 60)));
			durationLeft %= 1000 * 60 * 60;
			const minutes = Math.floor(Math.abs(durationLeft / (1000 * 60)));
			durationLeft %= 1000 * 60;
			const seconds = Math.floor(Math.abs(durationLeft / 1000));
			return { isPositive: isPositive, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds };
		},
		makeDateTimeLapsedDisplay(durationInMilliseconds, mustAppendPreposition = true) {
			const { isPositive, weeks, days, hours, minutes, seconds } = this.getParsedDuration(durationInMilliseconds);
			let timeLapsed = '';
			let elementsCount = 0;
			const maxElements = this.MAX_ELEMENTS_TO_DURATION;
			let includesLongerDuration = false;
			if (weeks > 0 && elementsCount < maxElements) {
				timeLapsed += String(weeks) + (weeks === 1 ? ' week ' : ' weeks ');
				includesLongerDuration = true;
				elementsCount += 1;
			}
			if ((includesLongerDuration || days > 0) && elementsCount < maxElements) {
				timeLapsed += String(days) + (days === 1 ? ' day ' : ' days ');
				includesLongerDuration = true;
				elementsCount += 1;
			}
			if ((includesLongerDuration || hours > 0) && elementsCount < maxElements) {
				timeLapsed += String(hours) + ' h. ';
				includesLongerDuration = true;
				elementsCount += 1;
			}
			if ((includesLongerDuration || minutes > 0) && elementsCount < maxElements) {
				timeLapsed += String(minutes) + ' min. ';
				includesLongerDuration = true;
				elementsCount += 1;
			}
			if ((includesLongerDuration || seconds > 0) && elementsCount < maxElements) {
				timeLapsed += String(seconds) + ' sec. ';
				elementsCount += 1;
			}
			if (mustAppendPreposition) {
				if (isPositive) timeLapsed += 'ago';
				else timeLapsed = 'in ' + timeLapsed;
			}
			return timeLapsed;
		},
	},
	watch: {
		progressionSelectedAdjustmentStartTimeInDays: {
			immediate: true,
			handler: function (value) {
				this.timeSinceStartAdjustment = value;
			},
		},
	},
};
</script>

<style scoped>
td {
	padding: 10px 40px 10px 0px;
}

.start-time-adjustment-input {
	width: 75px;
	text-align: center;
}
</style>
