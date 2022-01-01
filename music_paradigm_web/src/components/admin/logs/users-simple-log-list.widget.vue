<template>
	<div class="board-position widget-table-context">
		<loader-circular-component v-if="isListLoading" class="loader" />
		<table v-else class="widget-table">
			<thead>
				<tr>
					<th>#</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(user, index) in usersSummaryList" :key="user._id" :class="{ selected: isSelectedUser(user) }">
					<td>{{ index + 1 }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import { mapGetters } from 'vuex';

import LoaderCircularComponent from '@/components/visual-helpers/loader-circular.component.vue';

export default {
	components: {
		LoaderCircularComponent,
	},
	data() {
		return {
			datesOptions: { year: 'numeric', month: 'numeric', day: 'numeric' },
		};
	},
	computed: {
		...mapGetters('users', ['isFetchingUsersSummaryList', 'usersSummaryList', 'userSelectedId']),
		isListLoading() {
			return false;
		},
	},
	methods: {},
};
</script>

<style scoped>
.options-position {
	grid-area: options;
	display: flex;
	justify-content: space-between;
}

.board-position {
	grid-area: board;
	display: flex;
	justify-content: center;
	white-space: pre-line;
}

.widget {
	grid-template-areas:
		'options'
		'board';
}

.loader {
	width: 500px;
	height: 500px;
}

.button {
	white-space: nowrap;
}
</style>
