<template>
	<div class="englobing-box">
		<div class="overview-ttile">
			<h2 class="title-area">Sessions Program</h2>
		</div>
		<div class="table-context">
			<overview-table-session v-for="(session, index) in progressionSummary" :key="index" :session="session" :index="index" class="summary" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import OverviewTableSession from '@/components/user/home/overview-table-session.component.vue';

export default {
	components: {
		OverviewTableSession,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('account', ['progressionSummary']),
	},
};
</script>

<style scoped>
.englobing-box {
	display: grid;
	grid-template-rows: auto auto;
}

.title-area {
	width: 50%;
	padding: 10px;
	margin: auto;
	box-shadow: 5px 5px 8px black;
	background-color: rgb(0, 40, 235);
	border: 5px rgb(0, 20, 220) solid;
	border-bottom-style: none;
	border-radius: 10px 10px 0 0;
}

.table-context {
	padding: 20px;
	background-color: rgb(200, 200, 200);
	border: 5px rgb(195, 195, 195) solid;
	box-shadow: 5px 5px 8px black;
	margin-bottom: 35px;
	z-index: 1;
}

.overview-ttile {
	text-align: center;
}

.summary {
	position: relative;
	padding: 10px;
}

.number-label {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
