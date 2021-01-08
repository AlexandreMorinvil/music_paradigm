<template>
	<div class="englobing-box">
		<div class="overview-ttile">
			<h2 class="title-area">Program</h2>
		</div>
		<div class="table-context">
			<div class="table-inside-context content-flex">
				<overview-table-session
					v-for="(session, index) in progressionSummary"
					:key="index"
					:session="session"
					:index="index"
					class="session-button"
				/>
			</div>
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
	color: rgb(230, 230, 230);
}

.title-area {
	width: 50%;
	padding: 10px;
	margin: auto;
	box-shadow: 5px 5px 8px black;
	background-color: rgb(0, 40, 150);
	border: 5px rgb(0, 35, 145) solid;
	border-bottom-style: none;
	border-radius: 10px 10px 0 0;
}

.table-context {
	padding: 20px;
	background-color: rgb(150, 150, 150);
	border: 5px rgb(145, 145, 145) solid;
	box-shadow: 5px 5px 8px black;
	margin-bottom: 35px;
	z-index: 1;
}

.table-inside-context {
	border: 5px rgb(145, 145, 145) solid;
	background-color: rgb(70, 70, 70);
	box-shadow: 0 0 25px rgb(35, 35, 35) inset;
}

.content-flex {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.session-space {
	text-align: center;
}

.overview-ttile {
	text-align: center;
}
</style>
