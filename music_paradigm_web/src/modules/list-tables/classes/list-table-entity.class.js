export class ListTableEntity {
    constructor(entity) {
        this._id = entity?._id ?? null;
        this.entity = entity ?? {};
    }

    getValueByColumnKey(columnKey) {
        return this[columnKey] ?? this.entity[columnKey] ?? null;
    }

    getValueToDisplay(column) {
        const value = this.getValueByColumnKey(column.key);

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