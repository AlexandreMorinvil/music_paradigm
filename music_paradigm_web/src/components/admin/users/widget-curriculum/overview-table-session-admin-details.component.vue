<template>
	<div
		v-if="session.associativeId"
		class="details-container details-container-color details-text"
		:class="{ 'adjusted-container-color': hasAdjustment }"
	>
		<div>
			<b class="center-align">Started:</b>
			<p class="center-align">
				<span> {{ startCount }} </span>
				<span v-if="initialStartDate">{{ initialStartDate }} </span>
			</p>
		</div>
		<div v-if="hasStartedAtLeastOnce">
			<b class="center-align">Completed:</b>
			<p class="center-align">
				<span> {{ completionCount }} </span>
				<span v-if="advanceCompeletionDate">{{ advanceCompeletionDate }} </span>
			</p>
		</div>
		<div v-if="hasAdjustment">
			<b class="center-align">Adjustments :</b>
			<p class="center-align" v-for="(text, index) in adjustmentsTexts" v-bind:key="index">{{ text }}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			datesOptions: {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			},
		};
	},
	props: {
		index: { type: Number, default: -1 },
		session: { type: Object, default: null },
	},
	computed: {
		hasStartedAtLeastOnce() {
			return Number(this.session.startCount) > 0;
		},
		startCount() {
			return this.makeCountDisplay(this.session.startCount);
		},
		initialStartDate() {
			if (!this.session.initialStartDate) return '';
			else return this.makeDateDisplay(this.session.initialStartDate);
		},
		completionCount() {
			return this.makeCountDisplay(this.session.completionCount);
		},
		advanceCompeletionDate() {
			if (!this.session.advanceCompeletionDate) return '';
			else return this.makeDateDisplay(this.session.advanceCompeletionDate);
		},
		hasAdjustment() {
			if (this.session.adjustmentDelayInDays) return true;
			if (this.session.adjustmentConsiderCompleted) return true;
			if (this.session.adjustmentAdditionalCompletionsRequired) return true;
			if (this.session.adjustmentPreponeAvailability) return true;
			if (this.session.adjustmentOverlookUniqueInDays) return true;
			if (this.session.adjustmentImposeReadyToBeDone) return true;
			else return false;
		},
		adjustmentsTexts() {
			const texts = [];
			if (!this.hasAdjustment) return texts;
			if (this.adjustmentDelayInDays) texts.push(this.adjustmentDelayInDays);
			if (this.adjustmentConsiderCompleted) texts.push(this.adjustmentConsiderCompleted);
			if (this.adjustmentAdditionalCompletionsRequired) texts.push(this.adjustmentAdditionalCompletionsRequired);
			if (this.adjustmentPreponeAvailability) texts.push(this.adjustmentPreponeAvailability);
			if (this.adjustmentOverlookUniqueInDays) texts.push(this.adjustmentOverlookUniqueInDays);
			if (this.adjustmentImposeReadyToBeDone) texts.push(this.adjustmentImposeReadyToBeDone);
			return texts;
		},
		isImposedReady() {
			return this.session.adjustmentImposeReadyToBeDone || false;
		},
		adjustmentDelayInDays() {
			if (this.isImposedReady) return '';
			const adjustmentDelayInDays = this.session.adjustmentDelayInDays || 0;
			if (!adjustmentDelayInDays) return '';
			if (adjustmentDelayInDays > 0) return `Delayed of ${adjustmentDelayInDays} days`;
			else return `advanced of ${Math.abs(adjustmentDelayInDays)} days`;
		},
		adjustmentConsiderCompleted() {
			const adjustmentConsiderCompleted = this.session.adjustmentConsiderCompleted || false;
			const wasCompleted = this.session.completionCount > 0;
			if (!adjustmentConsiderCompleted) return '';
			if (!wasCompleted) return 'Considered completed';
			else return 'Allowed to skip';
		},
		adjustmentAdditionalCompletionsRequired() {
			const adjustmentAdditionalCompletionsRequired = this.session.adjustmentAdditionalCompletionsRequired;
			if (!adjustmentAdditionalCompletionsRequired) return '';
			else return `Has to be done ${1 + adjustmentAdditionalCompletionsRequired} times`;
		},
		adjustmentPreponeAvailability() {
			if (this.isImposedReady) return '';
			const adjustmentPreponeAvailability = this.session.adjustmentPreponeAvailability || false;
			if (!adjustmentPreponeAvailability) return '';
			else return 'Delays may be ignored';
		},
		adjustmentOverlookUniqueInDays() {
			if (this.isImposedReady) return '';
			const adjustmentOverlookUniqueInDays = this.session.adjustmentOverlookUniqueInDays || false;
			if (!adjustmentOverlookUniqueInDays) return '';
			else return 'No need to wait next day';
		},
		adjustmentImposeReadyToBeDone() {
			const adjustmentImposeReadyToBeDone = this.session.adjustmentImposeReadyToBeDone;
			if (!adjustmentImposeReadyToBeDone) return '';
			else return 'Imposed ready';
		},
	},
	methods: {
		makeCountDisplay(count) {
			if (!count) return 'Never';
			if (count == 1) return '1 time';
			if (count > 1) return `${count} times`;
			else return 'Error';
		},
		makeDateDisplay(date) {
			return new Date(date).toLocaleDateString(undefined, this.datesOptions);
		},
	},
	watch: {},
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

.details-container {
	width: 180px;
	height: auto;
	margin: 10px;
	border-style: solid;
	border-radius: 1px;
	border-width: 4px;
	padding: 5px;
}

.details-container-color {
	background-color: rgb(45, 45, 145);
	border-color: rgb(50, 50, 150);
	box-shadow: 5px 5px 5px rgb(15, 15, 15);
}

.adjusted-container-color {
	background-color: rgb(170, 110, 0);
	border-color: rgb(165, 105, 0);
}

.details-text {
	font-size: 0.6em;
}
</style>
