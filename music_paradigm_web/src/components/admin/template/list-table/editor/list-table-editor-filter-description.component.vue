<template>
	<div class="litst-table-filter-description-box">
		<span :style="{ 'white-space': 'pre' }"> {{ textDescription }} <div v-if="usesEffectColor" 
			:style="{ 'background-color': effectColor }" 
			class="filter-color-box" />
		</span>
	</div>
</template>

<script>
import { ListTableFilter } from '@/modules/list-tables';

export default {
	props: {
		filter: {
			type: ListTableFilter,
			default() {
				return new ListTableFilter();
			},
		},
	},
	computed: {
		filterColor() {
			return this.filter.effectColor;
		},
		textDescription() {
			return this.filter.getStringDescription();
		},
		effectColor() {
			return this.filter.effectColor;
		},
		usesEffectColor() {
			return this.filter.isValid && this.filter.usesEffectColor;
		},
	},
};
</script>

<style scoped>
.litst-table-filter-description-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding: 10px 15px;
	background-color: rgb(195, 195, 200);
	border: solid rgb(180, 180, 185) 2px;
	border-radius: 10px;
	gap: 5px;
	font-size: 0.8em;
	font-weight: bold;
}

.filter-color-box {
	display: inline-block;
	border: 2px solid black;
	border-radius: 5px;
	height: 0.8em;
	width: 4em;
}
</style>
