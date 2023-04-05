<template>
	<div class="filter-effect-grid">
		<TemplateFieldSelectComponent :value="effectType" v-on:edit="(value) => setEffectType(value)" isEmptyAccepted
			:options="filterEffectTypes" placeholder="NOTHING" />

		<TemplateFieldInputColorComponent v-if="hasEffectColor" :value="effectColor"
			v-on:edit="(value) => setEffectColor(value)" class="effect-parameter" />
		<div v-else />
	</div>
</template>

<script>
import { ListTable, ListTableFilter, FilterEffectType } from '@/modules/list-tables';

import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';
import TemplateFieldInputColorComponent from '@/components/admin/template/template-field-input-color.component.vue';


export default {
	emits: ['update'],
	components: {
		TemplateFieldInputColorComponent,
		TemplateFieldSelectComponent,
	},
	props: {
		filter: {
			type: ListTableFilter,
			default() {
				return new ListTableFilter();
			},
		},
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
	computed: {
		effectType() {
			return this.filter.effectType;
		},
		effectColor() {
			return this.filter.effectColor;
		},
		filterEffectTypes() {
			return Object.values(FilterEffectType);
		},
		hasEffectColor() {
			return this.filter.effectType === FilterEffectType.color;
		},
	},
	methods: {
		setEffectType(type) {
			this.filter.setEffectType(type);
			this.update();
		},
		setEffectColor(parameter) {
			this.filter.setEffectColor(parameter);
			this.update();
		},
		update() {
			this.$emit('update');
			this.$forceUpdate();
		},
	}
};
</script>

<style scoped>
.filter-effect-grid {
	display: grid;
	grid-template-columns: auto 50px;
	width: auto;
}
</style>
