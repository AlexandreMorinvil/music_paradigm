<template>
	<div class="form-area">
		<div class="label-output-spacing">
			<span class="label"> User </span>
			<span> {{ username }} </span>

			<span class="label"> Creation </span>
			<span class="output"> {{ creationDate }} </span>

			<!-- TODO: Implementing a mechanism to make the users log in each time they load the application
						Even though they do not necessarily enter their username and password. (Once this mechanism
						exists and the 'lastLogin' field of a user record is updated accordingly, then it will make
						sense to expose this output field)
			<span class="label"> Last Login </span>
			<span class="output"> {{ lastLoginDate }} </span> -->

			<span class="label"> Last Details Modification </span>
			<span class="output"> {{ updateDate }} </span>
		</div>
	</div>
</template>

<script>
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
				dateHandler.formatDateYearToMinutes(this.userSelectionLastLogin) :
				FORMATTING_EMPTY_VALUE_PLACEHOLDER;
		},
		updateDate() {
			return this.isValueDisplayable(this.userSelectionUpdatedAt) ?
				dateHandler.formatDateYearToMinutes(this.userSelectionUpdatedAt) :
				FORMATTING_EMPTY_VALUE_PLACEHOLDER;
		},
		username() {
			return this.isValueDisplayable(this.userSelectionUsername) ?
				this.userSelectionUsername :
				'---';
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
