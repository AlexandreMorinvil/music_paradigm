<template>
	<div
		v-if="session.associativeId"
		class="details-container details-container-color details-text"
		:class="{ 'adjusted-container-color': hasAdjustment }"
	>
		<tbody>
			<tr>
				<td><b>Starts :</b></td>
				<td>{{ starts }}</td>
			</tr>
			<tr>
				<td><b>Completions :</b></td>
				<td>{{ completions }}</td>
			</tr>
		</tbody>
		<div v-if="hasAdjustment">
			<b>Adjustments :</b>
			<p v-for="(text, index) in adjustmentsTexts" v-bind:key="index"> {{ text }}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		index: { type: Number, default: -1 },
		session: { type: Object, default: null },
	},
	computed: {
		starts() {
			return this.session.startCount || 'Never';
		},
		completions() {
			return this.session.completionCount || 'Never';
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
			if (!wasCompleted) return 'Allowed to skip (considered completed)';
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
	methods: {},
	watch: {},
};
</script>

<style scoped>
td {
	padding: 0 5px;
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
