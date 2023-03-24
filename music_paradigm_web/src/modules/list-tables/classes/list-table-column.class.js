export class ListTableColumn {
    constructor(entity) {
        this.key = entity.key;

        this.isPresentByDefault = entity.isPresentByDefault ?? false;
        this.isAlwaysPresent = entity.isAlwaysPresent ?? false;
        this.formatFunction = entity.formatFunction ?? ((a) => a);
        this.title = entity.title ?? entity.key ?? null;
        this.orderPriority = entity.orderPriority ?? Infinity;
    }
}