export default {
	compareForDefaultSort,
};

function compareForDefaultSort(valueA, valueB) {
    if (valueA < valueB) return -1;
    else if (valueA > valueB) return 1;
    else return 0;
}
