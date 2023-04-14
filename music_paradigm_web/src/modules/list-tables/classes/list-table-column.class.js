import { formatDefaultByColumnType } from "../format-default-by-column-type";
import { ColumnType } from "../interfaces/column.interfaces";

export class ListTableColumn {
    constructor(column) {
        this.key = column?.key ?? null;

        this._columnTitle = column?.columnTitle ?? null;
        this.isPresentByDefault = column?.isPresentByDefault ?? false;
        this.isAlwaysPresent = column?.isAlwaysPresent ?? false;
        this.isDefaultSortColumn = column?.isDefaultSortColumn ?? false;
        this._formatFunction = column?.formatFunction ?? null;
        this.title = column?.title ?? column?.key ?? null;
        this.type = column?.type ?? null;
        this.orderPriority = column?.orderPriority ?? Infinity;
    }

    get columnTitle() {
        return this._columnTitle ?? this.title;
    }

    get formatFunction() {
        if (this._formatFunction) return this._formatFunction;
        else return ((value) => formatDefaultByColumnType(value, this.type));
    }
}