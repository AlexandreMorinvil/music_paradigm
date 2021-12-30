<template>
	<div>
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
