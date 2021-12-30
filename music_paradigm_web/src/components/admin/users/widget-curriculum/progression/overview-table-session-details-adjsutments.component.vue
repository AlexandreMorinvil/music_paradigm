<template>
	<div v-show="hasAdjustment">
		<b class="center-align">Adjustments :</b>
		<p class="center-align" v-for="(text, index) in adjustmentsTexts" v-bind:key="index">{{ text }}</p>
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
		hasAdjustment() {
			if (this.session.adjustmentDelayInDays) return true;
			if (this.session.adjustmentConsiderCompleted) return true;
			if (this.session.adjustmentAdditionalCompletionsRequired) return true;
			if (this.session.adjustmentPreponeAvailability) return true;
			if (this.session.adjustmentOverlookUniqueInDays) return true;
			if (this.session.adjustmentImposeReadyToBeDone) return true;
			if (this.session.adjustmentBlockAvailability) return true;
			if (this.session.adjustmentRemoveCompletionLimit) return true;
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
			if (this.adjustmentBlockAvailability) texts.push(this.adjustmentBlockAvailability);
			if (this.adjustmentRemoveCompletionLimit) texts.push(this.adjustmentRemoveCompletionLimit);
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
		adjustmentBlockAvailability() {
			const adjustmentBlockAvailability = this.session.adjustmentBlockAvailability;
			if (!adjustmentBlockAvailability) return '';
			else return 'Blocked';
		},
		adjustmentRemoveCompletionLimit() {
			const adjustmentRemoveCompletionLimit = this.session.adjustmentRemoveCompletionLimit;
			if (!adjustmentRemoveCompletionLimit) return '';
			else return 'No completion limit';
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
</style>
