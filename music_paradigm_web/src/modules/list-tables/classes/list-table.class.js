import { ListTableEntity } from "./list-table-entity.class";
import { ListTableFilter } from "./list-table-filter.class";

import sorting from "../sorting";

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
        this.sortColumnKey = this.getDefaultSortColumnKey();
        this.isReverSort = false;
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

    get filteredSortedEntitiesList() {
        return this.sortEntities(
            this.filterEntitiesList(this.entitiesList),
            this.sortColumnKey,
            this.isReverSort,
        );
    }

    get keptEnitiesCount() {
        return this.filteredSortedEntitiesList.length;
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

    getDefaultSortColumnKey() {
        const defaultSortColumn = this.selectedColumnsList.find((column) => {
            return column.isDefaultSortColumn;
        }) ?? this.selectedColumnsList[0];
        return defaultSortColumn?.key ?? null;
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

    isColumnUsedForSorting(column) {
        return this.sortColumnKey === column.key;
    }

    removeDuplicateColumns(columnsList) {
        return [...new Set(columnsList)];
    }

    setEntitiesListFromList(list) {
        this.entitiesList = this.convertToTableEntitiesList(list);
    }

    sortAndRemoveDuplicateColumns(columnsList) {
        return this.removeDuplicateColumns(this.sortColumns(columnsList));
    }

    sortColumns(columnsList) {
        return columnsList.sort((columnA, columnB) => {
            return columnA.orderPriority - columnB.orderPriority;
        });
    }

    sortEntities(entitiesList, columnKey, isReverSort) {

        if (!columnKey) return entitiesList;
        const column = this.getColumnByKey(columnKey);
        const compareForSortFunction = column.compareForSortFunction ?? sorting.compareForDefaultSort;

        const sortedEntitiesList = entitiesList.sort((entityA, entityB) => {
            const valueA = entityA.getValueByColumnKey(columnKey);
            const valueB = entityB.getValueByColumnKey(columnKey);
            return compareForSortFunction(valueA, valueB);
        });

        return isReverSort ? sortedEntitiesList.reverse() : sortedEntitiesList;
    }

    toggleSortForColumn(column) {
        const columnKey = column.key;
        if (this.sortColumnKey === columnKey) {
            if (this.isReverSort) {
                this.sortColumnKey = this.getDefaultSortColumnKey();
                this.isReverSort = false;
            } else
                this.isReverSort = true;
        } else {
            this.sortColumnKey = columnKey;
            this.isReverSort = false;
        }
    }
}