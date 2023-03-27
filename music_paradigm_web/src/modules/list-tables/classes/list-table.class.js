import _pick from 'lodash/pick';

import { ListTableEntity } from "./list-table-entity.class";

export class ListTable {

    // To implement by children classes
    get possibleColumnsList() {
        return [];
    }

    constructor(list, ListTableEntityClass, parameters = {}) {
        this.title = 'List';
        this.ListTableEntityClass = ListTableEntityClass ?? ListTableEntity;
        this.entitiesList = this.convertToTableEntitiesList(list);
        this._selectedColumnsList = parameters.selectedColumnsList ?? this.presentByDefaultColumnsList ?? [];
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

    get selectedColumnsList() {
        return this.sortAndDuplicateColumns([
            ...this.alwaysPresentColumnsList,
            ...this._selectedColumnsList,
        ]);
    }

    convertToTableEntitiesList(entities = []) {
        let entitiesList = Array.isArray(entities) ? entities : [entities];
        return entitiesList.map((entity) => new this.ListTableEntityClass(entity))
    }

    removeDuplicateColumns(columnsList) {
        return [...new Set(columnsList)];
    }

    sortColumns(columnsList) {
        return columnsList.sort((columnA, columnB) => {
            return columnA.orderPriority - columnB.orderPriority;
        });
    }

    sortAndDuplicateColumns(columnsList) {
        return this.removeDuplicateColumns(this.sortColumns(columnsList));
    }
}