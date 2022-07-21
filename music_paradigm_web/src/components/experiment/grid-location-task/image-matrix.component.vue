<template>
	<div id="image-matrix-part" class="image-matrix-part">
		<div v-for="rowNumber in dimensionY" :key="rowNumber" :style="columnCountStyle" class="grid-location-task-matrix-row">
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
		columnCountStyle() {
			return { '--matrix-column-number': this.dimensionX };
		},
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
