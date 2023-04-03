import { ListTableEntity } from "./list-table-entity.class";
import { ListTableFilter } from "./list-table-filter.class";

export class ListTable {

    constructor(list, ListTableEntityClass, parameters = {}) {
        this.title = 'List';
        this.ListTableEntityClass = ListTableEntityClass ?? ListTableEntity;
        this.entitiesList = this.convertToTableEntitiesList(list);
        this.filtersList = this.generateFiltersList(parameters.filtersList);
        this.selectedColumnsList = this.generateSelectedColumnsList(
            parameters.selectedColumnsList ??
            this.presentByDefaultColumnsList ??
            []
        );
    }

    get alwaysPresentColumnsCount() {
        return this.alwaysPresentColumnsList.length;
    }

    get alwaysPresentColumnsList() {
        return this.possibleColumnsList.filter((column) => column.isAlwaysPresent);
    }

    get entitiesCount() {
        return this.entitiesList.length;
    }

    get filteredEnitiesCount() {
        return this.filteredEnitiesList.length;
    }

    get filteredEnitiesList() {
        return this.filterEntitiesList(this.entitiesList);
    }

    get presentByDefaultColumnsList() {
        return this.possibleColumnsList.filter((column) => {
            return column.isAlwaysPresent || column.isPresentByDefault;
        });
    }

    // To implement by children classes
    get possibleColumnsList() {
        return [];
    }

    addColumn() {
        this.selectedColumnsList.push(new ListTableEntity());
    }

    addFilter() {
        this.filtersList.push(new ListTableFilter());
    }

    convertToTableEntitiesList(entities = []) {
        let entitiesList = Array.isArray(entities) ? entities : [entities];
        return entitiesList.map((entity) => new this.ListTableEntityClass(entity))
    }

    deleteColumn(index) {
        this.selectedColumnsList.splice(index, 1);
    }

    editSelectedColumns(index, newColumnKey) {
        const newColumn = this.getColumnByKey(newColumnKey) ?? new ListTableEntity();
        this.selectedColumnsList.splice(index, 1, newColumn);
    }

    filterEntitiesList(entitiesList) {
        return entitiesList.filter((entity) => {
            let initialIsKeptValue = true;
            return this.filtersList.reduce((isKeptByPreviousFilters, filter) => {
                return isKeptByPreviousFilters && !filter.shouldRemoveEntity(entity);
            }, initialIsKeptValue);
        });
    }

    getFilterImposedColorOfEntity(entity) {
        let initialImposedColor = null;
        return this.filtersList.reduce((currentImposedColor, filter) => {
            return filter.getImposedColor(entity) ?? currentImposedColor;
        }, initialImposedColor);
    }

    generateFiltersList(filtersList = []) {
        return filtersList.map(filter => new ListTableFilter(filter));
    }

    generateSelectedColumnsList(additionalSelectedColumnsList = []) {
        return this.sortAndRemoveDuplicateColumns([
            ...this.selectedColumnsList ?? [],
            ...this.alwaysPresentColumnsList,
            ...additionalSelectedColumnsList
        ]);
    }

    getColumnByKey(columnKey) {
        return this.possibleColumnsList.find((possibleColumn) => possibleColumn.key === columnKey);
    }

    removeDuplicateColumns(columnsList) {
        return [...new Set(columnsList)];
    }

    setEntitiesListFromList(list) {
        this.entitiesList = this.convertToTableEntitiesList(list);
    }

    sortColumns(columnsList) {
        return columnsList.sort((columnA, columnB) => {
            return columnA.orderPriority - columnB.orderPriority;
        });
    }

    sortAndRemoveDuplicateColumns(columnsList) {
        return this.removeDuplicateColumns(this.sortColumns(columnsList));
    }
}