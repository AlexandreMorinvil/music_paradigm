export class ListTableEntity {
    constructor(entity) {
        this._id = entity?._id
    }

    getValueToDisplay(column) {
        const value = this[column.key];
        return column.formatFunction(value);
    }

    isEqual(entity = {}) {
        return this._id === entity._id;
    }
}