<template>
	<div class="filter-effect-grid">
		<TemplateFieldSelectComponent :value="effectType" v-on:edit="(value) => setEffectType(value)" isEmptyAccepted
			:options="filterEffectTypes" placeholder="NOTHING" />

		<TemplateFieldInputColorComponent :value="effectParameter" v-on:edit="(value) => setEffectParameter(value)"
			class="effect-parameter" />
	</div>
</template>

<script>
import { ListTable, ListTableFilter, FilterEffectType } from '@/modules/list-tables';

import TemplateFieldSelectComponent from '@/components/admin/templates/template-field-select.component.vue';
import TemplateFieldInputColorComponent from '@/components/admin/templates/template-field-input-color.component.vue';


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
		filterEffectTypes() {
			return Object.values(FilterEffectType);
		},
		effectType() {
			return this.filter.effectType;
		},
		effectParameter() {
			return this.filter.effectParameter;
		},
	},
	methods: {
		setEffectType(type) {
			this.filter.setEffectType(type);
			this.update();
		},
		setEffectParameter(parameter) {
			this.filter.setEffectParameter(parameter);
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
