<template>
	<div class="litst-table-filter-box" :class="{ 'active-filter-box': isActive }">
		<div>
			<i class="bi bi-caret-down-fill" />
			<i class="bi bi-caret-up-fill" />
			<i class="bi bi-trash3" />
			<i class="bi bi-pencil-square" />
			<i class="bi bi-square" />
		</div>
		<div>
			<ListTableEditorFilterConditionsComponent v-on:update="update" :listTable="listTable" :filter="filter" />
			<ListTableEditorFilterEffectComponent v-on:update="update" :listTable="listTable" :filter="filter" />
		</div>
		<div>
			<listTableEditorFilterDescriptionComponent :filter="filter" />
		</div>
	</div>
</template>

<script>
import { ListTable, ListTableFilter } from '@/modules/list-tables';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

import ListTableEditorFilterConditionsComponent from './list-table-editor-filter-conditions.component.vue';
import listTableEditorFilterDescriptionComponent from './list-table-editor-filter-description.component.vue';
import ListTableEditorFilterEffectComponent from './list-table-editor-filter-effect.component.vue';

export default {
	emits: ['update'],
	components: {
		TemplateButtonComponent,
		ListTableEditorFilterConditionsComponent,
		listTableEditorFilterDescriptionComponent,
		ListTableEditorFilterEffectComponent,
	},
	props: {
		filter: {
			type: ListTableFilter,
			default() {
				return new ListTableFilter();
			},
		},
		index: {
			type: Number,
			default: null,
		},
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
	computed: {
		isActive() {
			return this.filter.isValid;
		},
	},
	methods: {
		update() {
			this.$emit('update');
			this.$forceUpdate();
		},
	}
};
</script>

<style scoped>
.litst-table-filter-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding: 15px;
	background-color: rgb(215, 215, 220);
	border: solid rgb(200, 200, 205) 2px;
	border-radius: 10px;
	gap: 5px;
}

.litst-table-filter-box.active-filter-box {
	background-color: rgb(195, 210, 195);
	border-color: rgb(110, 190, 110);
}
</style>
