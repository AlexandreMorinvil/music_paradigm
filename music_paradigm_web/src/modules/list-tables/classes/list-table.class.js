import _pick from 'lodash/pick';

import { ListTableEntity } from "./list-table-entity.class";

export class ListTable {

    // To implement by children classes
    get possibleColumnsList() {
        return [];
    }

    constructor(list, ListTableEntityClass) {
        this.ListTableEntityClass = ListTableEntityClass ?? ListTableEntity;
        this.entitiesList = this.convertToTableEntitiesList(list);
        this._selectedColumnsList = [];
    }

    get alwaysPresentColumnsList() {
        return this.possibleColumnsList.filter((column) => column.isAlwaysPresent);
    }

    get selectedColumnsList() {
        return this.sortColumnsOrder([
            ...this.alwaysPresentColumnsList,
            ...this._selectedColumnsList,
        ]);
    }

    convertToTableEntitiesList(entities = []) {
        let entitiesList = Array.isArray(entities) ? entities : [entities];
        return entitiesList.map((entity) => new this.ListTableEntityClass(entity))
    }

    sortColumnsOrder(columnsList) {
        return columnsList.sort((columnA, columnB) => {
            return columnA.orderPriority - columnB.orderPriority;
        });
    }
}