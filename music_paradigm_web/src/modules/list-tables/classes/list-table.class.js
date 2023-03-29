import _pick from 'lodash/pick';

import { ListTableEntity } from "./list-table-entity.class";

export class ListTable {

    constructor(list, ListTableEntityClass, parameters = {}) {
        this.title = 'List';
        this.ListTableEntityClass = ListTableEntityClass ?? ListTableEntity;
        this.entitiesList = this.convertToTableEntitiesList(list);
        this.selectedColumnsList = this.generateSelectedColumnsList(
            parameters.selectedColumnsList ??
            this.presentByDefaultColumnsList ??
            []
        );
    }

    get alwaysPresentColumnsList() {
        return this.possibleColumnsList.filter((column) => column.isAlwaysPresent);
    }

    get entitiesCount() {
        return this.entitiesList.length;
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

    convertToTableEntitiesList(entities = []) {
        let entitiesList = Array.isArray(entities) ? entities : [entities];
        return entitiesList.map((entity) => new this.ListTableEntityClass(entity))
    }

    editSelectedColumn(index, newColumnKey) {
        const newColumn = this.getColumnByKey(newColumnKey);
        if (!newColumn) return;
        this.selectedColumnsList.splice(index, 1, newColumn);
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

    sortColumns(columnsList) {
        return columnsList.sort((columnA, columnB) => {
            return columnA.orderPriority - columnB.orderPriority;
        });
    }

    sortAndRemoveDuplicateColumns(columnsList) {
        return this.removeDuplicateColumns(this.sortColumns(columnsList));
    }
}