<template>
	<div id="image-matrix-part" class="image-matrix-part">
		<div v-for="rowNumber in dimensionY" :key="rowNumber" :style="columnCountStyle" class="glt-matrix-row">
			<glt-cell-component
				v-for="columnNumber in dimensionX"
				:key="columnNumber"
				:cellSpecifications="getSpecificationsForCell(rowNumber, columnNumber)"
				v-on:click.native="handleBeingClicked(rowNumber, columnNumber)"
				:ref="CELL_REFERENCE_PREFIX"
			/>
		</div>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import GltCellComponent from '@/components/experiment/glt/glt-cell.component.vue';

export default {
	components: {
		GltCellComponent,
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
		numberImages() {
			return this.cellSpecificationsList.length;
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
		handleBeingClicked(rowNumber, columnNumber) {
			this.$emit('cellSelected', this.getSpecificationsForCell(rowNumber, columnNumber));
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
		activateClickability() {
			this.$refs.matrixCell.forEach(cell => {
				cell.activateClickability();
			});
		},
		deactivateClickability() {
			this.$refs.matrixCell.forEach(cell => {
				cell.deactivateClickability();
			});
		},
		bundleSetup() {
			// Transform the positionIds of the cell specifications in a coordinate format (with first index 1).
			const imagePositions = [];
			this.cellSpecificationsList.forEach((cell) => {
				const { rowIndex, columnIndex } = this.getCellCoordinates(cell.positionId);
				imagePositions.push({
					x: columnIndex + 1,
					y: rowIndex + 1,
				});
			});

			// Return the setup of the matrix.
			return {
				numberImages: this.numberImages,
				xMatrixDimension: this.dimensionX,
				yMatrixDimension: this.dimensionY,
				imagePositions: imagePositions,
			};
		}
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

.glt-matrix-row {
	display: grid;
	grid-template-columns: repeat(var(--matrix-column-number), auto);
}
</style>
