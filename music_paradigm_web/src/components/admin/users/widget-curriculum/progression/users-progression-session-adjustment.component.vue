<template>
	<div class="adjustments-grid">
		<div class="centering">
			<table>
				<tr class="input-tag-grid">
					<td class="centering">
						<input class="input-area number" v-model="currentAdjustments.adjustmentDelayInDays" name="adjustmentDelayInDays" type="number" />
					</td>
					<td>
						<label for="adjustmentDelayInDays"> Days adjustment to delay </label>
					</td>
				</tr>

				<tr class="input-tag-grid">
					<td class="centering">
						<input
							class="input-area checkbox"
							v-model="currentAdjustments.adjustmentConsiderCompleted"
							name="adjustmentConsiderCompleted"
							type="checkbox"
						/>
					</td>
					<td>
						<label for="adjustmentConsiderCompleted"> Consider completed </label>
					</td>
				</tr>

				<tr class="input-tag-grid">
					<td class="centering">
						<input
							class="input-area checkbox"
							v-model="currentAdjustments.adjustmentPreponeAvailability"
							name="adjustmentPreponeAvailability"
							type="checkbox"
						/>
					</td>
					<td>
						<label for="adjustmentPreponeAvailability"> Remove the delays </label>
					</td>
				</tr>

				<tr class="input-tag-grid">
					<td class="centering">
						<input
							class="input-area checkbox"
							v-model="currentAdjustments.adjustmentBlockAvailability"
							name="adjustmentBlockAvailability"
							type="checkbox"
						/>
					</td>
					<td>
						<label for="adjustmentBlockAvailability"> Block the availability </label>
					</td>
				</tr>
			</table>
		</div>

		<div class="centering">
			<table>
				<tr class="input-tag-grid">
					<td class="centering">
						<input
							class="input-area number"
							v-model="currentAdjustments.adjustmentAdditionalCompletionsRequired"
							name="adjustmentAdditionalCompletionsRequired"
							min="0"
							type="number"
						/>
					</td>
					<td><label for="adjustmentAdditionalCompletionsRequired"> Additional completions needed </label></td>
				</tr>

				<tr class="input-tag-grid">
					<td class="centering">
						<input
							class="input-area checkbox"
							v-model="currentAdjustments.adjustmentImposeReadyToBeDone"
							name="adjustmentImposeReadyToBeDone"
							type="checkbox"
						/>
					</td>
					<td>
						<label for="adjustmentImposeReadyToBeDone"> Make it ready now </label>
					</td>
				</tr>

				<tr class="input-tag-grid">
					<td class="centering">
						<input
							class="input-area checkbox"
							v-model="currentAdjustments.adjustmentOverlookUniqueInDays"
							name="adjustmentOverlookUniqueInDays"
							type="checkbox"
						/>
					</td>
					<td><label for="adjustmentOverlookUniqueInDays"> Allow doing same day </label></td>
				</tr>

				<tr class="input-tag-grid">
					<td class="centering">
						<input
							class="input-area checkbox"
							v-model="currentAdjustments.adjustmentRemoveCompletionLimit"
							name="adjustmentRemoveCompletionLimit"
							type="checkbox"
						/>
					</td>
					<td>
						<label for="adjustmentRemoveCompletionLimit"> Remove completion limit </label>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

export default {
	data() {
		return {
			wasAdjustmentModified: false,
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
				adjustmentBlockAvailability: null,
				adjustmentRemoveCompletionLimit: null,
			},
		};
	},
	methods: {
		revert() {
			for (const adjustment in this.currentAdjustments) {
				this.currentAdjustments[adjustment] = this.initialAdjustments[adjustment];
			}
		},
		bundleAdjustments() {
			if (!this.hasSelectedSession) return {};
			else
				return {
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
		verifyWasAdjustmentModified() {
			let wasAdjustmentModified = false;
			for (const adjustment in this.currentAdjustments) {
				if (this.initialAdjustments[adjustment] != this.currentAdjustments[adjustment]) {
					wasAdjustmentModified = true;
					break;
				}
			}
			this.wasAdjustmentModified = wasAdjustmentModified;
			return this.wasAdjustmentModified;
		},
	},
	beforeMount() {
		this.unsetAdjustments();
	},
	watch: {
		currentAdjustments: {
			deep: true,
			immediate: true,
			handler: function () {
				this.verifyWasAdjustmentModified();
			},
		},
		initialAdjustments: {
			deep: true,
			immediate: true,
			handler: function () {
				this.verifyWasAdjustmentModified();
			},
		},
	},
};
</script>

<style scoped>
.adjustments-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.centering {
	display: flex;
	justify-content: center;
}

.number {
	width: 50px;
	text-align: center;
}

.input-tag-grid {
	display: grid;
	grid-template-columns: 75px auto;
	min-width: 400px;
}

.input-area {
	margin: auto;
}
</style>
