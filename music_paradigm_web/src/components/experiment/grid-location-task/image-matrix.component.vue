<template>
	<div id="image-matrix-area" class="state-section state-division-image-matrix">
		<div v-for="rowNumber in dimensionY" :key="rowNumber">
			<grid-location-task-image-component
				v-for="columnNumber in dimensionX"
				:key="columnNumber"
				:cellSpecifications="getSpecificationsForCell(rowNumber, columnNumber)"
			/>
		</div>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import GridLocationTaskImageComponent from '@/components/experiment/grid-location-task/grid-location-task-image.component.vue';

export default {
	components: {
		GridLocationTaskImageComponent,
	},
	props: {
		dimensionX: {
			type: Number,
			default() {
				return 0;
			},
		},
		dimensionY: {
			type: Number,
			default() {
				return 0;
			},
		},
		cellSpecificationsList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	computed: {
		...mapGetters('experiment', []),
	},
	methods: {
		getSpecificationsForCell(rowNumber, columnNumber) {
			const rowIndex = rowNumber - 1;
			const columnIndex = columnNumber - 1;
			const positionId = this.dimensionY * rowIndex + columnIndex;

			const cellSpecifiactions = this.cellSpecificationsList.find((cellSpecification) => {
				return cellSpecification.positionId == positionId;
			});
			return cellSpecifiactions;
		}
	}
};
</script>

<style scoped>
.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>
