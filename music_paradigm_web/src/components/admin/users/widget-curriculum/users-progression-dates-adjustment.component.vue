<template>
	<tbody>
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
		};
	},
	computed: {
		...mapGetters('users', [
			'userSelectedStartTime',
			'userSelectedStartTimePassed',
			'userSelectedLastProgressionDate',
			'userSelectedLastProgressionTimePassed',
			'userSelectedAdjustmentStartTimeInDays',
		]),
		wasAdjustmentModified() {
			return Number(this.timeSinceStartAdjustment) !== Number(this.userSelectedAdjustmentStartTimeInDays);
		},
		startTime() {
			if (!this.userSelectedStartTime) return 'Never';
			else return new Date(this.userSelectedStartTime).toLocaleDateString(undefined, this.datesOptions);
		},
		startTimePassed() {
			return this.makeDateTimeLapsedDisplay(this.userSelectedStartTime, this.userSelectedStartTimePassed);
		},
		lastProgressionDate() {
			if (!this.userSelectedLastProgressionDate) return 'Never';
			else return new Date(this.userSelectedLastProgressionDate).toLocaleDateString(undefined, this.datesOptions);
		},
		lastProgressionTimePassed() {
			return this.makeDateTimeLapsedDisplay(this.userSelectedLastProgressionDate, this.userSelectedLastProgressionTimePassed);
		},
		adjustedStartDate() {
			if (Number(this.timeSinceStartAdjustment) === 0 || !this.userSelectedStartTime) return '';
			const daysOffsetInMilliseconds = this.timeSinceStartAdjustment * (1000 * 60 * 60 * 24);
			const adjustedTimePassed = this.userSelectedStartTimePassed + daysOffsetInMilliseconds;
			return ' = ' + this.makeDateTimeLapsedDisplay(true, adjustedTimePassed);
		},
	},
	methods: {
		bundleAdjustments() {
			return { adjustmentStartTimeInDays: this.timeSinceStartAdjustment };
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
			return { isPositive: isPositive,  weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds };
		},
		makeDateTimeLapsedDisplay(referenceDate, durationInMilliseconds) {
			if (!referenceDate) return '---';
			const { isPositive, weeks, days, hours, minutes, seconds } = this.getParsedDuration(durationInMilliseconds);
			let timeLapsed = '';
			let includesLongerDuration = false;
			if (weeks > 0) {
				timeLapsed += String(weeks) + (weeks === 1 ? ' week ' : ' weeks ');
				includesLongerDuration = true;
			}
			if (includesLongerDuration || days > 0) {
				timeLapsed += String(days) + (days === 1 ? ' day ' : ' days ');
				includesLongerDuration = true;
			}
			if (includesLongerDuration || hours > 0) {
				timeLapsed += String(hours) + ' h. ';
				includesLongerDuration = true;
			}
			if (includesLongerDuration || minutes > 0) {
				timeLapsed += String(minutes) + ' min. ';
				includesLongerDuration = true;
			}
			if (!includesLongerDuration) {
				timeLapsed = String(seconds) + ' sec. ';
			}
			if (isPositive) timeLapsed += 'ago';
			else timeLapsed = 'in ' + timeLapsed;
			return timeLapsed;
		},
	},
	watch: {
		userSelectedAdjustmentStartTimeInDays: {
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
