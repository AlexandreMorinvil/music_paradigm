<template>
	<div class="filter-contaier" :class="{
		'active-filter-box': isActive,
		'edition-mode': isInEditionMode,
		'display-mode': !isInEditionMode
	}">
		<div class="filters-management-buttons">
			<i class="bi bi-caret-up-fill button-icon" />
			<i class="bi bi-caret-down-fill button-icon" />
			<i class="bi bi-trash3 button-icon" />
		</div>
		<div>
			<div v-if="isInEditionMode">
				<div class="edit-condition-effect-area">
					<ListTableEditorFilterConditionsComponent v-on:update="update" :listTable="listTable"
						:filter="filter" />
					<ListTableEditorFilterEffectComponent v-on:update="update" :listTable="listTable" :filter="filter" />
				</div>
				<div class="edit-buttons-area">
					<TemplateButtonComponent color="blue" isSmall v-on:click="emitRequestToEndEdit" text="Confirm"
						class="confirm-button" />
				</div>
			</div>
			<div v-else v-on:click="emitRequestToEdit">
				<listTableEditorFilterDescriptionComponent class="clickable-area" :filter="filter" />
			</div>
		</div>
		<div class="filter-activation-button">
			<i class="bi button-icon" :class="true ? 'bi-square' : 'bi-check-square'" />
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
	emits: ['update', 'requestToEdit', 'requestEndEdit'],
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
		isInEditionMode: {
			type: Boolean,
			default: false,
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
		emitRequestToEdit() {
			this.$emit('requestToEdit');
		},
		emitRequestToEndEdit() {
			this.$emit('requestEndEdit');
		},
		update() {
			this.$emit('update');
			this.$forceUpdate();
		},
	}
};
</script>

<style scoped>
.clickable-area {
	cursor: pointer;
}

.edition-mode {}

.display-mode {
	width: 1000px;
}

.filter-contaier {
	display: grid;
	grid-template-columns: auto 1fr auto;
	padding: 15px;
	background-color: rgb(215, 215, 220);
	border: solid rgb(200, 200, 205) 2px;
	border-radius: 10px;
	gap: 5px;
}

.filters-management-buttons {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15px;
	margin-right: 15px;
}

.filter-activation-button {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 15px;
}

.litst-table-filter-box.active-filter-box {
	background-color: rgb(195, 210, 195);
	border-color: rgb(110, 190, 110);
}

.edit-condition-effect-area {
	display: flex;
	flex-direction: column;
	align-items: start;
}

.edit-buttons-area {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
}

.confirm-button {
	width: 150px;
}
.button-icon.disabled-icon {
	color: gray;
	filter: opacity(100%);
}

i:hover.button-icon {
	filter: opacity(75%);
}

i:active.button-icon {
	filter: opacity(50%);
}
</style>
