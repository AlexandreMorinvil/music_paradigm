export class ListTableColumn {
    constructor(column) {
        this.key = column?.key ?? null;

        this._columnTitle = column?.columnTitle ?? null;
        this.isPresentByDefault = column?.isPresentByDefault ?? false;
        this.isAlwaysPresent = column?.isAlwaysPresent ?? false;
        this.isDefaultSortColumn = column?.isDefaultSortColumn ?? false;
        this.formatFunction = column?.formatFunction ?? ((a) => a);
        this.title = column?.title ?? column?.key ?? null;
        this.type = column?.type ?? null;
        this.orderPriority = column?.orderPriority ?? Infinity;
    }

    get columnTitle() {
        return this._columnTitle ?? this.title;
    }
}