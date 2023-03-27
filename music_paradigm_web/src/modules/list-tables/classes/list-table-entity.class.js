export class ListTableEntity {
    constructor(entity) {
        this._id = entity?._id ?? null;
        this.entity = entity ?? {};
    }

    getValueToDisplay(column) {
        const value = this.entity[column.key] ?? this[column.key] ?? null;

        if (value === null || value === undefined || value === '') return null; 
        switch (column.type) {
            case Array:
                return (value.length === 0) ? column.formatFunction(value) : null;
            default: return column.formatFunction(value);
        }
    }

    isEqual(entity = {}) {
        return this._id === entity._id;
    }
}