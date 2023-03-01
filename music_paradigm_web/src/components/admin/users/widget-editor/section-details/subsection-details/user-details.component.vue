<template>
	<div class="form-area">
		<div class="label-output-spacing">
			<span class="label"> User </span>
			<span> {{ username }} </span>

			<span class="label"> Creation Date </span>
			<span class="output"> {{ creationDate }} </span>

			<span class="label"> Last Login </span>
			<span class="output"> {{ lastLoginDate }} </span>

			<span class="label"> Last Details Update </span>
			<span class="output"> {{ updateDate }} </span>
		</div>
	</div>
</template>

<script>
import '@/styles/form-template.css';

import { dateHandler } from '@/_helpers';
import { FORMATTING_EMPTY_VALUE_PLACEHOLDER } from '@/modules/formatting';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('managementUsers/selection', [
			'hasSelectedUser',
			'userSelectionUsername',
			'userSelectionCreatedAt',
			'userSelectionLastLogin',
			'userSelectionUpdatedAt',
		]),
		creationDate() {
			return this.isValueDisplayable(this.userSelectionCreatedAt) ?
				dateHandler.formatDateYearToMinutes(this.userSelectionCreatedAt) :
				FORMATTING_EMPTY_VALUE_PLACEHOLDER;
		},
		lastLoginDate() {
			return this.isValueDisplayable(this.userSelectionLastLogin) ?
				this.display(dateHandler.formatDateYearToMinutes(this.userSelectionLastLogin)) :
				FORMATTING_EMPTY_VALUE_PLACEHOLDER;
		},
		updateDate() {
			return this.isValueDisplayable(this.userSelectionUpdatedAt) &&
				(this.userSelectionUpdatedAt !== this.userSelectionCreatedAt) ?
				this.display(dateHandler.formatDateYearToMinutes(this.userSelectionUpdatedAt)) :
				FORMATTING_EMPTY_VALUE_PLACEHOLDER;
		},
		username() {
			return this.isValueDisplayable(this.userSelectionUsername) ?
				this.userSelectionUsername :
				'No user selected';
		},
	},
	methods: {
		isValueDisplayable(value) {
			return this.hasSelectedUser && Boolean(value);
		},
	}
};
</script>

<style scoped>
.form-area {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.label-output-spacing {
	display: grid;
	gap: 4px;
	grid-template-columns: 250px 400px;
}

.label {
	grid-column: 1;
	min-width: 250px;
	padding-right: 20px;
	text-align: right;
	white-space: nowrap;
}

.output {
	grid-column: 2;
}
</style>
