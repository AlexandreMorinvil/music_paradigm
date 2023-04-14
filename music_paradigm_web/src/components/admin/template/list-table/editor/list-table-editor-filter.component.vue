<template>
	<div class="filter-contaier" :class="{
		'active-filter-box': isActivated && isValid,
		'edition-mode': isInEditionMode,
		'display-mode': !isInEditionMode
	}">

		<div class="filters-management-buttons">
			<i v-if="hasFilterAbove" class="bi bi-caret-up-fill button-icon move-up-button" v-on:click="moveFilterUp" />
			<i v-if="hasFilterBelow" class="bi bi-caret-down-fill button-icon move-down-button"
				v-on:click="moveFilterDown" />
			<i class="bi bi-trash3 button-icon delete-button" v-on:click="deleteFilter" />
		</div>

		<div>
			<div v-if="isInEditionMode">
				<div class="edit-condition-effect-area">
					<ListTableEditorFilterConditionsComponent v-on:update="update" :listTable="listTable"
						:filter="filter" />
					<ListTableEditorFilterEffectComponent v-on:update="update" :listTable="listTable" :filter="filter" />
				</div>
			</div>
			<div v-else v-on:click="emitRequestToEdit">
				<listTableEditorFilterDescriptionComponent class="clickable-area" :class="{ 'invalid-outline': !isValid }"
					:filter="filter" />
			</div>
		</div>
		<div class="filter-activation-button">
			<i class="bi button-icon" :class="isActivated ? 'bi-check-square' : 'bi-square'"
				v-on:click="toggleFilterActivation" />
			<div class="edit-buttons-area" v-if="isInEditionMode">
				<TemplateButtonComponent color="blue" isSmall v-on:click="emitRequestToEndEdit" text="Confirm"
					class="confirm-button" />
			</div>
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
	emits: ['delete', 'moveFilterDown', 'moveFilterUp', 'requestEdit', 'requestEditStop', 'update'],
	components: {
		TemplateButtonComponent,
		ListTableEditorFilterConditionsComponent,
		listTableEditorFilterDescriptionComponent,
		ListTableEditorFilterEffectComponent,
	},
	props: {
		index: {
			type: Number,
			default: null,
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
		filter() {
			return this.listTable.getFilterAtIndex(this.index) ?? new ListTableFilter();
		},
		hasFilterAbove() {
			return this.index !== 0;
		},
		hasFilterBelow() {
			return this.index !== (this.listTable.filtersCount - 1);
		},
		isActivated() {
			return this.filter.isActivated;
		},
		isValid() {
			return this.filter.isValid;
		},
	},
	methods: {
		deleteFilter() {
			this.$emit('delete', this.index);
		},
		moveFilterDown() {
			this.$emit('moveFilterDown', this.index);
		},
		moveFilterUp() {
			this.$emit('moveFilterUp', this.index);
		},
		emitRequestToEdit() {
			this.$emit('requestEdit', this.index);
		},
		emitRequestToEndEdit() {
			this.$emit('requestEditStop', this.index);
		},
		toggleFilterActivation() {
			this.listTable.toggleFilterActivation(this.index);
			this.update();
		},
		update() {
			this.$emit('update');
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
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100px;
}

.move-up-button {
	grid-column: 1;
	margin: auto;
}

.move-down-button {
	grid-column: 2;
	margin: auto;
}

.delete-button {
	grid-column: 3;
	margin: auto;
}

.filter-activation-button {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 15px;
}

.filter-contaier.active-filter-box {
	background-color: rgb(195, 210, 195);
	border-color: rgb(110, 190, 110);
}

.edit-condition-effect-area {
	display: flex;
	flex-direction: column;
	justify-content: left;
}

.edit-buttons-area {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
}

.confirm-button {
	width: 100px;
}

i:hover.button-icon {
	filter: opacity(75%);
}

i:active.button-icon {
	filter: opacity(50%);
}

.invalid-outline {
	border-color: rgba(255, 0, 0, 0.5);
	border-width: 3px;
	color: rgba(255, 0, 0, 0.75);
}
</style>
