<template>
	<div class="table-title-header">
		<div class="title-area">
			<h3>
				{{ title }}
			</h3>
		</div>
		<div class="loader-area">
			<div v-if="isLoading" class="loading-indication">
				<LoaderCircularComponent class="loader" /> <span> Updating... </span>
			</div>
		</div>
		<div class="options-area">
			<i class="bi bi-arrow-repeat" v-on:click="refreshListTable" :class="{ 'disabled-icon': isLoading }" />
			<i class="bi" :class="hasEditorExpanded ? 'bi-caret-up-square' : 'bi-pencil-square'"
				v-on:click="() => $emit('editor')" />
			<i class="bi" :class="isExpanded ? 'bi-arrows-collapse' : 'bi-arrows-expand'"
				v-on:click="() => $emit('expand')" />
		</div>
	</div>
</template>

<script>
import '@/styles/color-palette.css';
import '@/styles/table-template.css';

import LoaderCircularComponent from '@/components/visual-helpers/loader-circular.component.vue';

export default {
	emits: ['editor', 'expand'],
	components: {
		LoaderCircularComponent,
	},
	props: {
		hasEditorExpanded: {
			type: Boolean,
			default: false,
		},
		isExpanded: {
			type: Boolean,
			default: false,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		refreshFunction: {
			type: Function,
			default: () => { }
		},
		title: {
			type: String,
			default: 'Title',
		},
	},
	methods: {
		refreshListTable() {
			if (this.isLoading) return;
			else this.refreshFunction();
		}
	}
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
	height: 70px;
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

.options-area {
	flex-direction: row;
	justify-content: right;
	gap: 20px;
}

.loading-indication {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}

.loader {
	width: 30px;
	height: 30px;
	border-width: 4px;
}

.disabled-icon {
	color: gray;
}

i {
	-webkit-text-stroke: 1px;
}

i:hover {
	filter: opacity(75%);
}

i:active {
	filter: opacity(50%);
}
</style>