export class ListTableColumn {
    constructor(entity) {
        this.key = entity.key;
        this.isAlwaysPresent = entity.isAlwaysPresent ?? false;
        this.formatFunction = entity.formatFunction ?? ((a) => a);
        this.title = entity.title ?? 'Undefined';
        this.orderPriority = entity.orderPriority ?? null;
    }
}