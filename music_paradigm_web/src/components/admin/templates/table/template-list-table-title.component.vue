<template>
	<div class="table-title-header">
		<div class="title-area">
			<h3>
				{{ title }}
			</h3>
		</div>
		<div v-if="isLoading" class="loader-area">
			<LoaderCircularComponent class="loader" /> <span> Updating... </span>
		</div>
		<div class="options-area">

		</div>
	</div>
</template>

<script>
import '@/styles/color-palette.css';
import '@/styles/table-template.css';

import LoaderCircularComponent from '@/components/visual-helpers/loader-circular.component.vue';

export default {
	components: {
		LoaderCircularComponent,
	},
	props: {
		isLoading: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: 'Title',
		},
	},
};
</script>

<style scoped>
.table-title-header {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	background-color: rgb(225, 225, 230);
	border: solid rgb(210, 210, 215) 2px;
	border-radius: 10px 10px 0 0;
	color: rgb(25, 25, 25);
	height: 80px;
	padding: 0 30px;
}

.title-area,
.loader-area,
.options-area {
	display: flex;
	align-items: center;
}

.title-area {}

.loader-area {
	flex-direction: row;
	justify-content: center;
	gap: 10px;
	color: var(--color-edited-text);
}

.options-area {}

.loader {
	width: 30px;
	height: 30px;
	border-width: 4px;
}
</style>
