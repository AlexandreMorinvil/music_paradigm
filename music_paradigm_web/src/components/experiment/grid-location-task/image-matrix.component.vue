<template>
	<div id="image-matrix-part" class="image-matrix-part">
		<div v-for="rowNumber in dimensionY" :key="rowNumber" :style="columnCountStyle" class="grid-location-task-matrix-row">
			<grid-location-task-image-component
				v-for="columnNumber in dimensionX"
				:key="columnNumber"
				:cellSpecifications="getSpecificationsForCell(rowNumber, columnNumber)"
				:ref="CELL_REFERENCE_PREFIX"
			/>
		</div>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

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
	data() {
		return {
			// The reference of cells will have the format "<PREFIX>-<POSITION ID>""
			CELL_REFERENCE_PREFIX: 'matrixCell',
		};
	},
	computed: {
		columnCountStyle() {
			return { '--matrix-column-number': this.dimensionX };
		},
	},
	methods: {
		getCellPositionId(rowNumber, columnNumber) {
			const rowIndex = rowNumber - 1;
			const columnIndex = columnNumber - 1;
			return this.dimensionX * rowIndex + columnIndex;
		},
		getCellCoordinates(positionId) {
			return {
				rowIndex: Math.floor(positionId / this.dimensionX),
				columnIndex: positionId % this.dimensionX,
			};
		},
		getSpecificationsForCell(rowNumber, columnNumber) {
			const positionId = this.getCellPositionId(rowNumber, columnNumber);
			const cellSpecifiactions = this.cellSpecificationsList.find((cellSpecification) => {
				return cellSpecification.positionId == positionId;
			});
			return cellSpecifiactions;
		},
		makeCellReference(positionId) {
			return String(this.CELL_REFERENCE_PREFIX + positionId);
		},
		revealCell(positionId) {
			this.$refs.matrixCell[positionId].reveal();
		},
		hideCell(positionId) {
			this.$refs.matrixCell[positionId].hide();
		},
	},
};
</script>

<style scoped>
.image-matrix-part {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
}

.grid-location-task-matrix-row {
	display: grid;
	grid-template-columns: repeat(var(--matrix-column-number), auto);
}
</style>
