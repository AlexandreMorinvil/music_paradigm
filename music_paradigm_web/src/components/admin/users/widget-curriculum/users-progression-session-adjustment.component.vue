<template>
	<div class="adjustments-grid">
		<div>
			<div class="input-tag-grid">
				<input class="input-area number" v-model="currentAdjustments.adjustmentDelayInDays" name="adjustmentDelayInDays" type="number" />
				<label for="adjustmentDelayInDays"> Days adjustment to delay </label>
			</div>

			<div class="input-tag-grid">
				<input class="input-area checkbox" v-model="currentAdjustments.adjustmentConsiderCompleted" name="adjustmentConsiderCompleted" type="checkbox" />
				<label for="adjustmentConsiderCompleted"> Consider completed </label>
			</div>

			<div class="input-tag-grid">
				<input class="input-area checkbox" v-model="currentAdjustments.adjustmentPreponeAvailability" name="adjustmentPreponeAvailability" type="checkbox" />
				<label for="adjustmentPreponeAvailability"> Remove the delays </label>
			</div>
		</div>
		<div>
			<div class="input-tag-grid">
				<input
					class="input-area number"
					v-model="currentAdjustments.adjustmentAdditionalCompletionsRequired"
					name="adjustmentAdditionalCompletionsRequired"
					min="0"
					type="number"
				/>
				<label for="adjustmentAdditionalCompletionsRequired"> Additional completions needed </label>
			</div>

			<div class="input-tag-grid">
				<input class="input-area checkbox" v-model="currentAdjustments.adjustmentImposeReadyToBeDone" name="adjustmentImposeReadyToBeDone" type="checkbox" />
				<label for="adjustmentImposeReadyToBeDone"> Make it ready now </label>
			</div>

			<div class="input-tag-grid">
				<input class="input-area checkbox" v-model="currentAdjustments.adjustmentOverlookUniqueInDays" name="adjustmentOverlookUniqueInDays" type="checkbox" />
				<label for="adjustmentOverlookUniqueInDays"> Allow doing same day </label>
			</div>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

export default {
	data() {
		return {
			associativeId: null,
			associativeIdOrdinalNumber: null,
			initialAdjustments: {},
			currentAdjustments: {
				adjustmentDelayInDays: null,
				adjustmentConsiderCompleted: null,
				adjustmentAdditionalCompletionsRequired: null,
				adjustmentPreponeAvailability: null,
				adjustmentOverlookUniqueInDays: null,
				adjustmentImposeReadyToBeDone: null,
			},
		};
	},
	computed: {
		wasAdjustmentModified() {
			for (const adjustment in this.currentAdjustments) {
				if (this.initialAdjustments[adjustment] != this.currentAdjustments[adjustment]) {
					return true;
				}
			}
			return false;
		},
		adjustmentDelayInDays() {
			return this.currentAdjustments.adjustmentDelayInDays;
		},
		adjustmentConsiderCompleted() {
			return this.currentAdjustments.adjustmentConsiderCompleted;
		},
		adjustmentAdditionalCompletionsRequired() {
			return this.currentAdjustments.adjustmentAdditionalCompletionsRequired;
		},
		adjustmentPreponeAvailability() {
			return this.currentAdjustments.adjustmentPreponeAvailability;
		},
		adjustmentOverlookUniqueInDays() {
			return this.currentAdjustments.adjustmentOverlookUniqueInDays;
		},
		adjustmentImposeReadyToBeDone() {
			return this.currentAdjustments.adjustmentImposeReadyToBeDone;
		},
	},
	methods: {
		revert() {
			for (const adjustment in this.currentAdjustments) {
				this.currentAdjustments[adjustment] = this.initialAdjustments[adjustment];
			}
		},
		bundleAdjustments() {
			if (!this.hasSelectedSession) return {};
			else return {
				sessionAdjustments: [
					{
						associativeId: this.associativeId,
						associativeIdOrdinalNumber: this.associativeIdOrdinalNumber,
						...this.currentAdjustments,
					},
				],
			};
		},
		unsetAdjustments() {
			this.hasSelectedSession = false;
			this.associativeId = null;
			this.associativeIdOrdinalNumber = null;
			for (const adjustment in this.currentAdjustments) {
				this.currentAdjustments[adjustment] = null;
				this.initialAdjustments[adjustment] = null;
			}
		},
		takeCurrentAdjustments(session) {
			if (!session.associativeId) return;
			this.associativeId = session.associativeId;
			this.associativeIdOrdinalNumber = session.associativeIdOrdinalNumber;
			for (const adjustment in this.currentAdjustments) {
				this.initialAdjustments[adjustment] = session[adjustment];
				this.currentAdjustments[adjustment] = session[adjustment];
			}
			this.hasSelectedSession = true;
		},
	},
	beforeMount() {
		this.unsetAdjustments();
	},
};
</script>

<style scoped>
.adjustments-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.number {
	width: 50px;
	text-align: center;
}

.input-tag-grid {
	display: grid;
	grid-template-columns: 75px 1fr;
}

.input-area {
	margin: auto;
}
</style>
