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
				<tr v-for="(user, index) in usersSummaryList" :key="user._id" >
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
.loader {
	width: 100px;
	height: 100px;
}
</style>
